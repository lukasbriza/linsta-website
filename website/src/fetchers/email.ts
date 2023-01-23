import axios, { AxiosError, AxiosResponse } from "axios";
import { apiRoutes } from "../config/routes";
import {
  PostSendMail_request,
  PostSendMail_response,
} from "../abl/Mail/_model";

export const sendEmail = async (data: PostSendMail_request) => {
  try {
    const response = await axios.post<
      PostSendMail_request,
      AxiosResponse<PostSendMail_response, any>
    >(apiRoutes.mail, data);

    if (typeof response.data === "string") {
      console.error(response.data);
      return { sucess: false, data: response.data };
    }

    return { sucess: true, data: null };
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err);
      return { sucess: false, data: err.message };
    }
    return { sucess: false, data: null };
  }
};
