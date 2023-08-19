import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { verify } from "@utils/token";
import { db } from "@lib/db";
import { AccessTokenHeaderType } from "@utils/token";
import * as yup from "yup";

type VoteRequest = { postId: number; voteType: "UP" | "DOWN" };

export async function PATCH(req, res) {
  try {
    const voteSchema = yup.object({
      postId: yup.number().required(),
      voteType: yup
        .string()
        .test("valid-vote-type", "Invalid vote type", (value) => {
          return ["UP", "DOWN"].includes(value!);
        }),
    });

    const headersList = headers();

    const { accessToken, changed } = JSON.parse(
      headersList.get("access_token")!
    ) as AccessTokenHeaderType;

    const [body, userData] = await Promise.all([
      req.json() as VoteRequest,
      verify(accessToken, process.env.ACCESS_TK_SECRET!),
    ]);

    const { postId, voteType } = voteSchema.validateSync({
      postId: body.postId,
      voteType: body.voteType,
    }) as VoteRequest;

    if (!userData.payload) {
      return NextResponse.json(
        { error: "Authorization failed" },
        {
          status: 401,
        }
      );
    }

    const existingVotePromise = db.postVote.findFirst({
      where: {
        userId: userData.payload.id,
        postId,
      },
    });

    const postPromise = db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
      },
    });

    const [post, existingVote] = await Promise.all([
      postPromise,
      existingVotePromise,
    ]);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (existingVote) {
      if (existingVote.type == voteType) {
        await db.postVote.delete({
          where: {
            postId_userId: {
              postId,
              userId: userData.payload.id,
            },
          },
        });

        return NextResponse.json(
          { message: "Successfully removed vote" },
          { status: 200 }
        );
      }

      await db.postVote.update({
        where: {
          postId_userId: {
            postId,
            userId: userData.payload.id,
          },
        },
        data: {
          type: voteType,
        },
      });
      return NextResponse.json(
        { message: "Successfully changed vote" },
        { status: 200 }
      );
    }

    await db.postVote.create({
      data: {
        type: voteType,
        userId: userData.payload.id,
        postId,
      },
    });

    return NextResponse.json(
      { message: "Successfully added vote" },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
