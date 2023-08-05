"use Client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidator } from "@lib/validators/login";

type Login = {
  email: string;
  password: string;
};

const Login = () => {
  return <div></div>;
};

export default Login;
