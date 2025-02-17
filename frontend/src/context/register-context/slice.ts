// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IRegistrationFormData } from "../../Types/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IRegistrationInitialState,
  IError,
  IOtpGeneratorResponse,
  IOtpVerifier,
} from "../../Types/types";

// const initialState: IRegistrationFormData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   age: "",
//   gender: "",
//   photoUrl: "",
//   about: "",
//   skills: "",
// };

// interface IPersonalInfo {
//   firstName: string;
//   lastName: string;
//   age: string;
//   gender: string;
//   about: string;

//   skills: string;
// }

// const registrationSlice = createSlice({
//   name: "registration",
//   initialState,
//   reducers: {
//     emailAndPassword: (
//       state,
//       action: PayloadAction<{ email: string; password: string }>
//     ) => {
//       state.email = action.payload.email;
//       state.password = action.payload.password;
//     },
//     personalInfo: (state, action: PayloadAction<IPersonalInfo>) => {
//       return {
//         ...state,
//         ...action.payload,
//       };
//     },
//     image: (state, action: PayloadAction<any>) => {
//       state.photoUrl = action.payload;
//     },
//   },
// });
// export const { emailAndPassword, image, personalInfo } =
//   registrationSlice.actions;
// export default registrationSlice.reducer;

const initialUserData = {
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  gender: "",
  photoUrl: "",
  about: "",
  skills: "",
};

const initialState: IRegistrationInitialState = {
  otpGenerationSuccess: false,
  otpGenerationFailure: false,
  otpLoading: false,
  error: null,
  userData: initialUserData,
  hash: null,
  otpVerificationFailure: false,
  otpVerificationSuccess: false,
  verifyingOtp: false,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    otpGenerationRequest: (state, action: PayloadAction<{ email: string }>) => {
      state.otpLoading = true;
      state.error = null;
      state.userData.email = action.payload.email;
    },
    otpGenerationSuccessful: (state, action: PayloadAction<string>) => {
      state.otpLoading = false;
      state.otpGenerationSuccess = true;
      state.hash = action.payload;
    },
    otpGenerationFailure: (state, action: PayloadAction<IError>) => {
      state.otpLoading = false;
      state.otpGenerationFailure = true;
      state.error = action.payload;
    },
    otpVerificationRequest: (state, _action: PayloadAction<IOtpVerifier>) => {
      state.verifyingOtp = true;
      state.error = null;
    },
    otpVerificationSuccessful: (state) => {
      state.verifyingOtp = false;
      state.otpVerificationSuccess = true;
    },
    otpVerificationFailure: (state, action: PayloadAction<IError>) => {
      state.verifyingOtp = false;
      state.otpVerificationFailure = true;
      state.error = action.payload;
    },
  },
});
export const {
  otpGenerationFailure,
  otpGenerationRequest,
  otpGenerationSuccessful,
  otpVerificationFailure,
  otpVerificationRequest,
  otpVerificationSuccessful,
} = registrationSlice.actions;
export default registrationSlice.reducer;
