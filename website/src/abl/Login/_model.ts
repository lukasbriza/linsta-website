import { DatabaseError, ReferenceObject } from "@utils";

type PostLogin_request = { name: string; password: string };
type PostLogin_response = {
  token: string;
};

export type { PostLogin_request, PostLogin_response };
