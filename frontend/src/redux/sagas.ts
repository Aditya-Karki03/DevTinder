import { all } from "redux-saga/effects";
import authSaga from "../context/saga";
import { getProfileSaga } from "../pages/profile/saga";
import { getFeedSaga } from "../pages/connection-Request/saga";
import { getFriendsSaga } from "../pages/connections/saga";
import { feedSaga } from "../pages/feed/saga";

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...getProfileSaga,
    ...getFeedSaga,
    ...getFriendsSaga,
    ...feedSaga,
  ]);
}
