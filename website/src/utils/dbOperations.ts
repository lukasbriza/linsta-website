import {
  UpdateWithAggregationPipeline,
  UpdateQuery,
  QueryOptions,
  Callback,
  ProjectionType,
} from "mongoose";
import { NextApiResponse } from "next";
import mongoose from "mongoose";
import { ModelType } from "src/models";
import { DatabaseError, connectDB, serverErrorResponse } from "@utils";
import { Get_response } from "../../src/abl/image/_models";

export const findAll = async (model: ModelType) => {
  try {
    const result = await model.find<typeof model>();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return new DatabaseError(error);
    }
    throw error;
  }
};

export const findById = async (
  model: ModelType,
  id: string,
  projection?: ProjectionType<any>
) => {
  try {
    const result = await model.findById(id, projection);
    if (result === null) {
      throw new Error("Can´t find object.");
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return new DatabaseError(error);
    }
    throw error;
  }
};

export const remove = async (model: ModelType, id: string) => {
  try {
    const result = await model.deleteOne({ _id: id });
    return result.deletedCount !== 0;
  } catch (error) {
    if (error instanceof Error) {
      return new DatabaseError(error);
    }
    throw error;
  }
};

export const post = async (
  model: ModelType,
  value: unknown,
  ...args: unknown[]
) => {
  try {
    const result = new model(value, ...args);
    await result.save();
    return result ? true : false;
  } catch (error) {
    if (error instanceof Error) {
      return new DatabaseError(error);
    }
    throw error;
  }
};

export const put = async (
  model: ModelType,
  id: string,
  value: UpdateWithAggregationPipeline | UpdateQuery<ModelType>,
  queryOptions?: QueryOptions<ModelType>,
  cb?: Callback<any>
) => {
  try {
    const result = await model.updateOne({ _id: id }, value, queryOptions, cb);
    return result.modifiedCount !== 0;
  } catch (error) {
    if (error instanceof Error) {
      return new DatabaseError(error);
    }
    throw error;
  }
};

export const removeImg = async (id: string) => {
  const db = await connectDB();

  if (db instanceof DatabaseError) {
    return db;
  }

  const mongoId = new mongoose.mongo.ObjectId(id);

  const deleteFile = await db.connection
    .collection("binaries.files")
    .deleteMany({ _id: mongoId });

  if (deleteFile.deletedCount === 0) {
    return new DatabaseError(new Error(`Cannot find file with id ${id}.`));
  }

  const deleteChunks = await db.connection
    .collection("binaries.chunks")
    .deleteMany({ files_id: mongoId });

  if (deleteChunks.deletedCount === 0) {
    return new DatabaseError(
      new Error(`Cannot find chunks with file_id ${id}.`)
    );
  }

  return true;
};

export const getImg = async (
  id: string,
  res: NextApiResponse<Get_response>
) => {
  const myDb = await connectDB();
  const mongoId = new mongoose.mongo.ObjectId(id);

  if (myDb instanceof DatabaseError) {
    return myDb;
  }

  const { db } = mongoose.connection;

  const bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "binaries",
  });

  const downloadableStream = bucket.openDownloadStream(mongoId);

  downloadableStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadableStream.on("error", (error) => {
    return serverErrorResponse(res, error.message);
  });

  downloadableStream.on("end", () => {
    return res.status(200).end();
  });
};
