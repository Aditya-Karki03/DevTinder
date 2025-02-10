// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ILoginFormData } from "../../Types/types";

// interface IUser {
//   _id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   gender: string;
//   age: number;
// }

// interface loginState {
//   user: IUser | null;
//   isLoggedIn: boolean;
//   isLoggedOut: boolean;
//   loading: boolean;
//   error: null | string;
// }

// const initialState: loginState = {
//   user: null,
//   isLoggedIn: false,
//   isLoggedOut: true,
//   loading: false,
//   error: null,
// };

// const loginUserSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginRequest: (state, _action: PayloadAction<ILoginFormData>) => {
//       state.loading = true;
//       //remove any previous error
//       state.error = null;
//     },
//     loginSuccessfull: (state, action: PayloadAction<IUser>) => {
//       state.loading = false;
//       state.isLoggedIn = true;
//       state.isLoggedOut = false;
//       state.user = action.payload;
//     },
//     loginFail: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.isLoggedIn = false;
//       state.isLoggedOut = true;
//       state.error = action.payload;
//     },
//     logoutRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     logoutSuccessfull: (state) => {
//       state.user = null;
//       state.isLoggedIn = false;
//       state.isLoggedOut = true;
//       state.loading = false;
//     },
//     logoutFailure: (state, action: PayloadAction<string>) => {
//       state.isLoggedIn = true;
//       state.isLoggedOut = false;
//       state.error = action.payload;
//     },
//   },
// });
// export const {
//   loginRequest,
//   loginSuccessfull,
//   loginFail,
//   logoutRequest,
//   logoutSuccessfull,
//   logoutFailure,
// } = loginUserSlice.actions;
// export default loginUserSlice.reducer;
