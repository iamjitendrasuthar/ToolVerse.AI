import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30);

    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("Reset URL:", resetUrl);

    // Yaha email service integrate kar sakte ho
    // Example: nodemailer / resend / brevo / mailtrap
    // await sendResetEmail(email, resetUrl);
    await transporter.sendMail({
      from: `"ToolsVerse AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Reset Password</h2>
          <p>You requested to reset your password.</p>
          <p>Click the button below to continue:</p>

          <a 
            href="${resetUrl}" 
            style="
              display:inline-block;
              padding:12px 20px;
              background:#2563eb;
              color:#ffffff;
              text-decoration:none;
              border-radius:8px;
              font-weight:600;
            "
          >
            Reset Password
          </a>

          <p style="margin-top:20px;">
            If the button does not work, copy and paste this link into your browser:
          </p>

          <p>${resetUrl}</p>

          <p style="margin-top:20px; color:#666;">
            This link will expire in 30 minutes.
          </p>
        </div>
      `,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Reset link sent successfully",
        resetUrl, // testing ke liye
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
