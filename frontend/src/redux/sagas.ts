import { all } from "redux-saga/effects";
import authSaga from "../pages/auth/saga";
import { getProfileSaga } from "../pages/profile/saga";

export default function* rootSaga() {
  yield all([...authSaga, ...getProfileSaga]);
}
