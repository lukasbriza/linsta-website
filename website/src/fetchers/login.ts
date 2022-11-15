import axios, { AxiosError } from "axios";
import jwt from "jsonwebtoken";
import { PostLogin_response } from "src/abl/Login/_model";
import { apiRoutes } from "../config/routes";
import { loginResponseDecoded } from "./_model";

type login = { token: string };

export const loginRequest = async (data: login) => {
  try {
    const response = await axios.post(apiRoutes.login, data);
    const responseData = response.data as PostLogin_response;
    const decoded = jwt.decode(responseData.token) as loginResponseDecoded;

    return { sucess: true, token: responseData.token, data: decoded };
  } catch (err) {
    console.log(err);
    //set modal
    return { sucess: false, token: null, data: null };
  }
};

export const logoutRequest = async () => {
  try {
    const response = await axios.delete(apiRoutes.login);
    const status = response.status;

    if (status === 302) {
      return { sucess: true, data: null };
    }
    return { sucess: false, data: null };
  } catch (err) {
    console.log(err);
    //set modal
    return { sucess: false, data: null };
  }
};

export const authenticate = async () => {
  try {
    const response = await axios.get(apiRoutes.login);
    console.log(response);
  } catch (err) {
    console.log(err);
    return { sucess: false, data: null };
  }
};
