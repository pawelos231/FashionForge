import { NextResponse } from "next/server";
import { LoginRequest } from "@lib/validators/login";

export async function POST(request: Request) {
  const body = (await request.json()) as LoginRequest;
  console.log(body.email);
  return NextResponse.json({ s: "siema" });
}
