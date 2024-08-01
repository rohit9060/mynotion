import { NextResponse, NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  try {
    const token =
      headers().get("authorization")?.split(" ")[1] ||
      cookies().get("accessToken")?.value;

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized", status: 401 }),
        {
          status: 401,
        }
      );
    }

    // TODO: verify token
    const key = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
    const TokenData = await jwtVerify(token, key);

    if (!TokenData.payload) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized", status: 401 }),
        {
          status: 401,
        }
      );
    }

    // @ts-ignore
    req.user = TokenData.payload;

    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized", status: 401 }),
      {
        status: 401,
      }
    );
  }
}

export const config = {
  matcher: ["/api/users/profile"],
};
