import axios, { AxiosResponse, AxiosError } from "axios";
import {
  DeleteMechanization_response,
  GetMechanization_response,
  PostMechanization_response,
  PutMechanization_request,
  PutMechanization_response,
} from "../abl/Mechanization/_models";
import { apiRoutes } from "../config/routes";
import { saveMechanizationProps } from "./_model";

const errorHandle = (err: unknown) => {
  if (err instanceof AxiosError) {
    console.error(err);
  }
  return { sucess: false, data: null };
};

export const saveMechanization = async (data: saveMechanizationProps) => {
  try {
    //CALL
    const response = await axios.post<
      saveMechanizationProps,
      AxiosResponse<PostMechanization_response, any>
    >(apiRoutes.mechanization, data);

    //RETURN API ERROR?
    if (response.data instanceof Error) {
      console.error(response.data);
      return { sucess: false, data: null };
    }

    return { sucess: response.data, data: response.data };
  } catch (err) {
    return errorHandle(err);
  }
};

export const getMechanization = async (id?: string) => {
  try {
    const response = await axios.get<
      any,
      AxiosResponse<GetMechanization_response, any>
    >(apiRoutes.mechanization, id ? { params: { id: id } } : undefined);

    if (response.data instanceof Error) {
      console.error(response.data);
      return { sucess: false, data: null };
    }

    return { sucess: true, data: response.data };
  } catch (err) {
    return errorHandle(err);
  }
};

export const removeMechanization = async (id: string) => {
  try {
    const response = await axios.delete<
      { id: string },
      AxiosResponse<DeleteMechanization_response, any>
    >(apiRoutes.mechanization, { params: { id: id } });

    if (response.data instanceof Error) {
      console.error(response.data);
      return { sucess: false, data: null };
    }

    return { sucess: true, data: response.data };
  } catch (err) {
    return errorHandle(err);
  }
};

export const updateMechanization = async (data: PutMechanization_request) => {
  try {
    const response = await axios.put<
      PutMechanization_request,
      AxiosResponse<PutMechanization_response>
    >(apiRoutes.mechanization, data);

    if (response.data instanceof Error) {
      console.error(response.data);
      return { sucess: false, data: null };
    }

    return { sucess: true, data: response.data };
  } catch (err) {
    return errorHandle(err);
  }
};
