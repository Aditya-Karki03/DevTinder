import userReducer from "../pages/auth/slice";
import profileReducer from "../pages/profile/slice";
const reducers = {
  auth: userReducer,
  profile: profileReducer,
};
export default reducers;
