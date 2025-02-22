import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IError } from "../../Types/types";
import { regitrationFormSchemaType } from "../../schema/schema";

interface ISignup {
  //types for email
  emailVerificationSuccessful: boolean;
  emailVerificationFailure: boolean;
  verifyingEmail: boolean;
  otpHash: string | null;
  emailVerificationError: IError | null;
  //types for otp
  otpVerificationSuccessful: boolean;
  otpVerificationFailure: boolean;
  verifyingOtp: boolean;
  otpStatusMessage: string | null;
  otpVerificationError: IError | null;
  //types for sending all data to db
  dataSendingSuccessful: boolean;
  dataSendingFailure: boolean;
  dataSendingStatusMessage: string | null;
  dataSendingError: IError | null;
  sendingData: boolean;
}
const initialState: ISignup = {
  //initial state for email
  emailVerificationSuccessful: false,
  emailVerificationFailure: false,
  verifyingEmail: false,
  otpHash: null,
  emailVerificationError: null,
  //initial state for otp verification
  otpVerificationSuccessful: false,
  otpVerificationFailure: false,
  otpStatusMessage: null,
  verifyingOtp: false,
  otpVerificationError: null,
  //intitial state to send all the user data to db
  dataSendingSuccessful: false,
  dataSendingFailure: false,
  dataSendingStatusMessage: null,
  dataSendingError: null,
  sendingData: false,
};

const signup = createSlice({
  name: "signup",
  initialState,
  reducers: {
    //reducers for emailVerification
    emailVerificationRequest: (
      state,
      _action: PayloadAction<{ email: string }>
    ) => {
      state.emailVerificationError = null;
      state.verifyingEmail = true;
      state.otpHash = null;
    },
    emailVerificationSucces: (
      state,
      action: PayloadAction<{ hash: string }>
    ) => {
      state.verifyingEmail = false;
      state.emailVerificationSuccessful = true;
      state.otpHash = action.payload.hash;
    },
    emailVerificationFail: (state, action: PayloadAction<IError>) => {
      state.verifyingEmail = false;
      state.emailVerificationFailure = true;
      state.otpHash = null;
      state.emailVerificationError = action.payload;
    },
    //reducers for emailVerification
    otpVerificationRequest: (
      state,
      _action: PayloadAction<{ otp: string; hash: string; email: string }>
    ) => {
      state.verifyingOtp = true;
      state.otpStatusMessage = null;
      state.otpVerificationError = null;
      state.otpVerificationSuccessful = false; // Reset success flag
      state.otpVerificationFailure = false; // Reset failure flag
    },
    otpVerificationSuccess: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.verifyingOtp = false;
      state.otpVerificationSuccessful = true;
      state.otpStatusMessage = action.payload.message;
    },
    otpVerificationFail: (state, action: PayloadAction<IError>) => {
      state.verifyingOtp = false;
      state.otpVerificationFailure = true;
      state.otpVerificationError = action.payload;
    },
    //reducers for sending data to db
    registrationRequest: (state, _action: PayloadAction<any>) => {
      state.sendingData = true;
      state.dataSendingError = null;
      state.dataSendingStatusMessage = null;
    },
    registrationSuccess: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.sendingData = false;
      state.dataSendingSuccessful = true;
      state.dataSendingStatusMessage = action?.payload?.message;
    },
    registrationFail: (state, action: PayloadAction<IError>) => {
      state.sendingData = false;
      state.dataSendingFailure = true;
      state.dataSendingError = action.payload;
    },
  },
});
export const {
  emailVerificationFail,
  emailVerificationRequest,
  emailVerificationSucces,
  otpVerificationFail,
  otpVerificationRequest,
  otpVerificationSuccess,
  registrationFail,
  registrationRequest,
  registrationSuccess,
} = signup.actions;
export default signup.reducer;
