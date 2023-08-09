import * as yup from "yup";
import { EMAIL_VALIDATOR, PASSWORD_VALIDATIOR } from "@constants/regex";
import { MoreLess, lessMore, PASSWORD_VALIDATION_MESS } from "./util";

export const RegisterValidator = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(10, lessMore("name", MoreLess.more, 10))
    .max(60, lessMore("name", MoreLess.less, 60)),
  email: yup
    .string()
    .email("invalid email")
    .required("email is required")
    .min(10, lessMore("email", MoreLess.more, 10))
    .max(60, lessMore("email", MoreLess.less, 60))
    .matches(EMAIL_VALIDATOR, "invalid email"),
  password: yup
    .string()
    .required("password is required")
    .min(10, lessMore("password", MoreLess.more, 10))
    .max(32, lessMore("password", MoreLess.less, 32))
    .matches(PASSWORD_VALIDATIOR, PASSWORD_VALIDATION_MESS),
});

export type RegisterRequest = Required<yup.InferType<typeof RegisterValidator>>;
