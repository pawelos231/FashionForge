import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginRequest, LoginValidator } from "@lib/validators/login";
import { Button } from "@UI/Button";
import Link from "next/link";

const LoginComponent = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }, // Get the form validation errors
  } = useForm<LoginRequest>({
    resolver: yupResolver(LoginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const sendLoginData = () => {
    console.log(watch("email"), watch("password"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(sendLoginData)}
        className="w-80 p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center">Log In</h2>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            className="w-full px-3 py-2 text-gray-700 border rounded-sm focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <p className="mt-2 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full py-2 font-semibold text-white bg-blue-500 rounded-sm"
        >
          Log In
        </Button>
        <Link href={"/register"}>
          <p className="text-center mt-5 transition-all duration-75 hover:scale-95 cursor-pointer">
            I want to register
          </p>
        </Link>
      </form>
    </div>
  );
};

export default LoginComponent;
