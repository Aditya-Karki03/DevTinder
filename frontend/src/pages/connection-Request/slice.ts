//here we'll get the user feed
//userFeed success
//userFeed failure
//error
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError, IFeedState, IUserConnectionData } from "../../Types/types";

const initialState: IFeedState = {
  userReviewConnections: null,
  userAllRequestLoading: false,
  fetchReviewConnectionsSuccessfull: false,
  fetchReviewConnectionsFailure: false,
  error: null,
};

const userFeedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    feedRequest: (state) => {
      state.userAllRequestLoading = true;
      state.error = null;
    },
    feedRecievedSuccessful: (
      state,
      action: PayloadAction<IUserConnectionData[]>
    ) => {
      state.fetchReviewConnectionsSuccessfull = true;
      state.userAllRequestLoading = false;
      state.userReviewConnections = action.payload;
    },
    feedRecievedFailure: (state, action: PayloadAction<IError>) => {
      state.error = action.payload;
      state.userAllRequestLoading = false;
    },
  },
});

export const { feedRequest, feedRecievedFailure, feedRecievedSuccessful } =
  userFeedSlice.actions;
export default userFeedSlice.reducer;
