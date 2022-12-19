import type { NextApiRequest, NextApiResponse } from "next";
import {
  apiErrorResponse,
  connectDB,
  DatabaseError,
  serverErrorResponse,
  put,
  Mechanization,
  sucessResponse,
} from "@utils";
import { PutMechanization_request, PutMechanization_response } from "./_models";
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
  label: stringValidation(50),
  capacity: stringValidation(50),
  price: Joi.number(),
  pictures: stringValidation(150),
  type: Joi.string(),
  order: Joi.number().required(),
});

export const putMechanization = async (
  req: NextApiRequest,
  res: NextApiResponse<PutMechanization_response>
) => {
  const body = req.body as PutMechanization_request;
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

  const result: PutMechanization_response = await put(
    Mechanization,
    id,
    restBody
  );
  const response =
    result instanceof DatabaseError
      ? serverErrorResponse(res, result)
      : sucessResponse(res, result);
  return response;
};
