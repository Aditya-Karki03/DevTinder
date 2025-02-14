import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError, IFeedInitialState, IProfileData } from "../../Types/types";

const initialState: IFeedInitialState = {
  getFeedSuccessfull: false,
  getFeedFailure: false,
  feedData: null,
  error: null,
  loading: false,
  //below is for send connection/rejecting the feed
  connectionRejectionSuccess: false,
  connectionRejectionFailure: false,
  connectionRejectionError: null,
  connectionRejectionLoading: false,
  message: null,
};

const feedDataSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    getFeedDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getFeedDataSuccessfull: (state, action: PayloadAction<IProfileData[]>) => {
      state.loading = false;
      state.getFeedSuccessfull = true;
      state.feedData = action.payload;
    },
    getFeedDataFailure: (state, action: PayloadAction<IError>) => {
      state.loading = false;
      state.getFeedFailure = true;
      state.error = action.payload;
    },
    manipulateFeedData: (state, action: PayloadAction<IProfileData[]>) => {
      state.feedData = action.payload;
    },
    //below is reducers for send connection/rejecting the feed
    connectionRejectionRequest: (
      state,
      _action: PayloadAction<{ status: string; id: string }>
    ) => {
      state.connectionRejectionLoading = true;
      state.connectionRejectionError = null;
    },
    connectionRejectionSuccess: (state) => {
      state.connectionRejectionLoading = false;
      state.connectionRejectionSuccess = true;
    },
    connectionRejectionFailure: (state, action: PayloadAction<IError>) => {
      state.connectionRejectionLoading = false;
      state.connectionRejectionFailure = true;
      state.connectionRejectionError = action.payload;
    },
  },
});
export const {
  getFeedDataFailure,
  getFeedDataRequest,
  getFeedDataSuccessfull,
  manipulateFeedData,
  connectionRejectionRequest,
  connectionRejectionSuccess,
  connectionRejectionFailure,
} = feedDataSlice.actions;
export default feedDataSlice.reducer;
