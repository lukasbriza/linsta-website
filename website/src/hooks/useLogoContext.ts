import { LogoContext } from "@components";
import { useContext } from "react";

export const useLogoContext = () => {
  const { animated, setAnimated } = useContext(LogoContext);
  return { animated, setAnimated };
};
