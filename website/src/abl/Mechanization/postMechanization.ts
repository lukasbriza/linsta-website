import type { NextApiRequest, NextApiResponse } from "next";
import {
  apiErrorResponse,
  connectDB,
  DatabaseError,
  serverErrorResponse,
  sucessResponse,
  post,
  Mechanization,
} from "@utils";
import {
  PostMechanization_request,
  PostMechanization_response,
} from "./_models";
import Joi from "joi";

const requiredStringValidation = (property: string, maxLength: number) => {
  return Joi.string()
    .ruleset.max(maxLength)
    .rule({ message: "Exceeded maximum number of characters." })
    .required()
    .messages({ "string.empty": `${property} property is required.` });
};

const schema = Joi.object({
  name: requiredStringValidation("Name", 50),
  label: requiredStringValidation("Label", 50),
  capacity: requiredStringValidation("Capacity", 50),
  price: Joi.number().required(),
  pictures: requiredStringValidation("Pictures", 150),
});

export const postMechanization = async (
  req: NextApiRequest,
  res: NextApiResponse<PostMechanization_response>
) => {
  const body = req.body as PostMechanization_request;
  const validation = schema.validate(body);

  //SCHEMA VALIDATION ERROR
  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  const result: PostMechanization_response = await post(Mechanization, body);
  const response =
    result instanceof DatabaseError
      ? serverErrorResponse(res, result)
      : sucessResponse(res, result);
  return response;
};
