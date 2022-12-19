import { routes } from "./config/routes";
import type { Model } from "mongoose";

export type RouteTypes = keyof typeof routes;
export type Routes = typeof routes[RouteTypes];

type Method =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "HEAD"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";
export type Methods = Method[];

export type ModelType = Model<any, {}, {}, {}, any>;
