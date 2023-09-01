import * as yup from "yup";

export const CommentValidator = yup.object().shape({
  postId: yup.number().required(),
  text: yup.string().required(),
});

export type CommentRequest = yup.InferType<typeof CommentValidator>;
