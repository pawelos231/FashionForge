import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { PostRequest } from "@lib/validators/postCreation"
import { verify } from "@utils/token"

type AccessTokenHeaderType = {
    changed: boolean
    accessToken: string
}

export async function POST(req, res) {
    
    const headersList = headers()
    const {accessToken, changed} = JSON.parse(headersList.get('access_token')!) as AccessTokenHeaderType

    const [body, userData] = await Promise.all([
        req.json() as PostRequest,
        verify(accessToken, process.env.ACCESS_TK_SECRET!)
    ])
 

    /*
    const newPost = await db.post.create({
        data: {
            title: "",
            blobLink: "",
            content: "",
            authorId: payload.id
        }
    })
    */

    headersList.delete("access_token")

    return NextResponse.json({message: "udało się stworzyć post", accessToken: changed ? accessToken : null}, {status: 200})
}