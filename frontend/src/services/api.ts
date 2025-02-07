import axios from "axios";
import { ILoginFormData } from "../Types/types";
const API_URL = import.meta.env.API_ENDPOINT || "http://localhost:3000";

export const loginApiCall = (data: ILoginFormData) => {
  console.log(API_URL);
  return axios.post(`${API_URL}/v1/user/login`, data, {
    withCredentials: true,
  });
};
