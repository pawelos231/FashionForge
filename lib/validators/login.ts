import * as yup from "yup";
import { EMAIL_VALIDATOR } from "@constants/regex";
import { lessMore, MoreLess } from "./util";

export const LoginValidator = yup.object().shape({
  email: yup
    .string()
    .email("invalid email")
    .required("email is required")
    .min(10, lessMore("email", MoreLess.more, 10))
    .max(60, lessMore("email", MoreLess.less, 60))
    .matches(EMAIL_VALIDATOR, "invalid email"),
  password: yup.string().required("password is required"),
});

export type LoginRequest = Required<yup.InferType<typeof LoginValidator>>;
