import * as yup from "yup";
import { MoreLess, lessMore } from "./util";

export const PostValidator = yup.object().shape({
  title: yup
    .string()
    .required("title is required")
    .min(10, lessMore("title", MoreLess.more, 10))
    .max(60, lessMore("title", MoreLess.less, 60)),
  content: yup.mixed(),
});

export type PostRequest = Required<yup.InferType<typeof PostValidator>>;
