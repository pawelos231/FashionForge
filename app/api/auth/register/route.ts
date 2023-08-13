import { NextResponse } from "next/server";
import { RegisterRequest } from "@lib/validators/register";
import { TokenTypeEnum, sign, Token } from "@utils/token";
import bcrypt from "bcrypt";
import { Role } from "@utils/role";
import { db } from "@lib/db";
import { TWO_WEEKS } from "@utils/token";
import { REFRESH_TOKEN_COOKIE_NAME } from "@utils/token";

export async function POST(req) {
  try {
    const { email, password, name } = (await req.json()) as RegisterRequest;
    const saltRounds = 15;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 500 }
      );
    }

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        photoLink: "",
        role: Role.USER,
      },
    });

    const claims: Token = {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role as Role,
    };

    const [accessJWT, refreshJWT] = await Promise.all([
      sign(claims, process.env.ACCESS_TK_SECRET!, TokenTypeEnum.accessToken),
      sign(claims, process.env.REFRESH_TK_SECRET!, TokenTypeEnum.refreshToken),
    ]);

    const response = NextResponse.json(
      {
        accessToken: accessJWT,
      },
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
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
