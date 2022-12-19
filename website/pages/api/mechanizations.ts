import type { NextApiRequest, NextApiResponse } from "next";
import { Methods } from "src/models";
import { isAllowed, badRequestResponse } from "@utils";
import {
  getMechanization,
  postMechanization,
  putMechanization,
  removeMechanization,
} from "@abl";

const allowed: Methods = ["DELETE", "GET", "POST", "PUT"];

export default async function mechanizationApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (!isAllowed(allowed, method)) {
    badRequestResponse(res);
  }

  switch (method) {
    case "GET":
      return await getMechanization(req, res);
    case "POST":
      return await postMechanization(req, res);
    case "PUT":
      return await putMechanization(req, res);
    case "DELETE":
      return await removeMechanization(req, res);
    default:
      return badRequestResponse(res);
  }
}
