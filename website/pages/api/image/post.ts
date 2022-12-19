import type { NextApiRequest, NextApiResponse } from "next";
import { GridFsStorage } from "multer-gridfs-storage";
import nextConnect from "next-connect";
import multer from "multer";
import { sucessResponse, apiErrorResponse, ApiError } from "@utils";
import { Post_response } from "../../../src/abl/image/_models";
import Joi from "joi";

const schema = Joi.object({
  type: Joi.string(),
});

const post = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse<Post_response>) {
    return apiErrorResponse(res, error.message);
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse<Post_response>) {
    return apiErrorResponse(res, "No route match!");
  },
});
const storage = new GridFsStorage({
  url: process.env.MONGO_URI!,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (request, file) => {
    const validation = schema.validate(request.body.type);
    if (validation.error) {
      throw new Error(validation.error.message);
    }

    return {
      bucketName: "binaries",
      filename: `${Date.now()}-${file.originalname}`,
      test: "test",
    };
  },
});
const upload = multer({ storage: storage });

post.use(upload.single("file"));
post.post((req: any, res: NextApiResponse<Post_response>) => {
  const responseObject: Post_response = { id: req.file.id };
  return sucessResponse(res, responseObject);
});

export default post;

export const config = {
  api: {
    bodyParser: false,
  },
};
