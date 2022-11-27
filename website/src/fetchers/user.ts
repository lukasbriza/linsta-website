import { saveUserProps } from "./_model";
import axios, { AxiosResponse, AxiosError } from "axios";
import { apiRoutes } from "../config/routes";
import {
  DeleteUsers_response,
  GetUsers_response,
  PostUsers_response,
} from "../abl/Users/_models";

const errorHandle = (err: unknown) => {
  if (err instanceof AxiosError) {
    //MODAL
  }
  return { sucess: false, data: null };
};

export const saveUser = async (user: saveUserProps) => {
  try {
    //CALL
    const response = await axios.post<
      saveUserProps,
      AxiosResponse<PostUsers_response, any>
    >(apiRoutes.users, user);

    //RETURN API RESPONSE?
    if (response.data instanceof Error) {
      console.log(response.data);
      //MODAL
      return { sucess: false, data: null };
    }

    return { sucess: response.data, data: response.data };
  } catch (err) {
    return errorHandle(err);
  }
};

export const getUsers = async () => {
  try {
    //CALL
    const response = await axios.get<
      any,
      AxiosResponse<GetUsers_response, any>
    >(apiRoutes.users);

    //RETURN API RESPONSE?
    if (response.data instanceof Error) {
      console.log(response.data);
      //MODAL
      return { sucess: false, data: null };
    }

    return { sucess: true, data: response.data };
  } catch (err) {
    return errorHandle(err);
  }
};

export const removeUser = async (id: string) => {
  try {
    const response = await axios.delete<
      { id: string },
      AxiosResponse<DeleteUsers_response, any>
    >(apiRoutes.users, { params: { id: id } });

    if (response.data instanceof Error) {
      console.log(response.data);
      //MODAL
      return { sucess: false, data: null };
    }

    return { sucess: response.data, data: response.data };
  } catch (err) {
    return errorHandle(err);
  }
};
