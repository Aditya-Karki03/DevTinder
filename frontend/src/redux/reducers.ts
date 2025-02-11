import userReducer from "../context/slice";
import profileReducer from "../pages/profile/slice";
import userFeedReducer from "../pages/connection-Request/slice";
const reducers = {
  auth: userReducer,
  profile: profileReducer,
  feed: userFeedReducer,
};
export default reducers;
