import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginFormData } from "../../Types/types";

interface IUser {
  _id: string;
  email: string;
}

interface loginState {
  user: IUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: null | string;
}

const initialState: loginState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const loginUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<ILoginFormData>) => {
      state.loading = true;
      //remove any previous error
      state.error = null;
    },
    loginSuccessfull: (state, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});
export const { loginRequest, loginSuccessfull, loginFail, logout } =
  loginUserSlice.actions;
export default loginUserSlice.reducer;
