import axios, { AxiosResponse, AxiosError } from "axios";
import { Post_response, Remove_response } from "src/abl/image/_models";
import { apiRoutes } from "../config/routes";
import { imagePostProps } from "./_model";

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
      console.log(response.data);
      //MODAL
      return { sucess: false, data: null };
    }
    //STATUS NOK?
    if (response.status !== 200) {
      console.log(response.data);
      //MODAL

      response.data.id ? removeImg(response.data.id) : null;

      return { sucess: false, data: null };
    }
    //RESPONSE
    return { sucess: true, data: { id: response.data?.id } };
  } catch (err) {
    if (err instanceof AxiosError) {
      //MODAL
    }
    return { sucess: false, data: null };
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
      return { sucess: false, data: null };
    }

    //STATUS NOK?
    if (response.status !== 200) {
      return { sucess: false, data: response.data };
    }

    return { sucess: true, data: response.data };
  } catch (err) {
    if (err instanceof AxiosError) {
      //MODAL
    }
    return { sucess: false, data: null };
  }
};
