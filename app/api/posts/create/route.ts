import { NextResponse } from "next/server"
import { authorize } from "@app/middleware/authMiddleware"


export async function POST(req, res) {
    await authorize(req)
    const token = req.access_token

    return NextResponse.json({message: "udało się stworzyć post", accessToken: token}, {status: 200})
}