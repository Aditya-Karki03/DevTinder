import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  IEditProfileData,
  IError,
  IProfileResponseData,
} from "../../Types/types";
import * as API from "../../services/api";
import {
  editProfileFailure,
  editProfileRequest,
  editProfileSuccessfull,
  profileFailure,
  profileRequest,
  profileSuccessfull,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";

function* getProfile() {
  try {
    const data: IProfileResponseData = yield call(API.getProfileApiCall);
    yield put(profileSuccessfull(data?.data?.user));
  } catch (error: any) {
    let message = "Something went wrong please try again";
    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    }
    const data: IError = {
      error: message,
      errorCode: error?.response?.status,
    };
    yield put(profileFailure(data));
  }
}

function* editProfile(action: PayloadAction<IEditProfileData>) {
  try {
    const data: IProfileResponseData = yield call(() =>
      API.editProfile(action.payload)
    );
    if (data?.data?.user) {
      yield put(editProfileSuccessfull());
    } else {
      const message =
        data?.data?.message || "Something went wrong please try again";
      const error: IError = {
        error: message,
        errorCode: "404",
      };
      yield put(editProfileFailure(error));
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
    yield put(editProfileFailure(data));
  }
}

export const getProfileSaga = [
  takeEvery(profileRequest, getProfile),
  takeLatest(editProfileRequest, editProfile),
];
