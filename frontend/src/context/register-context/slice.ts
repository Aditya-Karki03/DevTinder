import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRegistrationFormData } from "../../Types/types";

const initialState: IRegistrationFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: "",
  gender: "",
  photoUrl: "",
  about: "",
  skills: "",
};

interface IPersonalInfo {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  about: string;

  skills: string;
}

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    emailAndPassword: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    personalInfo: (state, action: PayloadAction<IPersonalInfo>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    image: (state, action: PayloadAction<any>) => {
      state.photoUrl = action.payload;
    },
  },
});
export const { emailAndPassword, image, personalInfo } =
  registrationSlice.actions;
export default registrationSlice.reducer;
