import { DatabaseError, ReferenceObject } from "@utils";

type DeleteReferences_response = boolean | DatabaseError;
type DeleteReferences_request = { id: string };

type GetReferences_response =
  | ReferenceObject
  | ReferenceObject[]
  | DatabaseError;
type GetReferences_request = { id: string };

type PostReferences_response = boolean | DatabaseError;
type PostReferences_request = ReferenceObject;

type PutReferences_request = {
  id: string;
  name?: string;
  place?: string;
  realization?: string;
  detail?: string;
  pictures?: string[];
};
type PutReferences_response = boolean | DatabaseError;

export type {
  DeleteReferences_response,
  DeleteReferences_request,
  GetReferences_response,
  GetReferences_request,
  PostReferences_response,
  PostReferences_request,
  PutReferences_request,
  PutReferences_response,
};
