import axios from "axios";
import { ILoginFormData } from "../Types/types";
const API_URL = import.meta.env.API_ENDPOINT || "http://localhost:3000";

export const loginApiCall = (data: ILoginFormData) => {
  //below code returns a promise because axios.post is a async function
  //we handle this promise in the saga using yield call(...)
  return axios.post(`${API_URL}/v1/user/login`, data, {
    withCredentials: true,
  });
};

export const logoutApiCall = () => {
  const data = {};
  return axios.post(`${API_URL}/v1/user/logout`, data, {
    withCredentials: true,
  });
};

//api to get user profile
export const getProfileApiCall = () => {
  return axios.get(`${API_URL}/v1/user-profile/profile`, {
    withCredentials: true,
  });
};

//api to get user feed
export const getFeedApiCall = () => {
  return axios.get(`${API_URL}/v1/user-feed/all`, {
    withCredentials: true,
  });
};
