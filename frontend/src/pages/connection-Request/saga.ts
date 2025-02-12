import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as API from "../../services/api";
import {
  acceptOrRejectConnectionFailure,
  acceptOrRejectConnectionRequest,
  acceptOrRejectConnectionSuccessfull,
  feedRecievedFailure,
  feedRecievedSuccessful,
  feedRequest,
  getAllIncomingConnectionRequest,
  getConnectionsFailure,
  getConnectionsSuccessful,
} from "./slice";
import {
  IError,
  IGetConnectionResponse,
  IUserFeedResponse,
} from "../../Types/types";
import { PayloadAction } from "@reduxjs/toolkit";

function* getUserFeedData() {
  try {
    const data: IUserFeedResponse = yield call(API.getFeedApiCall);
    yield put(feedRecievedSuccessful(data?.data?.user));
  } catch (error: any) {
    let message =
      "Something went wrong, while fetching user profile, please try again later";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(feedRecievedFailure(data));
  }
}

function* getAllConnectionsRequest() {
  try {
    const data: IGetConnectionResponse = yield call(
      API.getAllConnectionRequest
    );
    yield put(getConnectionsSuccessful(data?.data?.user));
  } catch (error: any) {
    let message = "Something went wrong. while fetching all connections";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data: IError = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(getConnectionsFailure(data));
  }
}

//below saga is for accepting/rejecting the request
function* acceptConnectionRequest(
  action: PayloadAction<{ id: string; status: string }>
) {
  try {
    const data: string = yield call(() =>
      API.reviewConnectionRequest(action.payload.status, action.payload.id)
    );
    yield put(acceptOrRejectConnectionSuccessfull(data));
  } catch (error: any) {
    let errorMessage =
      "Something went wrong, while accepting/rejecing connection request";
    if (error?.response?.data?.message) {
      errorMessage = error?.response?.data?.message;
    }
    const data: IError = {
      error: errorMessage,
      errorCode: error?.response?.status,
    };
    yield put(acceptOrRejectConnectionFailure(data));
  }
}

export const getFeedSaga = [
  takeLatest(feedRequest, getUserFeedData),
  takeLatest(acceptOrRejectConnectionRequest, acceptConnectionRequest),
  takeLatest(getAllIncomingConnectionRequest, getAllConnectionsRequest),
];
