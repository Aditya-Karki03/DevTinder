import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginFormData, IProfileData } from "../Types/types";
import { IError, ILoginFormData, IProfileData } from "../Types/types";


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
  // isLoggedIn: boolean;
  // isLoggedOut: boolean;
  // loading: boolean;
  // error: null | string;
  loggedInUser: IUser | null;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  loginInProgress: boolean;
  logoutInProgress: boolean;
  fetchingUserProfile: boolean;
  fetchingUserSuccess: boolean;
  fetchingUserFailure: boolean;
  error: IError | null;
}

const initialState: loginState = {
  loggedInUser: null,
  isLoggedIn: false,
  isLoggedOut: false,
  loginInProgress: false,
  logoutInProgress: false,
  fetchingUserProfile: false,
  fetchingUserSuccess: false,
  fetchingUserFailure: false,
  error: null,
};

const loginUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<ILoginFormData>) => {
      state.loginInProgress = true;
      //remove any previous error
      state.error = null;
    },
    loginSuccessfull: (state, _action: PayloadAction<IUser>) => {
      state.loginInProgress = false;
      state.isLoggedIn = true;
      state.isLoggedOut = false;
      //we will not put data from the response of login
      // state.loggedInUser = action.payload;
    },
    loginFail: (state, action: PayloadAction<IError>) => {
      state.loginInProgress = false;
      state.loggedInUser = null;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      state.error =
        action.payload ||
        "An error occurrred during login. Please check email/password or try again later";
    },
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
  },
});
export const {
  loginRequest,
  loginSuccessfull,
  loginFail,
  logoutRequest,
  logoutSuccessfull,
  logoutFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
} = loginUserSlice.actions;
export default loginUserSlice.reducer;
