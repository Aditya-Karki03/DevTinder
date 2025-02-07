import { useForm } from "react-hook-form";
import { loginFormSchema } from "../../schema/schema";
import { ILoginFormData } from "../../Types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "./slice";
import { RootState } from "../../redux/store";
import { LoaderCircle } from "lucide-react";
import Notification from "../../components/Notification";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onSubmit", //validates form after onSubmit gets triggered
  });
  //to navigate
  const navigate = useNavigate();
  //to dispatch action
  const dispatch = useDispatch();
  //subscribing to the store
  const loading = useSelector((state: RootState) => state?.auth?.loading);
  const isLoggedIn = useSelector((state: RootState) => state?.auth?.isLoggedIn);
  const error = useSelector((state: RootState) => state?.auth?.error);
  // const loggedInUser = useSelector((state: RootState) => state?.auth?.user);

  //form submission and api call
  const submitForm = (data: ILoginFormData) => {
    console.log(data);
    dispatch(loginRequest(data));
  };
  //if loggedIn move to dashboard
  if (isLoggedIn) {
    navigate("/dashboard");
  }
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="min-h-screen flex justify-center items-center  p-4"
    >
      {error && <Notification message={error} />}
      {/* sm:p-8 */}
      <div className="max-w-md w-full p-6  bg-white/10 rounded-xl shadow-lg space-y-8">
        <div className="text-center space-y-1.5">
          <h2 className="text-4xl font-bold text-gray-200">Welcome back</h2>
          <p className="text-md">Please sign in to continue</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            {...register("email")}
            className={`block w-full px-2 py-3 rounded-md placeholder-gray-400 border border-white/30 focus:outline-none ${
              errors?.email ? "focus:border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors?.email?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password")}
            className={`block w-full px-2 py-3 rounded-md placeholder-gray-400 border border-white/30 focus:outline-none ${
              errors?.password
                ? "focus:border-red-500"
                : "focus:border-blue-500"
            }`}
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors?.password?.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center bg-blue-500 py-3 rounded-md cursor-pointer hover:bg-blue-600 transition-all"
        >
          {loading ? (
            <LoaderCircle className="w-6 h-6 text-center text-white animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </form>
  );
};

export default Login;
