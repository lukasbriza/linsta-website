import type { NextApiRequest, NextApiResponse } from "next";
import { Methods } from "src/models";
import { isAllowed, badRequestResponse } from "@utils";
import { getUsers, postUsers, deleteUsers, putUsers } from "@abl";

const allowed: Methods = ["DELETE", "GET", "POST", "PUT"];

export default async function usersApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (!isAllowed(allowed, method)) {
    badRequestResponse(res);
  }

  switch (method) {
    case "GET": {
      return await getUsers(req, res);
    }
    case "POST": {
      return await postUsers(req, res);
    }
    case "PUT": {
      return await putUsers(req, res);
    }
    case "DELETE": {
      return await deleteUsers(req, res);
    }
    default:
      return badRequestResponse(res);
  }
}
