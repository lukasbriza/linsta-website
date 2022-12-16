import { TransitionContext } from "@components";
import { useContext } from "react";

export const useTransitionContext = () => {
  const { transitioning, setTransitioning } = useContext(TransitionContext);
  return { transitioning, setTransitioning };
};
