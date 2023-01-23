import type { NextApiRequest, NextApiResponse } from "next";
import { Methods } from "src/models";
import { isAllowed, badRequestResponse } from "@utils";
import { sendMail } from "@abl";

const allowed: Methods = ["POST"];

export default async function emailApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (!isAllowed(allowed, method)) {
    return badRequestResponse(res);
  }

  switch (method) {
    case "POST":
      return await sendMail(req, res);
    default:
      return badRequestResponse(res);
  }
}
