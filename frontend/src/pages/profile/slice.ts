//profile request means api call
//api call means probabilty of failure which means error should be there
//success should be there

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IProfileData,
  IProfileInitialState,
  IError,
  IEditProfileData,
} from "../../Types/types";

const initialState: IProfileInitialState = {
  profileFetchingSuccessfull: false,
  profileFetchingFailure: false,
  profileData: null,
  error: null,
  loading: false,
  //initial state for edit profile request
  editProfileSuccess: false,
  errorOnEdit: null,
  editProfileFailure: false,
  editingInProgress: false,
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
    //reducers for edit profile
    editProfileRequest: (state, _action: PayloadAction<IEditProfileData>) => {
      state.editingInProgress = true;
      state.errorOnEdit = null;
    },
    editProfileSuccessfull: (state) => {
      state.editProfileSuccess = true;
      state.editingInProgress = false;
    },
    editProfileFailure: (state, action: PayloadAction<IError>) => {
      state.editProfileFailure = true;
      state.errorOnEdit = action.payload;
      state.editingInProgress = false;
    },
  },
});
export const {
  profileRequest,
  profileFailure,
  profileSuccessfull,
  editProfileRequest,
  editProfileFailure,
  editProfileSuccessfull,
} = profileDataSlice.actions;
export default profileDataSlice.reducer;
