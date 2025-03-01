import { call, put, takeLatest } from "redux-saga/effects";
import * as API from "../../services/api";
import {
  acceptOrRejectConnectionFailure,
  acceptOrRejectConnectionRequest,
  acceptOrRejectConnectionSuccessfull,
  getAllIncomingConnectionRequest,
  getConnectionsFailure,
  getConnectionsSuccessful,
} from "./slice";
import {
  IAcceptRejectConnectionResponse,
  IError,
  IGetConnectionResponse,
  IUserFeedResponse,
} from "../../Types/types";
import { PayloadAction } from "@reduxjs/toolkit";

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
    const data: IAcceptRejectConnectionResponse = yield call(() =>
      API.reviewConnectionRequest(action.payload.status, action.payload.id)
    );
    //sending the id of the request to the reducer needed to remove that particular id from the array of connections
    const dataWithId = { message: data?.data?.message, id: action.payload.id };
    yield put(acceptOrRejectConnectionSuccessfull(dataWithId));
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

export const getConnectionRequestSaga = [
  takeLatest(acceptOrRejectConnectionRequest, acceptConnectionRequest),
  takeLatest(getAllIncomingConnectionRequest, getAllConnectionsRequest),
];
