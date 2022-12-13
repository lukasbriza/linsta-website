import { RefObject, useEffect, useState } from "react";

export const useElementOnScreen = (
  ref: RefObject<Element>,
  rootMargin = "0px"
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const { current } = ref;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin: rootMargin }
    );

    current && observer.observe(current);

    return () => {
      current && observer.unobserve(current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIntersecting;
};
