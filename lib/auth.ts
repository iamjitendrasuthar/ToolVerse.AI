import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
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
    async jwt({ token, user, trigger, session }) {
      // ✅ Step 2: Initial Login par user ka data token (cookie) mein save karein
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        // @ts-ignore
        token.mobile = user.mobile;
        // @ts-ignore
        token.profession = user.profession;
      }

      // ✅ Step 3: Profile Edit ke baad session.update() ko handle karein
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
        // ✅ Step 4: Token se nikal kar session API (frontend) mein data bhejna
        // Yeh step sabse zaruri hai jo aapke code mein missing tha
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
