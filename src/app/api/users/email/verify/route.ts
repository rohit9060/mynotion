import { NextRequest, NextResponse } from "next/server";
import { prisma, verifyJwtToken } from "@/lib";
import { cookies, headers } from "next/headers";
import { OtpSchema } from "@/schema";

export async function POST(req: NextRequest) {
  try {
    const token =
      headers().get("authorization")?.split(" ")[1] ||
      cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: "Token not found",
          status: 400,
        },
        {
          status: 400,
        }
      );
    }

    const TokenData: any = await verifyJwtToken(
      token,
      process.env.TOKEN_SECRET!
    );

    // parse body
    const body = await req.json();

    // validate body
    const { data, error } = OtpSchema.safeParse(body);

    // if there is an error, return a 400 status code
    if (error) {
      return NextResponse.json(
        { message: error.issues[0].message, status: 400 },
        { status: 400 }
      );
    }

    // check if user already exists
    const user = await prisma.user.findFirst({
      where: {
        token: token,
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

    // validate OTP
    if (user.otp !== data.otp) {
      return NextResponse.json(
        { message: "OTP is invalid", status: 400 },
        {
          status: 400,
        }
      );
    }

    // update user and add token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
        otp: null,
        isVerified: true,
      },
    });

    // delete token
    cookies().delete("token");

    return NextResponse.json(
      {
        message: "User verified successfully",
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
