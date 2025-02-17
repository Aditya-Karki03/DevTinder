import { call, put, takeLatest } from "redux-saga/effects";
import {
  IOtpGeneratorResponse,
  IError,
  IOtpVerifier,
  IOtpVerificationResponse,
} from "../../Types/types";
import * as API from "../../services/api";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  otpGenerationFailure,
  otpGenerationRequest,
  otpGenerationSuccessful,
  otpVerificationFailure,
  otpVerificationRequest,
  otpVerificationSuccessful,
} from "./slice";

function* generateOTP(action: PayloadAction<{ email: string }>) {
  try {
    const data: IOtpGeneratorResponse = yield call(() =>
      API.sendOtp(action.payload)
    );
    yield put(otpGenerationSuccessful(data?.data?.hash));
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

function* otpVerification(action: PayloadAction<IOtpVerifier>) {
  try {
    const data: IOtpVerificationResponse = yield call(() =>
      API.verifyOtp(action.payload)
    );
    if (data.data?.isVerified) {
      yield put(otpVerificationSuccessful());
      return;
    }
    const errData: IError = {
      error: data?.data?.message,
      errorCode: "404",
    };
    yield put(otpVerificationFailure(errData));
  } catch (error: any) {
    let errorMessage = "Something went wrong. While verifying OTP";
    if (error?.response?.data?.message) {
      errorMessage = error?.response?.data?.message;
    }
    const data: IError = {
      error: errorMessage,
      errorCode: error?.response?.status,
    };
    yield put(otpVerificationFailure(data));
  }
}

export const registrationSaga = [
  takeLatest(otpGenerationRequest, generateOTP),
  takeLatest(otpVerificationRequest, otpVerification),
];
