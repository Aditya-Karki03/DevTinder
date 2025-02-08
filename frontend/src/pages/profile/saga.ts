import { call, put, takeEvery } from "redux-saga/effects";
import { IError, IProfileData, IProfileResponseData } from "../../Types/types";
import * as API from "../../services/api";
import { profileFailure, profileRequest, profileSuccessfull } from "./slice";

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
export const getProfileSaga = [takeEvery(profileRequest, getProfile)];
