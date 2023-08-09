import { NextResponse } from "next/server";
import { LoginRequest } from "@lib/validators/login";

export async function POST(req: Request) {
  const body = (await req.json()) as LoginRequest;
  console.log(body.email);
  return NextResponse.json({ s: "siema" });
}
