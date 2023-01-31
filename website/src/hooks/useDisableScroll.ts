import { gsap } from "gsap";
import { useEffect, useState } from "react";

export const useDisableScroll = (): [boolean, (state: boolean) => void] => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (window) {
      const TopScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const LeftScroll =
        window.pageXOffset || document.documentElement.scrollLeft;
      const html = document.getElementsByTagName("html")[0];
      const body = document.getElementsByTagName("body")[0];

      if (disabled) {
        window.onscroll = function () {
          window.scrollTo(LeftScroll, TopScroll);
        };
        gsap.set([html, body], { overflowY: "hidden", position: "relative" });
      }
      if (!disabled) {
        window.onscroll = function () {};
        gsap.set([html, body], { overflowY: "initial", position: "initial" });
      }
    }
  }, [disabled]);

  const disable = (state: boolean) => setDisabled(state);

  return [disabled, disable];
};
