import type { NextApiRequest, NextApiResponse } from "next";
import { sucessResponse } from "@utils";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { loginResponseDecoded } from "./_model";

const decodedSchema = Joi.object({
  _id: Joi.string().required(),
  permission: Joi.string().required(),
  iat: Joi.number().required(),
  exp: Joi.number().required(),
});

export const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) => {
  const cookies = req.cookies;

  if (!cookies.Authorization) {
    return sucessResponse(res, false);
  }

  jwt.verify(
    cookies.Authorization,
    process.env.JWT_PRIVATE_KEY!,
    (err, payload) => {
      if (err) {
        return sucessResponse(res, false);
      }

      const decoded = payload as loginResponseDecoded;
      const validation = decodedSchema.validate(decoded);

      if (validation.error) {
        return sucessResponse(res, false);
      }
      const expiredBool = decoded.exp < (new Date().getTime() + 1) / 1000;
      const expired = expiredBool
        ? sucessResponse(res, false)
        : sucessResponse(res, true);

      return expired;
    }
  );
};
