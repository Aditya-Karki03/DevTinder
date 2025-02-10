import { call, put, takeEvery } from "redux-saga/effects";
import * as API from "../../services/api";
import {
  feedRecievedFailure,
  feedRecievedSuccessful,
  feedRequest,
} from "./slice";
import { IUserFeedResponse } from "../../Types/types";

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

export const getFeedSaga = [takeEvery(feedRequest, getUserFeedData)];
