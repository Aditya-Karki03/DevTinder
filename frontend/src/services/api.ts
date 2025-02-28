import axios from "axios";
import { IEditProfileData, ILoginFormData, IOtpVerifier } from "../Types/types";
import { regitrationFormSchemaType } from "../schema/schema";
const API_URL = import.meta.env.API_ENDPOINT || "http://localhost:3000";

//api to send otp
export const sendOtp = (data: { email: string; authType: string }) => {
  return axios.post(`${API_URL}/v1/user/send-otp`, data, {
    withCredentials: true,
  });
};

//api to verify otp
export const verifyOtp = (data: IOtpVerifier) => {
  return axios.post(`${API_URL}/v1/user/verify-otp`, data, {
    withCredentials: true,
  });
};

//api to sign up
export const signUpRequest = (data: regitrationFormSchemaType) => {
  return axios.post(`${API_URL}/v1/user/signup`, data, {
    withCredentials: true,
  });
};

export const loginApiCall = (data: ILoginFormData) => {
  //below code returns a promise because axios.post is a async function
  //we handle this promise in the saga using yield call(...)
  return axios.post(`${API_URL}/v1/user/verify-otp-and-login`, data, {
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

//api to accept or reject connection request, status and id of the user who sent the connection request will come
export const reviewConnectionRequest = (status: string, id: string) => {
  const data = {};
  return axios.post(
    `${API_URL}/v1/user-connection/review-connection/${status}/${id}`,
    data,
    {
      withCredentials: true,
    }
  );
};

//api to get all the connection request
export const getAllConnectionRequest = () => {
  return axios.get(`${API_URL}/v1/user-connection/get-connection`, {
    withCredentials: true,
  });
};

//api to get all the friends
export const getAllFriends = () => {
  return axios.get(`${API_URL}/v1/user-connection/accepted-connection`, {
    withCredentials: true,
  });
};

//api to get all the feedData
export const getAllFeedData = () => {
  return axios.get(`${API_URL}/v1/user-feed/all`, {
    withCredentials: true,
  });
};

//api to "send" or "ignore" connection request
export const sendIgnoreConnectionRequest = (status: string, _id: string) => {
  return axios.post(
    `${API_URL}/v1user-connection/send-connection/${status}/${_id}`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const registerUser = (data: any) => {
  return axios.post(`${API_URL}/v1/user/signup`, data, {
    withCredentials: true,
  });
};

//api to edit proifle
export const editProfile = (data: IEditProfileData) => {
  return axios.patch(`${API_URL}/v1/user-profile/profile`, data, {
    withCredentials: true,
  });
};
