import { regitrationFormSchemaType } from "../schema/schema";
import axios from "axios";
const API_URL = import.meta.env.API_ENDPOINT || "http://localhost:3000";

export const UseSignup = async (data: any) => {
  try {
    const response: any = axios.post(`${API_URL}/v1/user/signup`, data, {
      withCredentials: true,
    });
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};
