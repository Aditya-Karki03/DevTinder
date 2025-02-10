// import {
//   ILoginFormData,
//   ILoginResponseData,
//   ILogoutResponseData,
// } from "../../Types/types";
// import { call, put, takeLatest } from "redux-saga/effects";
// import {
//   loginFail,
//   loginRequest,
//   loginSuccessfull,
//   logoutFailure,
//   logoutRequest,
//   logoutSuccessfull,
// } from "./slice";
// import { PayloadAction } from "@reduxjs/toolkit";
// import * as Api from "../../services/api";

// //worker saga
// function* getLoginData(action: PayloadAction<ILoginFormData>) {
//   try {
//     //Api.loginApiCall returns a promise and
//     //the below yield call pauses the execution of generator function until the promise resolves and stores value in data
//     //than behind the scenes the saga calls the next() to resume the execution
//     //if any error in the execution of api call, catch will catch the error
//     const data: ILoginResponseData = yield call(
//       Api.loginApiCall,
//       action.payload
//     );
//     console.log(data.data.user);
//     yield put(loginSuccessfull(data?.data?.user));
//   } catch (error: any) {
//     let errorMessage: string = "Something went wrong while logging in";
//     if (error?.response?.data?.message) {
//       errorMessage = error?.response?.data?.message;
//     }
//     yield put(loginFail(errorMessage));
//     // yield put(loginFail())
//   }
// }

// function* loggingOut() {
//   try {
//     const data: ILogoutResponseData = yield call(Api.logoutApiCall);
//     yield put(logoutSuccessfull);
//   } catch (error: any) {
//     console.log(error);
//     let errorMessage = "Something went wrong while logging out";
//     if (error?.response?.data?.message) {
//       errorMessage = error?.response?.data?.message;
//     }
//     yield put(logoutFailure(errorMessage));
//   }
// }

// //watcher saga
// // export function* watchFetchData() {
// //   yield takeEvery(loginRequest.type, getLoginData);
// // }

// //authSaga is an array because to return multiple sagas from the same file, not necessary for single saga
// //so that we can store in with all the sagas from across the files and store them in the root saga
// //takeLatest takes in account the latest action meaning lets say we clicked login 5 times with takeLatest
// //only the 5 one or the latest one will be taken in to account, rest will be ignored
// //but incase of the takeEvery all the 5 task will run in parallel, nothing will be ignored
// //
// const authSaga = [
//   takeLatest(loginRequest, getLoginData),
//   takeLatest(logoutRequest, loggingOut),
// ];
// export default authSaga;
