import type { NextApiRequest, NextApiResponse } from "next";
import { Methods } from "src/models";
import { isAllowed, badRequestResponse } from "@utils";
import {
  deleteReferences,
  getReferences,
  postReferences,
  putReferences,
} from "@abl";

const allowed: Methods = ["DELETE", "GET", "POST", "PUT"];

export default async function referencesApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (!isAllowed(allowed, method)) {
    badRequestResponse(res);
  }

  switch (method) {
    case "GET":
      return await getReferences(req, res);
    case "POST":
      return await postReferences(req, res);
    case "PUT":
      return await putReferences(req, res);
    case "DELETE":
      return await deleteReferences(req, res);
    default:
      return badRequestResponse(res);
  }
}
