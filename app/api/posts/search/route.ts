import { db } from "@lib/db";

const MINI_POST_FETCH_COUNT = 20;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");

  if (!q) return new Response("Invalid query", { status: 400 });

  const results = await db.post.findMany({
    where: {
      title: {
        startsWith: q,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          photoLink: true,
          createdAt: true,
        },
      },
    },
    take: MINI_POST_FETCH_COUNT,
  });

  return new Response(JSON.stringify(results));
}
