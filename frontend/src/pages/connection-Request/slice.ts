//here we'll get the user feed
//userFeed success
//userFeed failure
//error
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IError,
  IFeedState,
  ILovers,
  IUserConnectionData,
} from "../../Types/types";

const initialState: IFeedState = {
  userReviewConnections: null,
  userAllRequestLoading: false,
  fetchReviewConnectionsSuccessfull: false,
  fetchReviewConnectionsFailure: false,
  error: null,
  //following data is for reviewing/rejecting the connection request
  acceptOrRejectionMessage: null,
  reviewingTheRequest: false,
  errorInReviewingRequest: null,
  //getting all the connection request
  wantToConnectUsers: null,
  allConnectionRequest: false,
  connectionsLoading: false,
  errorInGettingConnection: null,
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
    //reducers to get all the connection request
    getAllIncomingConnectionRequest: (state) => {
      state.connectionsLoading = true;
      state.errorInGettingConnection = null;
    },
    getConnectionsSuccessful: (state, action: PayloadAction<ILovers[]>) => {
      state.connectionsLoading = false;
      state.wantToConnectUsers = action.payload;
    },
    getConnectionsFailure: (state, action: PayloadAction<IError>) => {
      state.connectionsLoading = false;
      state.errorInGettingConnection = action.payload;
    },
    //reducers to accept or reject the connection request
    acceptOrRejectConnectionRequest: (
      state,
      _action: PayloadAction<{ status: string; id: string }>
    ) => {
      state.errorInReviewingRequest = null;
      state.reviewingTheRequest = true;
    },
    acceptOrRejectConnectionSuccessfull: (
      state,
      action: PayloadAction<string>
    ) => {
      state.reviewingTheRequest = false;
      state.acceptOrRejectionMessage = action.payload;
    },
    acceptOrRejectConnectionFailure: (state, action: PayloadAction<IError>) => {
      state.reviewingTheRequest = false;
      state.errorInReviewingRequest = action.payload;
    },
  },
});

export const {
  feedRequest,
  feedRecievedFailure,
  feedRecievedSuccessful,
  getAllIncomingConnectionRequest,
  getConnectionsSuccessful,
  getConnectionsFailure,
  acceptOrRejectConnectionRequest,
  acceptOrRejectConnectionSuccessfull,
  acceptOrRejectConnectionFailure,
} = userFeedSlice.actions;
export default userFeedSlice.reducer;
