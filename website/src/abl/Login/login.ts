import type { NextApiRequest, NextApiResponse } from "next";
import {
  connectDB,
  apiErrorResponse,
  User,
  DatabaseError,
  serverErrorResponse,
  sucessResponse,
  findAll,
  UserObjectExt,
} from "@utils";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PostLogin_request, PostLogin_response } from "./_model";
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
});

export const login = async (
  req: NextApiRequest,
  res: NextApiResponse<PostLogin_response>
) => {
  const body = req.body as PostLogin_request;
  const validation = schema.validate(body);

  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  const users = await findAll<UserObjectExt>(User);

  if (users instanceof DatabaseError) {
    return serverErrorResponse(res, users.message);
  }

  //FIND BY NAME
  const userToCompare = users.map((user) => {
    if (user.name === body.name) {
      return user;
    }
  });

  if (userToCompare === undefined) {
    return serverErrorResponse(res, "User does not exist.");
  }
  if (userToCompare.length === 1 && userToCompare[0] !== undefined) {
    //COMPARE PASSWORDS
    const compareResult = await bcrypt.compare(
      body.password,
      userToCompare[0].password
    );

    if (!compareResult) {
      return serverErrorResponse(res, "Wrong password.");
    }

    const token = jwt.sign(
      {
        _id: userToCompare[0]._id,
        permission: userToCompare[0].permission,
      },
      process.env.JWT_PRIVATE_KEY!,
      { expiresIn: "1h" }
    );

    const response: PostLogin_response = {
      token: token,
    };

    return sucessResponse(res, response);
  }
};
