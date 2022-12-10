import axios, { AxiosResponse, AxiosError } from "axios";
import { Post_response, Remove_response } from "src/abl/image/_models";
import { apiRoutes } from "../config/routes";
import { SUCESS_STATUS, TIMEOUT } from "./constants";
import { imagePostProps } from "./_model";

const errorHandle = (err: unknown) => {
  if (err instanceof AxiosError) {
    console.error(err);
  }
  return { sucess: false, data: null };
};

export const saveImg = async ({ file }: imagePostProps) => {
  try {
    //CALL
    const response = await axios.post<File, AxiosResponse<Post_response, any>>(
      apiRoutes.postImage,
      { file: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //RETURN API ERROR?
    if (response.data instanceof Error) {
      console.error(response.data);
      return { sucess: false, data: null };
    }
    //STATUS NOK?
    if (response.status !== SUCESS_STATUS) {
      console.error(response.data);
      response.data.id ? removeImg(response.data.id) : null;

      return { sucess: false, data: null };
    }
    //RESPONSE
    return { sucess: true, data: { id: response.data?.id } };
  } catch (err) {
    return errorHandle(err);
  }
};

export const removeImg = async (id: string) => {
  try {
    //CALL
    const response = await axios.delete<
      { id: string },
      AxiosResponse<Remove_response, any>
    >(apiRoutes.removeImage, {
      data: { id: id },
    });

    //RETURN API ERROR?
    if (response.data instanceof Error) {
      console.error(response.data);
      return { sucess: false, data: null };
    }

    //STATUS NOK?
    if (response.status !== SUCESS_STATUS) {
      console.error(response.data);
      return { sucess: false, data: response.data };
    }

    return { sucess: true, data: response.data };
  } catch (err) {
    return errorHandle(err);
  }
};

export const getImg = async (id: string) => {
  try {
    //CALL
    const { data, status, statusText } = await axios.get(apiRoutes.getImage, {
      params: { id: id },
      responseType: "blob",
      timeout: TIMEOUT,
    });
    //RETURN API ERROR?
    if (data instanceof Error) {
      console.error(data.message);
      return { sucess: false, data: null };
    }

    //API ERROR?
    if (status !== SUCESS_STATUS) {
      console.error(data.message);
      return { sucess: false, data: statusText };
    }

    return { sucess: true, data: data };
  } catch (err) {
    return errorHandle(err);
  }
};
