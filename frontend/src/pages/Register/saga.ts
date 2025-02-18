import * as API from "../../services/api";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  IRegistrationFormData,
  ISignupResponse,
  IError,
} from "../../Types/types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  signUpRequest,
  signUpRequestFailure,
  signUpRequestSuccess,
} from "./slice";

function* signUp(action: PayloadAction<IRegistrationFormData>) {
  try {
    const data: ISignupResponse = yield call(() =>
      API.signUpRequest(action.payload)
    );
    if (data?.data?.user) {
      yield put(signUpRequestSuccess(data));
    } else {
      const error = data?.data?.message;
      yield put(signUpRequestFailure({ error, errorCode: "400" }));
    }
  } catch (error: any) {
    let message = "Something went wrong please try again";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data: IError = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(signUpRequestFailure(data));
  }
}
export const signUpSaga = [takeLatest(signUpRequest, signUp)];
