//the context should have all the data that is needed to make the login and logout smooth
//login & logout function needs to be there
//need error message because error can also occur
//need loading which tells if loading or not
//we need to get the loggedInUser if successful
import { createContext, useContext, useEffect, useRef } from "react";

import { IError, IUserLoginData } from "../Types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUserProfileRequest, loginRequest, logoutRequest } from "./slice";
import { useNavigate } from "react-router-dom";

interface IContextData {
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
  error: IError | null;
  loginInProgress: boolean;
  logoutInProgress: boolean;
  loggedInUser: IUserLoginData | null;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  fetchingLoggedInUser: () => void;
}
export const AuthContext = createContext<IContextData>({
  login: () => {
    console.log("Login");
  },
  logout: () => {
    console.log("Logout");
  },
  error: null,
  loginInProgress: false,
  logoutInProgress: false,
  loggedInUser: null,
  isLoggedIn: false,
  isLoggedOut: false,
  fetchingLoggedInUser: () => {
    console.log("Fetching User Profile");
  },
});
//declare a custom hook called useAuth to wrap the context api
export const useAuth = (): IContextData => {
  return useContext(AuthContext);
};
function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchProfile = useRef(true);
  const error = useSelector((store: RootState) => store?.auth?.error);
  const loginInProgress = useSelector(
    (store: RootState) => store?.auth?.loginInProgress
  );
  const logoutInProgress = useSelector(
    (store: RootState) => store?.auth?.logoutInProgress
  );
  const loggedInUser = useSelector(
    (store: RootState) => store?.auth?.loggedInUser
  );
  const isLoggedIn = useSelector((store: RootState) => store?.auth?.isLoggedIn);
  const isLoggedOut = useSelector(
    (store: RootState) => store?.auth?.isLoggedOut
  );
  const login = (data: { email: string; password: string }) => {
    dispatch(loginRequest(data));
  };
  const logout = () => {
    dispatch(logoutRequest());
  };
  const fetchingLoggedInUser = () => {
    dispatch(fetchUserProfileRequest());
  };
  useEffect(() => {
    console.log(error);

    // if (error?.errorCode == "401") {
    //   navigate("/");
    // }

    //or a notification saying this was the error
  }, [error]);
  useEffect(() => {
    if (isLoggedOut) {
      navigate("/");
    }
  }, [isLoggedOut]);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/dashboard");
    }
  }, []);

  }, [dispatch]);
  //make useEffect call to get the getTheLoggedInUser
  useEffect(() => {
    dispatch(fetchUserProfileRequest());
  }, [isLoggedIn]); //isLoggedIn

  const authValues = {
    error,
    loginInProgress,
    logoutInProgress,
    loggedInUser,
    login,
    logout,
    isLoggedIn,
    isLoggedOut,
    fetchingLoggedInUser,
  };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}
export default AuthProvider;
