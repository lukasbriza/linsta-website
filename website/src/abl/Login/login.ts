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
import cookie from "cookie";
import bcryptjs from "bcryptjs";
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
  iat: Joi.number(),
});

export const login = async (
  req: NextApiRequest,
  res: NextApiResponse<PostLogin_response>
) => {
  const token = jwt.verify(
    req.body.token,
    process.env.NEXT_PUBLIC_JWT_REGISTRATION_KEY!
  );

  const body = token as PostLogin_request;
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
  let userToCompare: UserObjectExt[] = [];
  users.forEach((user) => {
    if (user.name === body.name) {
      return userToCompare.push(user);
    }
    return;
  });

  if (userToCompare.length === 0) {
    return serverErrorResponse(res, "User does not exist.");
  }

  if (userToCompare.length > 1) {
    return serverErrorResponse(
      res,
      "Multiple user error, contact administrator."
    );
  }

  if (userToCompare.length === 1) {
    //COMPARE PASSWORDS
    const compareResult = await bcryptjs.compare(
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

    res.setHeader(
      "Set-cookie",
      cookie.serialize("Authorization", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );

    return sucessResponse(res, response);
  }
};
