//here we'll get the user feed
//userFeed success
//userFeed failure
//error
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError, IFeedState, IUsersInFeed } from "../../Types/types";

const initialState: IFeedState = {
  userFeed: null,
  userFeedLoading: false,
  userFeedSuccessfull: false,
  userFeedFailure: false,
  error: null,
};

const userFeedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    feedRequest: (state) => {
      state.userFeedLoading = true;
      state.error = null;
    },
    feedRecievedSuccessful: (state, action: PayloadAction<IUsersInFeed[]>) => {
      state.userFeedSuccessfull = true;
      state.userFeedLoading = false;
      state.userFeed = action.payload;
    },
    feedRecievedFailure: (state, action: PayloadAction<IError>) => {
      state.error = action.payload;
      state.userFeedLoading = false;
    },
  },
});

export const { feedRequest, feedRecievedFailure, feedRecievedSuccessful } =
  userFeedSlice.actions;
export default userFeedSlice.reducer;
