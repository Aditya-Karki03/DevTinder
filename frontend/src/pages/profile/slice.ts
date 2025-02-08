//profile request means api call
//api call means probabilty of failure which means error should be there
//success should be there

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfileData, IProfileInitialState, IError } from "../../Types/types";

const initialState: IProfileInitialState = {
  profileFetchingSuccessfull: false,
  profileFetchingFailure: false,
  profileData: null,
  error: null,
  loading: false,
};
const profileDataSlice = createSlice({
  name: "profileData",
  initialState,
  reducers: {
    profileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    profileSuccessfull: (state, action: PayloadAction<IProfileData>) => {
      state.loading = false;
      state.profileFetchingSuccessfull = true;
      state.profileData = action.payload;
    },
    profileFailure: (state, action: PayloadAction<IError>) => {
      state.loading = false;
      state.profileFetchingFailure = true;
      state.error = action.payload;
    },
  },
});
export const { profileRequest, profileFailure, profileSuccessfull } =
  profileDataSlice.actions;
export default profileDataSlice.reducer;
