import type { NextApiRequest, NextApiResponse } from "next";
import {
  apiErrorResponse,
  getImg,
  DatabaseError,
  serverErrorResponse,
} from "@utils";
import Joi from "joi";
import { Get_response, Get_request } from "../../../src/abl/image/_models";

const schema = Joi.object({
  id: Joi.string()
    .ruleset.max(150)
    .rule({ message: "Exceeded maximum number of characters." })
    .required()
    .messages({ "string.empty": "Id property is required." }),
});

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<Get_response>
) {
  const query = req.query as Get_request;
  const validation = schema.validate(query);

  if (req.method !== "GET") {
    return apiErrorResponse(res, "Unsupported method!");
  }

  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  await getImg(query.id, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
