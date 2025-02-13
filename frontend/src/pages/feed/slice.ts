import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError, IFeedInitialState, IProfileData } from "../../Types/types";

const initialState: IFeedInitialState = {
  getFeedSuccessfull: false,
  getFeedFailure: false,
  feedData: null,
  error: null,
  loading: false,
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
  },
});
export const {
  getFeedDataFailure,
  getFeedDataRequest,
  getFeedDataSuccessfull,
} = feedDataSlice.actions;
export default feedDataSlice.reducer;
