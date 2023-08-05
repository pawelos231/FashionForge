import * as yup from "yup";
import { EMAIL_VALIDATOR, PASSWORD_VALIDATIOR } from "@constants/regex";

export const RegisterValidator = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(10, "name must be more than 10 characters")
    .max(60, "name must be less than 60 characters"),
  email: yup
    .string()
    .email("invalid email")
    .required("email is required")
    .min(10, "email must be more than 10 characters")
    .max(60, "email must be less than 60 characters")
    .matches(EMAIL_VALIDATOR, "invalid email"),
  password: yup
    .string()
    .required("password is required")
    .min(10, "password must be more than 10 characters")
    .max(32, "password must be less than 32 characters")
    .matches(
      PASSWORD_VALIDATIOR,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
});

export type RegisterRequest = Required<yup.InferType<typeof RegisterValidator>>;
