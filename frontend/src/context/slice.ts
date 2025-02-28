import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfileData, IError, IOtpVerifier } from "../Types/types";

interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
}
//after logging in we also need to fetch the user profile, so we will have initialstate & reducers for it as well
//user field can also take the user profile
interface loginState {
  // user: IUser | null;
  // loading: boolean;
  loggedInUser: IUser | null;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  // loginInProgress: boolean;
  logoutInProgress: boolean;
  fetchingUserProfile: boolean;
  fetchingUserSuccess: boolean;
  fetchingUserFailure: boolean;
  error: IError | null;
  //types to generate OTP
  generateOtpSuccess: boolean;
  generateOtpFailure: boolean;
  otpHash: null | string;
  generatingOtp: boolean;
  generateOtpError: IError | null;
  //types to verify otp
  verifyOtpSuccess: boolean;
  verifyOtpFailure: boolean;
  verifyOtpError: IError | null;
  verifyingOtp: boolean;
}

const initialState: loginState = {
  loggedInUser: null,
  isLoggedIn: false,
  isLoggedOut: false,
  // loginInProgress: false,
  logoutInProgress: false,
  fetchingUserProfile: false,
  fetchingUserSuccess: false,
  fetchingUserFailure: false,
  error: null,
  //initial state to generate OTP
  generateOtpSuccess: false,
  generateOtpFailure: false,
  otpHash: null,
  generatingOtp: false,
  generateOtpError: null,
  //initial state to verify otp
  verifyOtpSuccess: false,
  verifyOtpFailure: false,
  verifyingOtp: false,
  verifyOtpError: null,
};

const loginUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutRequest: (state) => {
      state.logoutInProgress = true;
      state.error = null;
    },
    logoutSuccessfull: (state) => {
      state.loggedInUser = null;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      state.logoutInProgress = false;
    },
    logoutFailure: (state, action: PayloadAction<IError>) => {
      state.isLoggedIn = true;
      state.isLoggedOut = false;
      state.error = action.payload;
    },
    fetchUserProfileRequest: (state) => {
      state.fetchingUserProfile = true;
      state.loggedInUser = null;
      state.error = null;
    },
    fetchUserProfileSuccess: (state, action: PayloadAction<IProfileData>) => {
      state.fetchingUserProfile = false;
      state.isLoggedIn = true;
      state.loggedInUser = action.payload;
    },
    fetchUserProfileFailure: (state, action: PayloadAction<IError>) => {
      state.fetchingUserProfile = false;
      state.error = action.payload;
    },
    //reducers to generate OTP
    generateOtpRequest: (
      state,
      _action: PayloadAction<{ email: string; authType: string }>
    ) => {
      state.generatingOtp = true;
      state.generateOtpError = null;
      state.otpHash = null;
    },
    generateOtpSuccessful: (state, action: PayloadAction<{ hash: string }>) => {
      state.generatingOtp = false;
      state.generateOtpSuccess = true;
      state.otpHash = action.payload.hash;
    },
    generateOtpFail: (state, action: PayloadAction<IError>) => {
      state.generatingOtp = false;
      state.generateOtpFailure = true;
      state.otpHash = null;
      state.generateOtpError = action.payload;
    },
    //reducers to verify otp
    verifyOtpRequest: (state, _action: PayloadAction<IOtpVerifier>) => {
      state.verifyingOtp = true;
      state.verifyOtpError = null;
    },
    verifyOtpSuccessful: (state, action: PayloadAction<IProfileData>) => {
      state.verifyingOtp = false;
      state.verifyOtpSuccess = true;
      state.isLoggedIn = true;
      state.isLoggedOut = false;
      //attach the loggedin user as well
      state.loggedInUser = action.payload;
      //take the generate otp state to its inital state
      state.generateOtpSuccess = false;
      state.generateOtpFailure = false;
      state.otpHash = null;
      state.generatingOtp = false;
      state.generateOtpError = null;
    },
    verifyOtpFail: (state, action: PayloadAction<IError>) => {
      state.verifyingOtp = false;
      state.verifyOtpFailure = true;
      state.verifyOtpError = action.payload;
      state.loggedInUser = null;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
    },
  },
});
export const {
  // loginRequest,
  // loginSuccessfull,
  // loginFail,
  logoutRequest,
  logoutSuccessfull,
  logoutFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  //actions to generate otp
  generateOtpFail,
  generateOtpRequest,
  generateOtpSuccessful,
  //actions to verify otp
  verifyOtpFail,
  verifyOtpRequest,
  verifyOtpSuccessful,
} = loginUserSlice.actions;
export default loginUserSlice.reducer;
