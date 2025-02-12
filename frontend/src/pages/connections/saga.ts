import { call, put, takeLatest } from "redux-saga/effects";
import { IError, IShowAllFriends } from "../../Types/types";
import {
  getAllFriendsFailure,
  getAllFriendsRequest,
  getAllFriendsSuccessfull,
} from "./slice";
import * as API from "../../services/api";

function* getAllFriends() {
  try {
    const data: IShowAllFriends = yield call(API.getAllFriends);
    yield put(getAllFriendsSuccessfull(data?.data?.user));
  } catch (error: any) {
    let message = "Something went wrong, while fetching all friends";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data: IError = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(getAllFriendsFailure(data));
  }
}

export const getFriendsSaga = [takeLatest(getAllFriendsRequest, getAllFriends)];
