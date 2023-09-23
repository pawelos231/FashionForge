import * as yup from "yup";
import { MoreLess, lessMore } from "./util";

export const PostValidator = yup.object().shape({
  title: yup
    .string()
    .required("title is required")
    .min(10, lessMore("title", MoreLess.more, 10))
    .max(60, lessMore("title", MoreLess.less, 60)),
  content: yup
    .string()
    .required("content is required")
    .min(50, lessMore("content", MoreLess.more, 50)),
});

export type PostRequest = Required<yup.InferType<typeof PostValidator>>;
