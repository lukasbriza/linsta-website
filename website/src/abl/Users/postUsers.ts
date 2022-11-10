import type { NextApiRequest, NextApiResponse } from "next";
import {
  connectDB,
  User,
  apiErrorResponse,
  DatabaseError,
  serverErrorResponse,
  sucessResponse,
  post,
  findAll,
  UserObject,
  hashPassword,
} from "@utils";
import { PostUsers_request, PostUsers_response } from "./_models";
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
  password: requiredStringValidation("Password", 100),
  permission: Joi.string()
    .required()
    .messages({ "string.empty": `Permission property is required.` }),
});

export const postUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as PostUsers_request;
  const validation = schema.validate(body);

  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  const users = await findAll<UserObject>(User);

  if (users instanceof DatabaseError) {
    return serverErrorResponse(res, users.message);
  }

  const exist = users.find((user) => {
    return user.name === body.name;
  });

  if (exist) {
    return serverErrorResponse(res, "User already exists.");
  }

  //HASH PASSWORD
  const hashedPassword = await hashPassword(body.password);
  body.password = hashedPassword;

  const result: PostUsers_response = await post(User, body);
  const response =
    result instanceof DatabaseError
      ? serverErrorResponse(res, result)
      : sucessResponse(res, result);
  return response;
};
