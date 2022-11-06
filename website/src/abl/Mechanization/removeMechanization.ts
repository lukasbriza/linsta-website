import type { NextApiRequest, NextApiResponse } from "next";
import {
  apiErrorResponse,
  connectDB,
  serverErrorResponse,
  DatabaseError,
  Mechanization,
  findById,
  removeImg,
  remove,
  sucessResponse,
} from "@utils";
import type {
  DeleteMechanization_request,
  DeleteMechanization_response,
} from "./_models";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().required(),
});

export const removeMechanization = async (
  req: NextApiRequest,
  res: NextApiResponse<DeleteMechanization_response>
) => {
  const query = req.query as DeleteMechanization_request;
  const validation = schema.validate(query);

  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return serverErrorResponse(res, db.message);
  }

  //GET MECHANIZATION PICTURE IDS
  const referencePictures = await findById(Mechanization, query.id, "pictures");

  if (referencePictures instanceof DatabaseError) {
    return serverErrorResponse(res, referencePictures);
  }

  const pictureId = referencePictures.pictures;
  const removeResult = await removeImg(pictureId);

  if (removeResult instanceof DatabaseError) {
    return serverErrorResponse(res, removeResult);
  }

  //REMOVE MECHANIZATION
  const result: DeleteMechanization_response = await remove(
    Mechanization,
    query.id
  );
  result instanceof DatabaseError
    ? serverErrorResponse(res, result)
    : sucessResponse(res, result);
  return result;
};
