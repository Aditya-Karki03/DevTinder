import { call, put, takeLatest } from "redux-saga/effects";
import * as API from "../../services/api";
import {
  IConnectionResponse,
  IError,
  IFeedDataResponse,
} from "../../Types/types";
import {
  connectionRejectionFailure,
  connectionRejectionRequest,
  connectionRejectionSuccess,
  getFeedDataFailure,
  getFeedDataRequest,
  getFeedDataSuccessfull,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";

function* getFeedData() {
  try {
    const data: IFeedDataResponse = yield call(API.getAllFeedData);
    yield put(getFeedDataSuccessfull(data?.data?.user));
  } catch (error: any) {
    let message = "Something went wrong, while fetching data. Please try again";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data: IError = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(getFeedDataFailure(data));
  }
}

function* sendConnectionRejection(
  action: PayloadAction<{ status: string; id: string }>
) {
  try {
    const data: IConnectionResponse = yield call(() =>
      API.sendIgnoreConnectionRequest(action.payload.status, action.payload.id)
    );
    if (data?.data?.user) {
      yield put(connectionRejectionSuccess());
    }
    yield put(
      connectionRejectionFailure({
        error: "Unable to send connection request",
        errorCode: "500",
      })
    );
  } catch (error: any) {
    let message = "Something went wrong, please try again";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data: IError = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(connectionRejectionFailure(data));
  }
}

export const feedSaga = [
  takeLatest(getFeedDataRequest, getFeedData),
  takeLatest(connectionRejectionRequest, sendConnectionRejection),
];
