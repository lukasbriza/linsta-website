import type { NextApiResponse } from "next";
import { RequestError, ApiError } from "@utils";

export const badRequestResponse = (res: NextApiResponse) => {
  return res.status(400).send(new RequestError());
};
export const serverErrorResponse = (res: NextApiResponse, result: unknown) => {
  return res.status(500).send(result);
};
export const apiErrorResponse = (res: NextApiResponse, message?: string) => {
  return res.status(400).send(new ApiError(new Error(message)));
};
export const sucessResponse = (res: NextApiResponse, result: unknown) => {
  return res.status(200).send(result);
};
