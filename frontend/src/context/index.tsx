//the context should have all the data that is needed to make the login and logout smooth
//login & logout function needs to be there
//need error message because error can also occur
//need loading which tells if loading or not
//we need to get the loggedInUser if successful
import { createContext, useContext, useEffect } from "react";

import { IError, IOtpVerifier, IUserLoginData } from "../Types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  fetchUserProfileRequest,
  generateOtpRequest,
  logoutRequest,
  verifyOtpRequest,
} from "./slice";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/api";

interface IContextData {
  generateOtp: (data: { email: string }) => void;
  verifyOtp: (data: IOtpVerifier) => void;
  logout: () => void;
  generatingOtp: boolean;
  otpHash: string | null;
  generateOtpFailure: boolean;
  generateOtpSuccess: boolean;
  verifyOtpSuccess: boolean;
  verifyOtpFailure: boolean;
  verifyingOtp: boolean;
  generateOtpError: IError | null;
  verifyOtpError: IError | null;
  logoutInProgress: boolean;
  loggedInUser: IUserLoginData | null;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  fetchingLoggedInUser: () => void;
}
export const AuthContext = createContext<IContextData>({
  generateOtp: () => {
    console.log("Generating OTP");
  },
  verifyOtp: () => {
    console.log("Login");
  },
  logout: () => {
    console.log("Logout");
  },
  generateOtpFailure: false,
  generateOtpSuccess: false,
  verifyOtpSuccess: false,
  verifyOtpFailure: false,
  generatingOtp: false,
  verifyingOtp: false,
  otpHash: null,
  generateOtpError: null,
  verifyOtpError: null,
  logoutInProgress: false,
  loggedInUser: null,
  isLoggedIn: false,
  isLoggedOut: false,
  fetchingLoggedInUser: () => {
    console.log("Fetching User Profile");
  },
});
//declare a custom hook called useAuth to wrap the context api
export const useAuth = (): IContextData => {
  return useContext(AuthContext);
};
function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    generatingOtp,
    generateOtpError,
    generateOtpFailure,
    generateOtpSuccess,
    verifyingOtp,
    verifyOtpError,
    verifyOtpSuccess,
    verifyOtpFailure,
    logoutInProgress,
    loggedInUser,
    isLoggedIn,
    isLoggedOut,
    otpHash,
  } = useSelector((store: RootState) => store?.auth);
  //generate otp action dispatch
  const generateOtp = (data: { email: string }) => {
    dispatch(generateOtpRequest(data));
  };
  const verifyOtp = (data: IOtpVerifier) => {
    dispatch(verifyOtpRequest(data));
  };
  const logout = () => {
    dispatch(logoutRequest());
  };
  const fetchingLoggedInUser = () => {
    dispatch(fetchUserProfileRequest());
  };
  // useEffect(() => {
  //   console.log(error);

  //   // if (error?.errorCode == "401") {
  //   //   navigate("/");
  //   // }

  //   //or a notification saying this was the error
  // }, [error]);
  useEffect(() => {
    if (isLoggedOut) {
      navigate("/");
    }
  }, [isLoggedOut]);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/dashboard");
    }
  }, [dispatch]);
  //make useEffect call to get the getTheLoggedInUser
  useEffect(() => {
    dispatch(fetchUserProfileRequest());
  }, [isLoggedIn]);

  const authValues = {
    generateOtpError,
    verifyOtpError,
    generatingOtp,
    otpHash,
    verifyingOtp,
    logoutInProgress,
    loggedInUser,
    generateOtpFailure,
    generateOtpSuccess,
    verifyOtpSuccess,
    verifyOtpFailure,
    generateOtp,
    verifyOtp,
    logout,
    isLoggedIn,
    isLoggedOut,
    fetchingLoggedInUser,
  };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}
export default AuthProvider;
