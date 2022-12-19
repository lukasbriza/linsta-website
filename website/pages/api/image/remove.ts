import type { NextApiRequest, NextApiResponse } from "next";
import {
  Remove_request,
  Remove_response,
} from "../../../src/abl/image/_models";
import {
  apiErrorResponse,
  connectDB,
  DatabaseError,
  serverErrorResponse,
  sucessResponse,
  removeImg,
} from "@utils";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().required(),
});

export default async function remove(
  req: NextApiRequest,
  res: NextApiResponse<Remove_response>
) {
  const { id } = req.body as Remove_request;
  const validation = schema.validate(id);

  if (req.method !== "DELETE") {
    return apiErrorResponse(res, "Unsupported method!");
  }

  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  const result = await removeImg(id);
  result instanceof DatabaseError
    ? serverErrorResponse(res, result)
    : sucessResponse(res, result);
  return result;
}
