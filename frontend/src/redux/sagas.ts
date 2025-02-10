import { all } from "redux-saga/effects";
import authSaga from "../context/saga";
import { getProfileSaga } from "../pages/profile/saga";
import { getFeedSaga } from "../pages/dashboard/saga";

export default function* rootSaga() {
  yield all([...authSaga, ...getProfileSaga, ...getFeedSaga]);
}
