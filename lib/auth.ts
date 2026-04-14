import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("No user found with this email");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordMatch) throw new Error("Incorrect password");

        // ✅ Step 1: Login ke waqt DB se saara data return karein
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          profession: user.profession,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check karein ki user DB mein hai ya nahi
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          // Agar naya user hai toh DB mein create karein
          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: user.name!,
                email: user.email!,
                // Social login users ka password null rahega
                image: user.image,
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Error saving google user:", error);
          return false;
        }
      }
      return true; // Credentials login ke liye true return karein
    },

    async jwt({ token, user, trigger, session }) {
      // 1. Initial Login (Credentials ya Social)
      if (user) {
        // Agar social login hai, toh DB se fresh data uthayein (mobile, profession ke liye)
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.mobile = dbUser.mobile;
          token.profession = dbUser.profession;
        }
      }

      // 2. Profile Update (Frontend se)
      if (trigger === "update" && session?.user) {
        token.name = session.user.name ?? token.name;
        token.email = session.user.email ?? token.email;
        token.mobile = session.user.mobile ?? token.mobile;
        token.profession = session.user.profession ?? token.profession;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        // @ts-ignore
        session.user.mobile = token.mobile;
        // @ts-ignore
        session.user.profession = token.profession;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
