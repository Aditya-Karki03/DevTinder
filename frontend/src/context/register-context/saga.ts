import { call, put, takeLatest } from "redux-saga/effects";
import { IOtpGeneratorResponse, IError } from "../../Types/types";
import * as API from "../../services/api";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  otpGenerationFailure,
  otpGenerationRequest,
  otpGenerationSuccessful,
} from "./slice";

function* generateOTP(action: PayloadAction<{ email: string }>) {
  try {
    const data: IOtpGeneratorResponse = yield call(() =>
      API.sendOtp(action.payload.email)
    );
    yield put(otpGenerationSuccessful(data));
  } catch (error: any) {
    let message: string = "Something went wrong while logging in";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data: IError = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(otpGenerationFailure(data));
  }
}

export const registrationSaga = [takeLatest(otpGenerationRequest, generateOTP)];
