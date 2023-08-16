import { NextResponse } from "next/server"

export async function POST(req) {
    const body = await req.json()
    console.log(body)
    return NextResponse.json({message: "siema"})
}