import type { NextApiRequest, NextApiResponse } from "next";
import {
  connectDB,
  apiErrorResponse,
  remove,
  User,
  DatabaseError,
  serverErrorResponse,
  sucessResponse,
} from "@utils";
import type { DeleteUsers_request, DeleteUsers_response } from "./_models";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().required(),
});

export const deleteUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<DeleteUsers_response>
) => {
  const query = req.query as DeleteUsers_request;
  const validation = schema.validate(query);

  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  const result: DeleteUsers_response = await remove(User, query.id);
  result instanceof DatabaseError
    ? serverErrorResponse(res, result)
    : sucessResponse(res, result);
  return result;
};
