import type { NextApiRequest, NextApiResponse } from "next";
import { apiErrorResponse, sucessResponse } from "@utils";
import jwt from "jsonwebtoken";
import Joi from "joi";

const schema = Joi.object({
  token: Joi.string().required(),
});

export const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) => {
  const { token } = req.query as { token: string };
  const validation = schema.validate(req.query);

  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY!, (err, payload: any) => {
    if ((err && err.message === "jwt expired") || err) {
      return sucessResponse(res, false);
    }
    return sucessResponse(res, true);
  });
};
