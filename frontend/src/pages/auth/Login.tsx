import { useForm } from "react-hook-form";
import { loginFormSchema } from "../../schema/schema";
import { ILoginFormData } from "../../Types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { formSteps } from "../../services/constants";
import ReactOtpInput from "react-otp-input";

const Login = () => {
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onSubmit",
  });
  const { login, error, loginInProgress, isLoggedIn } = useAuth();
  // //to navigate
  const navigate = useNavigate();
  // //to dispatch action
  // const dispatch = useDispatch();
  // //subscribing to the store
  // const loading = useSelector((state: RootState) => state?.auth?.loading);
  // const isLoggedIn = useSelector((state: RootState) => state?.auth?.isLoggedIn);
  // const error = useSelector((state: RootState) => state?.auth?.error);
  // // const loggedInUser = useSelector((state: RootState) => state?.auth?.user);

  //form submission and api call
  const submitForm = (data: ILoginFormData) => {
    login(data);
    // navigate("/dashboard");
  };

  // if loggedIn move to dashboard
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const handlePrev = () => {
    //only 2 steps if it is not one than we don't move to 0
    if (step == 1) {
      setStep((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    //only 2 steps if it is not 0 than we don't move to one
    if (step == 0) {
      setStep((prev) => prev + 1);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="min-h-screen flex justify-center items-center  p-4"
    >
      {/* {error && <Notification message={error?.error} />} */}
      {/* sm:p-8 */}
      <div className="max-w-md min-h-md w-full p-6  bg-white/10 rounded-xl shadow-lg space-y-8  border border-white/20">
        <div className="w-full flex justify-around gap-4">
          <span
            className={`w-56 h-1 rounded-2xl transition-colors ease-in-out duration-1000 ${
              step == 0 || step == 1 || step == 2 || step == 3
                ? "bg-gradient-to-r from-blue-500 via-red-300 to-pink-500"
                : "bg-white"
            }`}
          ></span>
          <span
            className={`w-56 h-1 rounded-2xl transition-colors ease-in-out duration-1000 ${
              step == 1 || step == 2 || step == 3
                ? "bg-gradient-to-r from-blue-500 via-red-300 to-pink-500"
                : "bg-white"
            }`}
          ></span>
        </div>
        <div className="text-center space-y-1.5">
          {step == 1 && (
            <div
              className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-white/20 cursor-pointer"
              onClick={handlePrev}
            >
              <ArrowLeft />
            </div>
          )}
          <h2 className="text-4xl font-bold text-gray-200">Welcome back</h2>
          <p className="text-md">
            {step == 0
              ? "Please sign in to continue"
              : "Enter OTP, click on Verify"}
          </p>
        </div>
        {step == 0 && (
          <motion.div
            // initial={{ x: 0 }}
            // animate={{ x: step == 0 ? "100%" : "-100%", opacity: 0 }}
            initial={{ x: step != 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
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
          </motion.div>
        )}
        {step == 1 && (
          <motion.div
            initial={{ x: step == 1 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 flex flex-col justify-center items-center w-full h-full"
          >
            <label
              htmlFor="otp"
              className="block font-medium text-left w-full px-5"
            >
              OTP:
            </label>
            <ReactOtpInput
              onChange={setOtp}
              value={otp}
              renderInput={(props) => <input {...props} />}
              renderSeparator={<span>-</span>}
              numInputs={6}
              inputStyle={{
                width: "40px",
                height: "40px",
                margin: "0 8px",
                fontSize: "20px",
                borderRadius: "5px",
                border: "2px solid #ccc",
                textAlign: "center",
              }}
            />
          </motion.div>
        )}
        <button
          type="submit"
          className="w-full flex justify-center bg-blue-500 py-3 rounded-md cursor-pointer hover:bg-blue-600 transition-all"
          onClick={handleNext}
        >
          {loginInProgress ? (
            <LoaderCircle className="w-6 h-6 text-center text-white animate-spin" />
          ) : step == 0 ? (
            "Generate OTP"
          ) : (
            "Verify OTP"
          )}
        </button>
        <p className="w-full text-center">
          Don't have account.{" "}
          <Link to={"/register"} className="text-blue-400">
            Register
          </Link>{" "}
          here
        </p>
        {/* <div className="flex w-full justify-between">
          <button
            className="w-10 h-10 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors ease-in-out duration-200"
            onClick={handlePrev}
          >
            <MoveLeft />
          </button>
          {step !== 3 && (
            <button
              className="w-10 h-10 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 cursor-pointer  transition-colors ease-in-out duration-200"
              onClick={handleNext}
            >
              <MoveRight />
            </button>
          )}
        </div> */}
      </div>
    </form>
  );
};

export default Login;
