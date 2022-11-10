import { UserObject, DatabaseError } from "@utils";

type GetUsers_request = {};
type GetUsers_response =
  | {
      _id: string;
      name: string;
      password?: string;
      permission: "USER" | "ADMIN";
    }[]
  | DatabaseError;

type PostUsers_request = UserObject;
type PostUsers_response = boolean | DatabaseError;

type PutUsers_request = {
  id: string;
  name?: string;
  password?: string;
  permission?: "USER" | "ADMIN";
};
type PutUsers_response = boolean | DatabaseError;

type DeleteUsers_request = { id: string };
type DeleteUsers_response = boolean | DatabaseError;

export type {
  GetUsers_request,
  GetUsers_response,
  PostUsers_request,
  PostUsers_response,
  PutUsers_request,
  PutUsers_response,
  DeleteUsers_request,
  DeleteUsers_response,
};
