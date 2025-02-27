import * as API from "../../services/api";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  IOtpGeneratorResponse,
  IError,
  IOtpVerificationResponse,
  IOtpVerifier,
  ISignupResponse,
} from "../../Types/types";
import {
  emailVerificationFail,
  emailVerificationRequest,
  emailVerificationSucces,
  otpVerificationFail,
  otpVerificationRequest,
  otpVerificationSuccess,
  registrationFail,
  registrationRequest,
  registrationSuccess,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";

function* verifyEmail(
  action: PayloadAction<{ email: string; authType: string }>
) {
  try {
    const data: IOtpGeneratorResponse = yield call(() =>
      API.sendOtp(action.payload)
    );
    if (data?.data?.hash) {
      yield put(emailVerificationSucces(data?.data));
    }
    //if any error send in the message
    else {
      let message: string = "Something went wrong while logging in";
      if (data?.data?.message) {
        message = data?.data?.message;
      }
      const error: IError = {
        error: message,
        errorCode: "404",
      };
      yield put(emailVerificationFail(error));
    }
  } catch (error: any) {
    let message: string = "Something went wrong while email verification";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data: IError = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(emailVerificationFail(data));
  }
}

function* verifyOtp(action: PayloadAction<IOtpVerifier>) {
  try {
    const data: IOtpVerificationResponse = yield call(() =>
      API.verifyOtp(action.payload)
    );
    if (data?.data?.isVerified) {
      yield put(otpVerificationSuccess(data?.data));
    } else {
      const message = data?.data?.message;
      const error: IError = {
        error: message,
        errorCode: "404",
      };
      yield put(otpVerificationFail(error));
    }
  } catch (error: any) {
    console.log(error);
    let message: string = "Something went wrong while verifying otp";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data: IError = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(otpVerificationFail(data));
  }
}

function* register(action: PayloadAction<any>) {
  try {
    const response: ISignupResponse = yield call(() =>
      API.registerUser(action.payload)
    );
    if (response?.data?.user) {
      yield put(registrationSuccess(response?.data));
    } else {
      const message = response?.data?.message;
      const error: IError = {
        error: message,
        errorCode: "404",
      };
      yield put(registrationFail(error));
    }
  } catch (error: any) {
    let message: string = "Something went wrong while verifying otp";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data: IError = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(registrationFail(data));
  }
}

export const signupSaga = [
  takeLatest(emailVerificationRequest, verifyEmail),
  takeLatest(otpVerificationRequest, verifyOtp),
  takeLatest(registrationRequest, register),
];
