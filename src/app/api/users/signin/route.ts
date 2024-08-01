import { NextRequest, NextResponse } from "next/server";
import { SignInSchema } from "@/schema";
import { prisma, createJwtToken, comparePassword } from "@/lib";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Validate the request body
    const { data, error } = SignInSchema.safeParse(body);

    // If there is an error, return a 400 status code
    if (error) {
      return NextResponse.json(
        { message: error.issues[0].message, status: 400 },
        { status: 400 }
      );
    }

    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // If the user does not exist, return a 400 status code
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist", status: 400 },
        {
          status: 400,
        }
      );
    }

    // check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { message: "User is not verified", status: 400 },
        {
          status: 400,
        }
      );
    }

    // verify password
    const isPasswordValid = await comparePassword(
      data.password,
      user.password!
    );

    // If the password is not valid, return a 400 status code
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password", status: 400 },
        {
          status: 400,
        }
      );
    }

    // generate token
    const accessToken = createJwtToken(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      "1d"
    );

    const refreshToken = createJwtToken(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET!,
      "3d"
    );

    // update user and add token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: refreshToken,
      },
    });

    // If the request is valid, return a 200 status code
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    });
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
