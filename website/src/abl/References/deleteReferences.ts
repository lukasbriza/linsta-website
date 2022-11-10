import type { NextApiRequest, NextApiResponse } from "next";
import {
  connectDB,
  apiErrorResponse,
  remove,
  findById,
  Reference,
  DatabaseError,
  serverErrorResponse,
  sucessResponse,
  removeImg,
} from "@utils";
import type {
  DeleteReferences_request,
  DeleteReferences_response,
} from "./_models";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().required(),
});

export const deleteReferences = async (
  req: NextApiRequest,
  res: NextApiResponse<DeleteReferences_response>
) => {
  const query = req.query as DeleteReferences_request;
  const validation = schema.validate(query);

  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  //GET REFERENCE PICTURE IDS
  const referencePictures = await findById(Reference, query.id, "pictures");

  if (referencePictures instanceof DatabaseError) {
    return serverErrorResponse(res, referencePictures);
  }
  //REMOVE PICTURES
  let pictureError = undefined;
  const arr = referencePictures.pictures;

  await arr.forEach(async (id: string) => {
    const removeResult = await removeImg(id);
    if (removeResult instanceof DatabaseError) {
      pictureError = removeResult;
      return;
    }
  });

  if (pictureError) {
    return serverErrorResponse(res, pictureError);
  }

  //REMOVE REFERENCE
  const result: DeleteReferences_response = await remove(Reference, query.id);
  result instanceof DatabaseError
    ? serverErrorResponse(res, result)
    : sucessResponse(res, result);
  return result;
};
