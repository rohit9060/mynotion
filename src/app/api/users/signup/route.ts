import { NextRequest, NextResponse } from "next/server";
import { SignUpSchema } from "@/schema";
import {
  prisma,
  hashPassword,
  generateOTP,
  createJwtToken,
  sendEmail,
  UserEmailVerification,
} from "@/lib";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Validate the request body
    const { data, error } = SignUpSchema.safeParse(body);

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

    // If the user already exists, return a 400 status code
    if (user) {
      return NextResponse.json(
        { message: "User already exists", status: 400 },
        {
          status: 400,
        }
      );
    }

    // hash the password
    const hashedPassword = await hashPassword(data.password);

    // generate OTP
    const otp = generateOTP();

    // generate token
    const token = createJwtToken(
      { email: data.email },
      process.env.TOKEN_SECRET!,
      "1h"
    );

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        otp,
        token,
      },
    });

    //  send email
    await sendEmail({
      toEmail: data.email,
      subject: "Verify your email",
      emailBody: await UserEmailVerification(otp, newUser.name),
    });

    // If the request is valid, return a 200 status code
    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          token: token,
        },
        status: 201,
      },
      {
        status: 201,
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
