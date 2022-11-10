import type { NextApiRequest, NextApiResponse } from "next";
import {
  DatabaseError,
  connectDB,
  serverErrorResponse,
  findById,
  findAll,
  MechanizationObjectExt,
  Mechanization,
  sucessResponse,
  apiErrorResponse,
} from "@utils";
import type {
  GetMechanization_request,
  GetMechanization_response,
} from "./_models";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().required(),
});

export const getMechanization = async (
  req: NextApiRequest,
  res: NextApiResponse<GetMechanization_response>
) => {
  const query = req.query as GetMechanization_request;
  const validation = schema.validate(query);

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  //FIND BY ID
  if (query.id && !validation.error) {
    const result = await findById<MechanizationObjectExt>(
      Mechanization,
      query.id
    );
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
    const result = await findAll<MechanizationObjectExt>(Mechanization);
    const response =
      result instanceof DatabaseError
        ? serverErrorResponse(res, result)
        : sucessResponse(res, result);
    return response;
  }

  return apiErrorResponse(res, "Unexpected API error.");
};
