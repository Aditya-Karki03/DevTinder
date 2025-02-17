// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IRegistrationFormData } from "../../Types/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IRegistrationInitialState,
  IError,
  IOtpGeneratorResponse,
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

const initialState: IRegistrationInitialState = {
  otpGenerationSuccess: false,
  otpGenerationFailure: false,
  otpLoading: false,
  error: null,
  userData: null,
  otpVerificationFailure: false,
  otpVerificationSuccess: false,
  verifyingOtp: false,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    otpGenerationRequest: (
      state,
      _action: PayloadAction<{ email: string }>
    ) => {
      state.otpLoading = false;
      state.error = null;
    },
    otpGenerationSuccessful: (
      state,
      _action: PayloadAction<IOtpGeneratorResponse>
    ) => {
      state.otpLoading = false;
      state.otpGenerationSuccess = true;
    },
    otpGenerationFailure: (state, action: PayloadAction<IError>) => {
      state.otpLoading = false;
      state.otpGenerationFailure = true;
      state.error = action.payload;
    },
  },
});
export const {
  otpGenerationFailure,
  otpGenerationRequest,
  otpGenerationSuccessful,
} = registrationSlice.actions;
export default registrationSlice.reducer;
