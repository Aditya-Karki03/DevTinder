import { createContext, useContext } from "react";
import {
  IError,
  IOtpVerifier,
  IRegistrationFormData,
  IStepTwoData,
} from "../../Types/types";
import { useDispatch, useSelector } from "react-redux";
import {
  otpGenerationRequest,
  otpVerificationFailure,
  otpVerificationRequest,
  submitRegisteredUserToStore,
} from "./slice";
import { RootState } from "../../redux/store";

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { RootState } from "../../redux/store";
// import { useSelector, UseSelector } from "react-redux";

// export interface IContextRegistration {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   about: string;
//   gender: string;
//   age: string; // Change from string to number
//   skills: string;
//   image: any;
// }

// // ✅ Provide default values, but `setRegistrationValues` should be a function to prevent runtime errors
// const defaultValues: IContextRegistration = {
//   email: "",
//   password: "",
//   firstName: "",
//   lastName: "",
//   about: "",
//   gender: "",
//   age: "",
//   skills: "",
//   image: null,
// };

// export const RegistrationContext =
//   createContext<IContextRegistration>(defaultValues);

// export const useRegistration = () => {
//   return useContext(RegistrationContext);
// };

// const RegistrationProvider = ({ children }: { children: React.ReactNode }) => {
//   const email = useSelector((store: RootState) => store?.registration?.email);
//   const password = useSelector(
//     (store: RootState) => store?.registration?.password
//   );
//   const firstName = useSelector(
//     (store: RootState) => store?.registration?.firstName
//   );
//   const lastName = useSelector(
//     (store: RootState) => store?.registration?.lastName
//   );
//   const age = useSelector((store: RootState) => store?.registration?.age);
//   const gender = useSelector((store: RootState) => store?.registration?.gender);
//   const about = useSelector((store: RootState) => store?.registration?.about);
//   const skills = useSelector((store: RootState) => store?.registration?.skills);
//   const image = useSelector(
//     (store: RootState) => store?.registration?.photoUrl
//   );
//   // Use local state to store registration values
//   const [registrationData, setRegistrationData] =
//     useState<IContextRegistration>(defaultValues);

//   // Update local state whenever Redux state changes
//   useEffect(() => {
//     setRegistrationData({
//       email,
//       password,
//       firstName,
//       lastName,
//       age,
//       gender,
//       about,
//       skills,
//       image,
//     });
//   }, [email, password, firstName, lastName, age, gender, about, skills, image]);

//   //   const registrationValues = {
//   //     email,
//   //     password,
//   //     firstName,
//   //     lastName,
//   //     age,
//   //     gender,
//   //     about,
//   //     skills,
//   //     image,
//   //   };
//   console.log(about);
//   return (
//     <RegistrationContext.Provider value={registrationData}>
//       {children}
//     </RegistrationContext.Provider>
//   );
// };

// export default RegistrationProvider;

interface IRegistration {
  sendOtp: (data: { email: string }) => void;
  verifyOtp: (data: IOtpVerifier) => void;
  personalInfo: (data: IStepTwoData) => void;
  error: IError | null;
  hash?: string | null;
  otpSendingInProgress: boolean;
  otpVerificationInProgress: boolean;
  otpVerified: boolean;
  registeredUser: IRegistrationFormData | null;
}

const defaultValues: IRegistration = {
  sendOtp: () => console.log("OTP Send"),
  verifyOtp: () => console.log("Verify Otp"),
  personalInfo: () => console.log("Personal Info"),
  error: null,
  hash: null,
  otpSendingInProgress: false,
  otpVerificationInProgress: false,
  otpVerified: false,
  registeredUser: null,
};
export const RegistrationContext = createContext<IRegistration>(defaultValues);
export const useRegistration = (): IRegistration => {
  return useContext(RegistrationContext);
};

function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const sendOtp = (data: { email: string }) => {
    dispatch(otpGenerationRequest(data));
  };
  const verifyOtp = ({ email, otp, hash }: IOtpVerifier) =>
    dispatch(otpVerificationRequest({ email, otp, hash }));

  const personalInfo = (data: IStepTwoData) => {
    dispatch(submitRegisteredUserToStore(data));
  };

  const error = useSelector((store: RootState) => store.registration.error);
  const otpSendingInProgress = useSelector(
    (store: RootState) => store?.registration?.otpLoading
  );
  const otpVerified = useSelector(
    (store: RootState) => store?.registration?.otpVerificationSuccess
  );
  const registeredUser = useSelector(
    (store: RootState) => store?.registration?.userData
  );
  const otpVerificationInProgress = useSelector(
    (store: RootState) => store?.registration?.verifyingOtp
  );
  const hash =
    useSelector((store: RootState) => store?.registration?.hash) || "";
  const registrationValues = {
    verifyOtp,
    sendOtp,
    personalInfo,
    error,
    hash,
    otpSendingInProgress,
    otpVerificationInProgress,
    otpVerified,
    registeredUser,
  };
  return (
    <RegistrationContext.Provider value={registrationValues}>
      {children}
    </RegistrationContext.Provider>
  );
}
export default RegistrationProvider;
