import { gsap } from "gsap";
import { useEffect, useState } from "react";

export const useDisableScroll = (): [boolean, (state: boolean) => void] => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    if (disabled) {
      gsap.set(html, { overflowY: "hidden" });
    }
    if (!disabled) {
      gsap.set(html, { overflowY: "initial" });
    }
  }, [disabled]);

  const disable = (state: boolean) => setDisabled(state);

  return [disabled, disable];
};
