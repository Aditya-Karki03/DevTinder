//here we'll get the user feed
//userFeed success
//userFeed failure
//error
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError, IFeedState, ILovers } from "../../Types/types";

const initialState: IFeedState = {
  //getting all the connection request
  wantToConnectUsers: null,
  connectionsLoading: false,
  errorInGettingConnection: null,
  //following data is for reviewing/rejecting the connection request
  acceptOrRejectionMessage: null,
  reviewingTheRequest: false,
  errorInReviewingRequest: null,
  acceptOrRejectionSuccessful: false,
  acceptOrRejectionFailure: false,
};

const userFeedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
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
      action: PayloadAction<{ message: string; id: string }>
    ) => {
      state.reviewingTheRequest = false;
      state.acceptOrRejectionMessage = action.payload.message;
      state.acceptOrRejectionSuccessful = true;
      //if user accepts or rejects we need to remove it from the array
      state.wantToConnectUsers =
        state.wantToConnectUsers?.filter(
          (user) => user?._id !== action.payload.id
        ) || state.wantToConnectUsers;
    },
    acceptOrRejectConnectionFailure: (state, action: PayloadAction<IError>) => {
      state.reviewingTheRequest = false;
      state.errorInReviewingRequest = action.payload;
      state.acceptOrRejectionFailure = true;
    },
  },
});

export const {
  getAllIncomingConnectionRequest,
  getConnectionsSuccessful,
  getConnectionsFailure,
  acceptOrRejectConnectionRequest,
  acceptOrRejectConnectionSuccessfull,
  acceptOrRejectConnectionFailure,
} = userFeedSlice.actions;
export default userFeedSlice.reducer;
