import {
  DatabaseError,
  MechanizationObjectExt,
  MechanizationObject,
} from "@utils";

type GetMechanization_request = { id?: string };
type GetMechanization_response =
  | MechanizationObjectExt
  | MechanizationObjectExt[]
  | DatabaseError;

type PostMechanization_request = MechanizationObject;
type PostMechanization_response = boolean | DatabaseError;

type PutMechanization_request = {
  id: string;
  name?: string;
  label?: string;
  capacity?: string;
  price?: number;
  pictures?: string;
};
type PutMechanization_response = boolean | DatabaseError;

type DeleteMechanization_request = { id: string };
type DeleteMechanization_response = boolean | DatabaseError;

export type {
  GetMechanization_request,
  GetMechanization_response,
  PostMechanization_request,
  PostMechanization_response,
  PutMechanization_request,
  PutMechanization_response,
  DeleteMechanization_request,
  DeleteMechanization_response,
};
