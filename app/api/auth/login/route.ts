import { NextResponse } from "next/server";
import { LoginRequest } from "@lib/validators/login";
import {
  TokenTypeEnum,
  sign,
  Token,
  REFRESH_TOKEN_COOKIE_NAME,
  TWO_WEEKS,
} from "@utils/token";
import { Role } from "@utils/role";
import bcrypt from "bcrypt";
import { db } from "@lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as LoginRequest;

    const existingUser = await db.user.findUnique({ where: { email } });
    if (!existingUser) {
      return NextResponse.json(
        { error: "email or password is incorrect" },
        { status: 409 }
      );
    }

    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "email or password is incorrect" },
        { status: 409 }
      );
    }

    const claims: Token = {
      id: existingUser.id,
      name: existingUser.name,
      role: existingUser.role as Role,
    };

    const [accessJWT, refreshJWT] = await Promise.all([
      sign(claims, process.env.ACCESS_TK_SECRET!, TokenTypeEnum.accessToken),
      sign(claims, process.env.REFRESH_TK_SECRET!, TokenTypeEnum.refreshToken),
    ]);

    const response = NextResponse.json(
      { accessToken: accessJWT },
      { status: 200 }
    );
    
    response.cookies.set({
      name: REFRESH_TOKEN_COOKIE_NAME,
      value: refreshJWT,
      httpOnly: true,
      maxAge: TWO_WEEKS,
    });

    return response;

  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
