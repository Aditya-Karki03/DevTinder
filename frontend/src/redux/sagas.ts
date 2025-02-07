import { all } from "redux-saga/effects";
import authSaga from "../pages/auth/saga";

export default function* rootSaga() {
  yield all([...authSaga]);
}
