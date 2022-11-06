import type { NextApiRequest, NextApiResponse } from "next";
import {
  connectDB,
  Reference,
  apiErrorResponse,
  DatabaseError,
  serverErrorResponse,
  sucessResponse,
  post,
} from "@utils";
import { PostReferences_response, PostReferences_request } from "./_models";
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
  place: requiredStringValidation("Place", 50),
  realization: requiredStringValidation("Realization", 30),
  detail: requiredStringValidation("Detail", 500),
  pictures: Joi.array()
    .items(
      Joi.string()
        .ruleset.max(150)
        .rule({ message: "Exceeded maximum number of characters" })
    )
    .required()
    .messages({ "string.empty": "Pictures[] property is required." }),
});

export const postReferences = async (
  req: NextApiRequest,
  res: NextApiResponse<PostReferences_response>
) => {
  const body = req.body as PostReferences_request;
  const validation = schema.validate(body);

  //SCHEMA VALIDATION ERROR
  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  const result: PostReferences_response = await post(Reference, body);
  const response =
    result instanceof DatabaseError
      ? serverErrorResponse(res, result)
      : sucessResponse(res, result);
  return response;
};
