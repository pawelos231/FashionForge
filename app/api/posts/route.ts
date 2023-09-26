import { NextResponse } from "next/server";
import * as yup from "yup";
import { SearchType } from "@components/homepage/Filters/enums";
import {
  getAllPosts,
  getOldestPosts,
  getVotedPosts,
} from "@lib/dbQueries/post";
import { VoteType } from "@prisma/client";

const ERROR_MESSAGE = "Error while fetching posts :(";

const getPosts = (page: string, limit: string, filter?: SearchType) => {
  if (!filter) return getAllPosts(page, limit);
  switch (filter) {
    case SearchType.ALL:
      return getAllPosts(page, limit);
    case SearchType.DOWN_VOTED:
      return getVotedPosts(page, limit, 123, VoteType.DOWN);
    case SearchType.UP_VOTED:
      return getVotedPosts(page, limit, 123, VoteType.UP);
    case SearchType.OLDEST:
      return getOldestPosts(page, limit);
    default:
      return getAllPosts(page, limit);
  }
};

export async function GET(req: Request) {
  const schema = yup.object({
    limit: yup.string().required(),
    page: yup.string().required(),
    filter: yup.string().oneOf(Object.values(SearchType)).notRequired(),
  });

  try {
    const url = new URL(req.url);

    const { limit, page, filter } = schema.validateSync({
      limit: url.searchParams.get("limit")!,
      page: url.searchParams.get("page")!,
      filter: url.searchParams.get("filter"),
    });
    console.log(filter);

    const posts = await getPosts(page, limit, filter as SearchType | undefined);

    return NextResponse.json(posts, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error: ERROR_MESSAGE,
      },
      { status: 500 }
    );
  }
}
