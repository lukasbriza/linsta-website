import { routes } from "../config/routes";
import { useRouter } from "next/router";
import { RouteTypes, Routes } from "../models";

export const useRedirect = () => {
  const router = useRouter();
  const redirect = ({
    route,
    path,
    callback,
  }: {
    route?: RouteTypes;
    path?: Routes;
    callback?: (value?: boolean) => void;
  }) => {
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

    path &&
      router.push(path).then((value) => {
        callback?.(value);
      });
    route &&
      router.push(routes[route]).then((value) => {
        callback?.(value);
      });
  };
  return redirect;
};
