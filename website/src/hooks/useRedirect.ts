import { routes } from "../config/routes";
import { useRouter } from "next/router";
import { RouteTypes, Routes } from "../models";

export const useRedirect = () => {
  const router = useRouter();
  const redirect = ({ route, path }: { route?: RouteTypes; path?: Routes }) => {
    try {
      if (route && path) {
        throw new Error(
          "useRedirect: for optional work define only one parameter"
        );
      }
    } catch (e) {
      console.error(e);
    }
    try {
      if (!route && !path) {
        throw new Error("useRedirect: for optional work define one parameter");
      }
    } catch (e) {
      console.error(e);
    }

    path && router.push(path);
    route && router.push(routes[route]);
  };
  return redirect;
};
