import userReducer from "../context/slice";
import profileReducer from "../pages/profile/slice";
import userFeedReducer from "../pages/connection-Request/slice";
import userFriendReducer from "../pages/connections/slice";
import feeds from "../pages/feed/slice";
import registrationReducer from "../context/register-context/slice";
const reducers = {
  auth: userReducer,
  profile: profileReducer,
  feed: userFeedReducer,
  friends: userFriendReducer,
  feeds: feeds,
  registration: registrationReducer,
};
export default reducers;
