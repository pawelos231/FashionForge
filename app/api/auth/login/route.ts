import { NextResponse } from "next/server";
import { LoginRequest } from "@lib/validators/login";
import { TokenTypeEnum, sign } from "@utils/token";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = (await req.json()) as LoginRequest;
  const saltRounds = 15;

  bcrypt.genSalt(15, (err, salt) => {
    if (err) {
      console.log(err);
    }
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.log(err);
      }
      if ("chuj") {
      }
      const claims = {
        email: name,
        
      };
    });
  });

  return NextResponse.json({ s: "siema" });
}
