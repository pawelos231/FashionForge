import { db } from "@lib/db";
import { PAGES_TO_FETCH } from "@constants/config";

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
  });

  return new Response(JSON.stringify(results));
}
