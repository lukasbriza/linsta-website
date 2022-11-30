import { saveReferenceProps } from "./_model";
import axios, { AxiosResponse, AxiosError } from "axios";
import {
  DeleteReferences_response,
  GetReferences_response,
  PostReferences_response,
  PutReferences_request,
  PutReferences_response,
} from "../abl/References/_models";
import { apiRoutes } from "../config/routes";

const errorHandle = (err: unknown) => {
  if (err instanceof AxiosError) {
    //MODAL
  }
  return { sucess: false, data: null };
};

export const saveReference = async (data: saveReferenceProps) => {
  try {
    //CALL
    const response = await axios.post<
      saveReferenceProps,
      AxiosResponse<PostReferences_response, any>
    >(apiRoutes.references, data);

    //RETURN API ERROR?
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

export const getReference = async (id?: string) => {
  try {
    const response = await axios.get<
      any,
      AxiosResponse<GetReferences_response, any>
    >(apiRoutes.references, id ? { params: { id: id } } : undefined);

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

export const removeReference = async (id: string) => {
  try {
    const response = await axios.delete<
      { id: string },
      AxiosResponse<DeleteReferences_response, any>
    >(apiRoutes.references, { params: { id: id } });

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

export const updateReference = async (data: PutReferences_request) => {
  try {
    const response = await axios.put<
      PutReferences_request,
      AxiosResponse<PutReferences_response, any>
    >(apiRoutes.references, data);

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
