import {
  IError,
  ILoginFormData,
  ILoginResponseData,
  IOtpGeneratorResponse,
  IOtpVerificationResponse,
  IOtpVerifier,
  IProfileResponseData,
} from "../Types/types";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserProfileFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  generateOtpFail,
  generateOtpRequest,
  generateOtpSuccessful,
  logoutFailure,
  logoutRequest,
  logoutSuccessfull,
  verifyOtpFail,
  verifyOtpRequest,
  verifyOtpSuccessful,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import * as Api from "../services/api";

//saga to generate OTP
function* generateOtp(action: PayloadAction<{ email: string }>) {
  try {
    const data: IOtpGeneratorResponse = yield call(() =>
      Api.sendOtp(action.payload)
    );
    if (data?.data?.hash) {
      yield put(generateOtpSuccessful(data?.data));
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
      yield put(generateOtpFail(error));
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
    yield put(generateOtpFail(data));
  }
}

function* verifyOtp(action: PayloadAction<IOtpVerifier>) {
  try {
    const data: IOtpVerificationResponse = yield call(() =>
      Api.verifyOtp(action.payload)
    );
    if (data?.data?.isVerified) {
      yield put(verifyOtpSuccessful());
    } else {
      const message = data?.data?.message;
      const error: IError = {
        error: message,
        errorCode: "404",
      };
      yield put(verifyOtpFail(error));
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
    yield put(verifyOtpFail(data));
  }
}

//worker saga

function* loggingOut() {
  try {
    yield call(Api.logoutApiCall);
    yield put(logoutSuccessfull());
  } catch (error: any) {
    console.log(error);
    let errorMessage = "Something went wrong while logging out";
    if (error?.response?.data?.message) {
      errorMessage = error?.response?.data?.message;
    }
    const data: IError = {
      error: errorMessage,
      errorCode: error?.response?.status,
    };
    yield put(logoutFailure(data));
  }
}

function* fetchMyProfile() {
  try {
    const data: IProfileResponseData = yield call(Api.getProfileApiCall);
    yield put(fetchUserProfileSuccess(data?.data?.user));
  } catch (error: any) {
    let errorMessage = "Something went wrong while fetching profile";
    if (error?.response?.data?.message) {
      errorMessage = error?.response?.data?.message;
    }
    const data: IError = {
      error: errorMessage,
      errorCode: error?.response?.status,
    };
    yield put(fetchUserProfileFailure(data));
  }
}

//watcher saga
// export function* watchFetchData() {
//   yield takeEvery(loginRequest.type, getLoginData);
// }

//authSaga is an array because to return multiple sagas from the same file, not necessary for single saga
//so that we can store in with all the sagas from across the files and store them in the root saga
//takeLatest takes in account the latest action meaning lets say we clicked login 5 times with takeLatest
//only the 5 one or the latest one will be taken in to account, rest will be ignored
//but incase of the takeEvery all the 5 task will run in parallel, nothing will be ignored
//
export const authSaga = [
  takeLatest(generateOtpRequest, generateOtp),
  takeLatest(verifyOtpRequest, verifyOtp),
  takeLatest(fetchUserProfileRequest, fetchMyProfile),
  // takeLatest(loginRequest, getLoginData),
  takeLatest(logoutRequest, loggingOut),
];
