import { gsap, Power3, Power2 } from "gsap";

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

type showConfig = { duration: number; display: string };
gsap.registerEffect({
  name: "show",
  effect: (target: HTMLElement, config: showConfig) => {
    const tl = gsap.timeline();
    tl.to(target, { duration: 0.001, display: config.display, opacity: 0 }).to(
      target,
      {
        duration: config.duration,
        display: config.display,
        opacity: 1,
        ease: Power2.easeOut,
      }
    );
    return tl;
  },
  defaults: {
    duration: 1,
    display: "initial",
  },
});

type hideConfig = { duration: number };
gsap.registerEffect({
  name: "hide",
  effect: (target: HTMLElement, config: hideConfig) => {
    const tl = gsap.timeline();
    tl.to(target, {
      opacity: 0,
      duration: config.duration,
      ease: Power2.easeOut,
    }).to(target, { display: "none" });
    return tl;
  },
  defaults: { duration: 1 },
});

type strokeConfig = { duration: number; lenght: number; delay: number };
gsap.registerEffect({
  name: "stroke",
  effect: (target: HTMLElement, config: strokeConfig) => {
    return gsap.fromTo(
      target,
      {
        strokeDasharray: config.lenght,
        strokeDashoffset: config.lenght,
      },
      {
        strokeDasharray: config.lenght,
        strokeDashoffset: 0,
        duration: config.duration,
        delay: config.delay,
        ease: Power2.easeOut,
      }
    );
  },
  defaults: { duration: 3, lenght: 100, delay: 0 },
});
