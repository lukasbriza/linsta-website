import type { NextApiRequest, NextApiResponse } from "next";
import {
  connectDB,
  User,
  UserObjectExt,
  findAll,
  DatabaseError,
  serverErrorResponse,
  sucessResponse,
} from "@utils";
import type { GetUsers_request, GetUsers_response } from "./_models";

export const getUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<GetUsers_response>
) => {
  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  const result = await findAll<UserObjectExt>(User);

  if (!(result instanceof DatabaseError)) {
    const withoutPWD = result.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        permission: user.permission,
      };
    });
    return sucessResponse(res, withoutPWD);
  }
  return serverErrorResponse(res, result);
};
