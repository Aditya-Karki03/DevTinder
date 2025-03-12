import { call, put, takeLatest } from "redux-saga/effects";
import * as API from "../../services/api";
import {
  newMsgSaveFailure,
  newMsgSaveRequest,
  oldMsgRequest,
  oldMsgRetrieveFailure,
  oldMsgRetrieveSuccessfully,
} from "./slice";
import { ChatResponse, IError } from "../../Types/types";
import { PayloadAction } from "@reduxjs/toolkit";

function* getOldMessages(action: PayloadAction<{ friendsId: string }>) {
  try {
    const response: ChatResponse = yield call(() =>
      API.getOldMessages(action.payload)
    );
    if (response?.data?.chats) {
      yield put(oldMsgRetrieveSuccessfully(response?.data?.chats?.messages));
    } else {
      const errData: IError = {
        error: response?.data?.message,
        errorCode: "400",
      };
      yield put(oldMsgRetrieveFailure(errData));
    }
  } catch (error: any) {
    let message = "Something went wrong, while retrieving old messages";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const errData: IError = {
      error: message,
      errorCode: "400",
    };
    yield put(oldMsgRetrieveFailure(errData));
  }
}

function* saveNewMessage(
  action: PayloadAction<{ recieverId: string; msg: string }>
) {
  try {
    const response: string = yield call(() =>
      API.saveNewMessages(action.payload)
    );
  } catch (error: any) {
    let message = "Something went wrong while saving the messages";
    if (error) {
      message = "";
    }
    const errData: IError = {
      error: message,
      errorCode: "404",
    };
    yield put(newMsgSaveFailure(errData));
  }
}

export const messagesSaga = [
  takeLatest(oldMsgRequest, getOldMessages),
  takeLatest(newMsgSaveRequest, saveNewMessage),
];
