import type { NextApiRequest, NextApiResponse } from "next";
import {
  apiErrorResponse,
  connectDB,
  DatabaseError,
  put,
  Reference,
  serverErrorResponse,
  sucessResponse,
} from "@utils";
import { PutReferences_request, PutReferences_response } from "./_models";
import Joi from "joi";

const stringValidation = (maxLenght: number) => {
  return Joi.string()
    .ruleset.max(maxLenght)
    .rule({ message: "Exceeded maximum number of characters." });
};

const requiredStringValidation = (property: string, maxLength: number) => {
  return Joi.string()
    .ruleset.max(maxLength)
    .rule({ message: "Exceeded maximum number of characters." })
    .required()
    .messages({ "string.empty": `${property} property is required.` });
};

const schema = Joi.object({
  id: requiredStringValidation("id", 150),
  name: stringValidation(50),
  place: stringValidation(50),
  realization: stringValidation(30),
  detail: stringValidation(500),
  img: Joi.array().items(
    Joi.string()
      .ruleset.max(150)
      .rule({ message: "Exceeded maximum number of characters." })
  ),
});

export const putReferences = async (
  req: NextApiRequest,
  res: NextApiResponse<PutReferences_response>
) => {
  const body = req.body as PutReferences_request;
  const { id, ...restBody } = body;
  const validation = schema.validate(body);

  //SCHEMA VALIDATION ERROR
  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  const result: PutReferences_response = await put(Reference, id, restBody);
  const response =
    result instanceof DatabaseError
      ? serverErrorResponse(res, result)
      : sucessResponse(res, result);
  return response;
};
