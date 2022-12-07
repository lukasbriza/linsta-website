import { gsap, Power3 } from "gsap";

gsap.registerEffect({
  name: "showFromTop",
  effect: (target: HTMLElement) => {
    return gsap.fromTo(
      target,
      { bottom: "100vh", opacity: 0 },
      {
        top: "10px",
        bottom: "unset",
        opacity: 1,
        duration: 0.8,
        ease: Power3.easeOut,
      }
    );
  },
});

gsap.registerEffect({
  name: "hideToTop",
  effect: (target: HTMLElement, height: number, cb: () => void) => {
    console.log("here");
    return gsap.fromTo(
      target,
      {
        top: "10px",
        bottom: "unset",
        opacity: 1,
      },
      {
        bottom: "100vh",
        top: `-${height}px`,
        opacity: 0,
        duration: 0.8,
        ease: Power3.easeOut,
        onComplete: cb,
      }
    );
  },
});
