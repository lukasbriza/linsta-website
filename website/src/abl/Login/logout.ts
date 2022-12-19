import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    serialize("Authorization", "", {
      maxAge: -1,
      path: "/",
    })
  );
  res.writeHead(302, { Location: "/api/login" });
  res.end();
};
