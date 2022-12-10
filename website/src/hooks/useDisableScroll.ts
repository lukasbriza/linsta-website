import { useState } from "react";
import { gsap } from "gsap";

let disabled = false;
export const useDisableScroll = (): [boolean, (state: boolean) => void] => {
  const disable = (state: boolean) => {
    const html = document.getElementsByTagName("html");
    if (state) {
      gsap.set(html, { overflowY: "hidden" });
      disabled = state;
    }
    if (!state) {
      gsap.set(html, { overflowY: "initial" });
      disabled = state;
    }
  };
  return [disabled, disable];
};
