import axios from "axios";
import { ILoginFormData, ILoginResponseData } from "../../Types/types";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccessfull } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
const fetchAPICall = async (data: ILoginFormData) => {
  try {
    const response: ILoginResponseData = await axios.post(
      "http://localhost:3000/v1/user/login",
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//worker saga
function* getLoginData(action: PayloadAction<ILoginFormData>) {
  try {
    const data: ILoginResponseData = yield call(fetchAPICall, action.payload);
    yield put(loginSuccessfull(data.data.user));
  } catch (error) {
    console.error(error);
  }
}

//watcher saga
// export function* watchFetchData() {
//   yield takeEvery(loginRequest.type, getLoginData);
// }

const authSaga = [takeLatest(loginRequest.type, getLoginData)];
export default authSaga;
