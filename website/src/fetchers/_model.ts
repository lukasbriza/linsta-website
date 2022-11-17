import { Post_request } from "src/abl/image/_models";
import { PostMechanization_request } from "src/abl/Mechanization/_models";
import { PostReferences_request } from "src/abl/References/_models";
import { PostUsers_request } from "src/abl/Users/_models";

export type loginResponseDecoded = {
  _id: string;
  permission: "ADMIN" | "USER";
  iat: number;
  exp: number;
};

export type loginProps = { token: string };
export type imagePostProps = Post_request;
export type saveMechanizationProps = PostMechanization_request;
export type saveReferenceProps = PostReferences_request;
export type saveUserProps = PostUsers_request;
