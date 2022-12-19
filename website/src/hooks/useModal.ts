import { ModalContext } from "@components";
import { useContext, useMemo } from "react";
import { Modalcontext } from "src/components/Modal/Modal.model";

export const useModal = (): Modalcontext => {
  const { show, close } = useContext(ModalContext);

  return useMemo(() => {
    return { show, close };
  }, [show, close]);
};
