import { createSlice } from "@reduxjs/toolkit";
import {
  IError,
  IRegistrationFormData,
  ISignUpInitialState,
  ISignupResponse,
} from "../../Types/types";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: ISignUpInitialState = {
  signUpSuccessful: false,
  signUpFailure: false,
  loading: false,
  error: null,
  userData: null,
};
const signUpSlice = createSlice({
  name: "Signup",
  initialState,
  reducers: {
    signUpRequest: (state, _action: PayloadAction<IRegistrationFormData>) => {
      state.loading = true;
      state.error = null;
    },
    signUpRequestSuccess: (state, action: PayloadAction<ISignupResponse>) => {
      state.loading = false;
      state.signUpSuccessful = true;
      state.userData = action.payload.data.user;
    },
    signUpRequestFailure: (state, action: PayloadAction<IError>) => {
      state.loading = false;
      state.signUpFailure = true;
      state.error = action.payload;
    },
  },
});
export const { signUpRequest, signUpRequestFailure, signUpRequestSuccess } =
  signUpSlice.actions;
export default signUpSlice.reducer;
