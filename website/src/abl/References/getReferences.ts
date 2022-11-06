import type { NextApiRequest, NextApiResponse } from "next";
import {
  connectDB,
  Reference,
  findAll,
  findById,
  DatabaseError,
  serverErrorResponse,
  sucessResponse,
  apiErrorResponse,
} from "@utils";
import type { GetReferences_request, GetReferences_response } from "./_models";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().required(),
});

export const getReferences = async (
  req: NextApiRequest,
  res: NextApiResponse<GetReferences_response>
) => {
  const query = req.query as GetReferences_request;
  const validation = schema.validate(query);

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  //FIND BY ID
  if (query.id && !validation.error) {
    const result: GetReferences_response = await findById(Reference, query.id);
    const response =
      result instanceof DatabaseError
        ? serverErrorResponse(res, result)
        : sucessResponse(res, result);
    return response;
  }

  //INVALID QUERY
  if (query.id && validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  //FIND ALL
  if (Object.keys(query).length === 0) {
    const result = (await findAll(Reference)) as GetReferences_response;
    const response =
      result instanceof DatabaseError
        ? serverErrorResponse(res, result)
        : sucessResponse(res, result);
    return response;
  }

  return apiErrorResponse(res, "Unexpected API error.");
};
