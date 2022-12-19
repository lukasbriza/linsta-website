import axios, { AxiosError } from "axios";
import jwt from "jsonwebtoken";
import {
  Authenticate_response,
  PostLogin_response,
} from "src/abl/Login/_model";
import { apiRoutes } from "../config/routes";
import { loginResponseDecoded, loginProps } from "./_model";

export const loginRequest = async (data: loginProps) => {
  try {
    const response = await axios.post(apiRoutes.login, data);
    const responseData = response.data as PostLogin_response;
    const decoded = jwt.decode(responseData.token) as loginResponseDecoded;

    return { sucess: true, token: responseData.token, data: decoded };
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err);
    }
    return { sucess: false, token: null, data: null };
  }
};

export const logoutRequest = async () => {
  try {
    const response = await axios.delete(apiRoutes.login);
    const status = response.status;

    if (status === 302) {
      return { sucess: true };
    }
    return { sucess: false };
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err);
    }
    return { sucess: false };
  }
};

export const authenticate = async () => {
  try {
    const response = await axios.get(apiRoutes.login);
    const responseData: Authenticate_response = response.data;
    return { sucess: true, data: responseData };
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err);
    }
    return { sucess: false, data: null };
  }
};
