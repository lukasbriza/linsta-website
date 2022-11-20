import { ApiError, DatabaseError } from "@utils";

export type Post_request = { file: File };
export type Post_response = { id: string } | ApiError;

export type Remove_request = { id: string };
export type Remove_response = boolean | DatabaseError;

export type Get_request = { id: string };
export type Get_response = any;
