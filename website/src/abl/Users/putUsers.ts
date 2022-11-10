import type { NextApiRequest, NextApiResponse } from "next";
import {
  apiErrorResponse,
  connectDB,
  DatabaseError,
  put,
  User,
  serverErrorResponse,
  sucessResponse,
  hashPassword,
} from "@utils";
import { PutUsers_request, PutUsers_response } from "./_models";
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
  password: stringValidation(50),
  permission: Joi.string(),
});

export const putUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<PutUsers_response>
) => {
  const body = req.body as PutUsers_request;
  const { id, ...restBody } = body;
  const validation = schema.validate(body);

  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  if (restBody.password) {
    const hashedPassword = await hashPassword(restBody.password);
    restBody.password = hashedPassword;
  }

  const result: PutUsers_response = await put(User, id, restBody);
  const response =
    result instanceof DatabaseError
      ? serverErrorResponse(res, result)
      : sucessResponse(res, result);
  return response;
};
