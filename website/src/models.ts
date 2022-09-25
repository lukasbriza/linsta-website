import { routes } from "./config/routes";

export type RouteTypes = keyof typeof routes;
export type Routes = typeof routes[RouteTypes];
