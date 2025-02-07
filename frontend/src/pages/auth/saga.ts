import axios from "axios";
import { ILoginFormData, ILoginResponseData } from "../../Types/types";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { loginFail, loginRequest, loginSuccessfull } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import * as Api from "../../services/api";

//worker saga
function* getLoginData(action: PayloadAction<ILoginFormData>) {
  try {
    const data: ILoginResponseData = yield call(
      Api.loginApiCall,
      action.payload
    );
    yield put(loginSuccessfull(data.data.user));
  } catch (error: any) {
    let errorMessage: string = "Something went wrong while logging in";
    if (error?.response?.data?.message) {
      errorMessage = error?.response?.data?.message;
    }
    yield put(loginFail(errorMessage));
    // yield put(loginFail())
  }
}

//watcher saga
// export function* watchFetchData() {
//   yield takeEvery(loginRequest.type, getLoginData);
// }

const authSaga = [takeLatest(loginRequest.type, getLoginData)];
export default authSaga;
