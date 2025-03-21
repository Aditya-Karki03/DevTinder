import { SubmitHandler, useForm } from "react-hook-form";
import { Loader2, MoveLeft, MoveRight } from "lucide-react";
import { formSteps } from "../../services/constants";
import { useEffect, useState } from "react";
import {
  registerFormSchema,
  regitrationFormSchemaType,
  otpSchema,
} from "../../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import ReactOtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  emailVerificationRequest,
  otpVerificationRequest,
  registrationRequest,
} from "./slice";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

type fieldName = keyof regitrationFormSchemaType;

const Form = () => {
  const {
    verifyingEmail,
    emailVerificationSuccessful,
    emailVerificationFailure,
    emailVerificationError,
    otpHash,
    verifyingOtp,
    otpVerificationSuccessful,
    otpVerificationError,
    otpStatusMessage,
    sendingData,
    dataSendingSuccessful,
    dataSendingStatusMessage,
    dataSendingError,
  } = useSelector((store: RootState) => store?.signup);

  const dispatch = useDispatch();
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<regitrationFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!verifyingEmail) {
      if (emailVerificationFailure) {
        toast.error(emailVerificationError?.error || "");
        console.log(emailVerificationError);
      } else if (emailVerificationSuccessful && step == 0) {
        toast.success("OTP sent successfully. Please Check Your Email");
        setStep((prev) => prev + 1);
      }
    }
    if (!verifyingOtp) {
      // Only process when verification is complete
      if (otpVerificationError) {
        toast.error(otpVerificationError.error);
        console.log(otpVerificationError.error);
      } else if (otpVerificationSuccessful && step == 1) {
        toast.success(otpStatusMessage);
        setStep((prev) => prev + 1);
        // dispatch(resetOtpState());
      }
    }
    if (!sendingData) {
      if (dataSendingError) {
        toast.error(dataSendingError.error);
      } else if (dataSendingSuccessful && step == 3) {
        toast.success(dataSendingStatusMessage);
        navigate("/dashboard/profile");
      }
    }
  }, [
    emailVerificationSuccessful,
    verifyingEmail,
    emailVerificationError,
    verifyingOtp,
    otpVerificationError,
    otpVerificationSuccessful,
    otpStatusMessage,
    sendingData,
    dataSendingSuccessful,
    dataSendingStatusMessage,
    dataSendingError,
  ]);

  //to move left
  const handlePrev = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const processForm: SubmitHandler<regitrationFormSchemaType> = async (
    data
  ) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      // Handle objects differently
      if (typeof value === "object" && value !== null) {
        // If it's the image object
        if (key === "image" && value[0]) {
          formData.append("image", value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });
    dispatch(registrationRequest(formData));
  };

  //to handle right
  const handleNext = async () => {
    //this is how we will validate our form step by step
    //it will get all the fields in that form, eg: for 1st: email & password
    // const field:string = formSteps[step].fields;

    //below will trigger formValidation for selected fields only and will return promise hence await

    const success = await trigger(formSteps[step].fields as fieldName[], {
      shouldFocus: true,
    });

    if (!success) return;
    //if 1st step than make api request to generate OTP
    if (step == 0) {
      const email = getValues("email");
      const requestData = {
        email,
        authType: "registration",
      };
      dispatch(emailVerificationRequest(requestData));
    }
    if (step == 1) {
      const data = otpSchema.safeParse({ otp });
      if (!data.success) {
        toast.error("Invalid OTP");
        return;
      }
      const otpData = {
        email: getValues("email") || "",
        otp,
        hash: otpHash || "",
      };
      dispatch(otpVerificationRequest(otpData));
    }

    if (step == 2) {
      setStep((prev) => prev + 1);
    }

    if (step == 3) {
      //upload the image and submit the form
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-around items-center px-10 border border-white/20 rounded-lg bg-white/3">
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
        <span
          className={`w-56 h-1 rounded-2xl transition-colors ease-in-out duration-1000 ${
            step == 2 || step == 3
              ? "bg-gradient-to-r from-blue-500 via-red-300 to-pink-500"
              : "bg-white"
          }`}
        ></span>
        <span
          className={`w-56 h-1 rounded-2xl transition-colors ease-in-out duration-1000 ${
            step == 3
              ? "bg-gradient-to-r from-blue-500 via-red-300 to-pink-500"
              : "bg-white"
          }`}
        ></span>
      </div>
      <form
        onSubmit={handleSubmit(processForm)}
        className="w-full min-h-8/10 overflow-hidden"
        encType="multipart/form-data"
      >
        {step === 0 && (
          <motion.div
            initial={{ x: `${step >= 0 ? "50%" : "-50%"}`, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full flex flex-col items-center justify-center gap-8 border border-white/10 bg-white/5 rounded-lg p-8 backdrop-blur-sm relative" // Added relative
          >
            {verifyingEmail && (
              <div className="absolute inset-0 bg-black/20 flex justify-center items-center rounded-lg z-50">
                <Loader2 className="w-14 h-14 text-white animate-spin" />
              </div>
            )}
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-semibold text-center text-gray-100 mb-1">
                Enter Your Email & Click on Verify
              </h2>
              <p className="text-gray-400 text-sm text-center">
                Please provide your email to continue
              </p>
            </div>
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="text"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-md bg-black/20 border ${
                    errors?.email ? "border-red-500/50" : "border-white/10"
                  } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your email"
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
            </div>
            <p className="text-center py-2 ">
              Already have an account?{" "}
              <Link className="text-blue-400" to={"/"}>
                Sign In
              </Link>
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ x: `${step >= 0 ? "50%" : "-50%"}`, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full flex flex-col items-center justify-center gap-8 border border-white/10 bg-white/5 rounded-lg p-8 backdrop-blur-sm"
          >
            <div className="text-center flex flex-col justify-center items-center gap-3.5 ">
              <h2 className="text-2xl font-semibold text-center text-gray-100 mb-1 ">
                Enter Your OTP & Click on Verify
              </h2>
              <ReactOtpInput
                onChange={setOtp}
                value={otp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "40px",
                  height: "40px",
                  margin: "0 8px",
                  fontSize: "20px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  textAlign: "center",
                }}
                containerStyle={{
                  display: "flex",
                  justifyContent: "center",
                }}
              />
              <button
                type="button"
                className="bg-blue-500 px-5 py-2 rounded-md cursor-pointer hover:bg-blue-600 duration-100 w-30 flex justify-center items-center"
                onClick={handleNext}
              >
                {verifyingOtp ? (
                  <Loader2 className="h-6 w-6 flex justify-center items-center animate-spin text-white" />
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            initial={{ x: `${step >= 1 ? "50%" : "-50%"}`, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full flex flex-col items-center gap-8 border border-white/10 bg-white/5 rounded-lg p-8 backdrop-blur-sm"
          >
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl font-semibold text-center text-gray-100 mb-1">
                Enter Your Personal Information
              </h2>
              <p className="text-gray-400 text-sm text-center">
                Please fill in all the required details
              </p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Firstname
                  </label>
                  <input
                    type="text"
                    {...register("firstName")}
                    className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${
                      errors?.firstName
                        ? "border-red-500/50"
                        : "border-white/10"
                    } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your firstname"
                  />
                  {errors?.firstName && (
                    <p className="text-sm text-red-500">
                      {errors?.firstName?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    {...register("age")}
                    className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${
                      errors?.age ? "border-red-500/50" : "border-white/10"
                    } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your age"
                  />
                  {errors?.age && (
                    <p className="text-sm text-red-500">
                      {errors?.age?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Skills
                  </label>
                  <input
                    type="text"
                    {...register("skills")}
                    className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${
                      errors?.skills ? "border-red-500/50" : "border-white/10"
                    } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your skills"
                  />
                  {errors?.skills && (
                    <p className="text-sm text-red-500">
                      {errors?.skills?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Lastname
                  </label>
                  <input
                    type="text"
                    {...register("lastName")}
                    className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${
                      errors?.lastName ? "border-red-500/50" : "border-white/10"
                    } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your lastname"
                  />
                  {errors?.lastName && (
                    <p className="text-sm text-red-500">
                      {errors?.lastName?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    {...register("gender")}
                    className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${
                      errors?.gender ? "border-red-500/50" : "border-white/10"
                    } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your gender"
                  />
                  {errors?.gender && (
                    <p className="text-sm text-red-500">
                      {errors?.gender?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-300"
                  >
                    About
                  </label>
                  <textarea
                    {...register("about")}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${
                      errors?.about ? "border-red-500/50" : "border-white/10"
                    } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 resize-none`}
                    placeholder="Tell us about yourself"
                  />
                  {errors?.about && (
                    <p className="text-sm text-red-500">
                      {errors?.about?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div className="w-full h-full relative">
            {sendingData && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-30 bg-black/20">
                <Loader2 className="h-14 w-14 text-white animate-spin" />
              </div>
            )}
            <div className="relative w-full h-1/4 min-h-[200px]">
              <input
                type="file"
                {...register("image")}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
              />
              <div className="w-full h-full border-2 border-dashed border-white/20 rounded-lg bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center p-6 hover:border-blue-500/50 transition-colors duration-200">
                <div className="flex flex-col items-center gap-3 text-gray-300">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-gray-200 font-medium">
                      Drag and drop your image here
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      or click to select file
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            {errors.image && (
              <p className="w-full text-center text-red-500">
                {errors?.image?.message?.toString()}
              </p>
            )}
            {step === 3 && (
              <div className="w-full flex justify-center items-center my-7">
                <button
                  onSubmit={handleSubmit(processForm)}
                  type="submit"
                  className="px-4 py-1 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 cursor-pointer  transition-colors ease-in-out duration-200"
                >
                  Submit
                </button>
              </div>
            )}
          </motion.div>
        )}
      </form>
      <div className="flex w-full justify-between">
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
      </div>
    </div>
  );
};
export default Form;
