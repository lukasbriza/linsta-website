import { Schema, model, models } from "mongoose";
//TYPES
export type ReferenceObject = {
  name: string;
  place: string;
  realization: string;
  detail: string;
  pictures: string[];
};

export type ReferenceObjectExt = ReferenceObject & { _id: string };

export type MechanizationObject = {
  name: string;
  label: string;
  capacity: string;
  price: number;
  pictures: string;
  order: number;
  type: "C" | "SM" | "M";
};

export type MechanizationObjectExt = MechanizationObject & { _id: string };

export type UserObject = {
  name: string;
  password: string;
  permission: "USER" | "ADMIN";
};

export type UserObjectExt = UserObject & { _id: string };

//SCHEMAS
const mechanizationSchema = new Schema<MechanizationObject>({
  name: { type: String, required: true },
  label: { type: String, required: true },
  capacity: { type: String, required: true },
  price: { type: Number, required: true },
  pictures: { type: String, required: true },
  order: { type: Number, required: true },
  type: { type: String, required: true },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  permission: { type: String, default: "USER", required: true },
});

const referenceSchema = new Schema<ReferenceObject>({
  name: { type: String, required: true },
  place: { type: String, required: true },
  realization: { type: String, required: true },
  detail: { type: String, required: true },
  pictures: [{ type: String, required: true }],
});

//MODELS
export const Mechanization =
  models.Mechanization ||
  model<MechanizationObject>("Mechanization", mechanizationSchema);

export const User = models.User || model<UserObject>("User", userSchema);

export const Reference =
  models.Reference || model<ReferenceObject>("Reference", referenceSchema);
