import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFriendsState, IProfileData, IError } from "../../Types/types";

const initialState: IFriendsState = {
  getFriendsSuccessful: false,
  getFriendsFailure: false,
  friends: null,
  loading: false,
  error: null,
};

const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    getAllFriendsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllFriendsSuccessfull: (
      state,
      action: PayloadAction<IProfileData[]>
    ) => {
      state.loading = false;
      state.getFriendsSuccessful = true;
      state.friends = action.payload;
    },
    getAllFriendsFailure: (state, action: PayloadAction<IError>) => {
      state.loading = false;
      state.getFriendsFailure = true;
      state.error = action.payload;
    },
  },
});
export const {
  getAllFriendsFailure,
  getAllFriendsSuccessfull,
  getAllFriendsRequest,
} = friendSlice.actions;
export default friendSlice.reducer;
