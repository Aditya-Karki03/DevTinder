import { call, put, takeLatest } from "redux-saga/effects";
import * as API from "../../services/api";
import { IError, IFeedDataResponse } from "../../Types/types";
import {
  getFeedDataFailure,
  getFeedDataRequest,
  getFeedDataSuccessfull,
} from "./slice";

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

export const feedSaga = [takeLatest(getFeedDataRequest, getFeedData)];
