import { NextRequest, NextResponse } from "next/server";
import { EmailSchema } from "@/schema";
import {
  createJwtToken,
  generateOTP,
  prisma,
  sendEmail,
  UserEmailVerification,
} from "@/lib";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Validate the request body
    const { data, error } = EmailSchema.safeParse(body);

    // If there is an error, return a 400 status code
    if (error) {
      return NextResponse.json(
        { message: error.issues[0].message, status: 400 },
        { status: 400 }
      );
    }

    // check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // If the user not exists, return a 404 status code
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist", status: 404 },
        {
          status: 404,
        }
      );
    }

    // check use already verified
    if (user.isVerified) {
      return NextResponse.json(
        { message: "User already verified", status: 400 },
        {
          status: 400,
        }
      );
    }

    //generate OTP
    const otp = generateOTP();

    // generate token
    const token = createJwtToken(
      { email: data.email },
      process.env.TOKEN_SECRET!,
      "1h"
    );

    // update user and add token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        otp,
        token,
      },
    });

    // send email
    await sendEmail({
      toEmail: data.email,
      subject: "Verify your email",
      emailBody: await UserEmailVerification(otp, user.name),
    });

    // set http only cookie
    cookies().set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    // If the request is valid, return a 200 status code
    return NextResponse.json(
      {
        message: "Email sent successfully",
        token: token,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
        status: 500,
      },
      {
        status: 500,
      }
    );
  }
}
