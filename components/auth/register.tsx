import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterValidator, RegisterRequest } from "@lib/validators/register";
import useLocalStorage from "@hooks/useLocalStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_NAME } from "@utils/token";
import { Button } from "@UI/Button";

type ReturnTypeToken = {
  accessToken: string;
};

const RegisterComponent = () => {
  const router = useRouter();
  const { storage, setStorage } = useLocalStorage<string>(
    ACCESS_TOKEN_LOCAL_STORAGE_NAME
  );

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(RegisterValidator),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const clearInputs = () => {
    setValue("email", "");
    setValue("password", "");
    setValue("name", "");
  };

  const { mutate: registerFunc, isLoading } = useMutation({
    mutationFn: async ({ email, password, name }: RegisterRequest) => {
      const payload: RegisterRequest = { email, password, name };
      const { data } = await axios.post("/api/auth/register", payload);
      return data;
    },
    onError: (err: any) => {
      console.log(err.response?.data.error);
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          console.log("not found");
        }
      }
    },
    onSuccess: (data: ReturnTypeToken) => {
      setStorage(data.accessToken);
      router.refresh();
      clearInputs();
      router.push("/");
    },
  });

  const sendLoginData = () => {
    registerFunc({
      email: watch("email"),
      password: watch("password"),
      name: watch("name"),
    });
  };

  useEffect(() => {
    if (storage) {
      router.push("/");
    }
  }, [storage]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(sendLoginData)}
        className="w-80 p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center">Register</h2>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Enter your name..."
            className="w-full px-3 py-2 text-gray-700 border rounded-sm focus:outline-none focus:border-blue-500"
          />
          {errors.name && (
            <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            placeholder="Enter your email..."
            className="w-full px-3 py-2 text-gray-700 border rounded-sm focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password..."
            className="w-full px-3 py-2 text-gray-700 border rounded-sm focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <p className="mt-2 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button
          isLoading={isLoading}
          type="submit"
          className="w-full py-2 font-semibold text-white bg-blue-500 rounded-sm"
        >
          Register
        </Button>
        <Link href="/login">
          <p className="text-center mt-5 transition-all duration-75 hover:scale-95 cursor-pointer">
            I want to login
          </p>
        </Link>
      </form>
    </div>
  );
};

export default RegisterComponent;
