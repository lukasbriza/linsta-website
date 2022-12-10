import { gsap, Power2 } from "gsap";

export const initAnimation = (root: HTMLDivElement) => {
  const cross = root.children[0];
  const swiperWrapper = root.children[1];
  const imageWrapper = swiperWrapper.children[0];
  const pagination = swiperWrapper.children[1];
  const slot = swiperWrapper.children[2];

  gsap.set(root, { width: "0px", height: "0px" });
  gsap.set(cross, { opacity: 0 });
  gsap.set(imageWrapper, { width: "0px", height: "0px" });
  gsap.set(pagination, { opacity: 0 });
  gsap.set(slot, { opacity: 0 });

  const tl = gsap
    .timeline()
    .addLabel("start")
    .to(
      root,
      { width: "100%", height: "100%", duration: 0.4, ease: Power2.easeOut },
      "start"
    )
    .addLabel("showOthers")
    .to(cross, { opacity: 1, duration: 1, ease: Power2.easeOut }, "showOthers")
    .to(
      pagination,
      { opacity: 1, duration: 1, ease: Power2.easeOut },
      "showOthers"
    )
    .to(slot, { opacity: 1, duration: 1, ease: Power2.easeOut }, "showOthers")
    .to(
      imageWrapper,
      { width: "100%", height: "100%", delay: 0.2, ease: Power2.easeOut },
      "start"
    );

  tl.then(() => {
    root.removeAttribute("style");
    cross.removeAttribute("style");
    pagination.removeAttribute("style");
    slot.removeAttribute("style");
    imageWrapper.removeAttribute("style");
  });
};

export const removeAnimation = (root: HTMLDivElement) => {
  const cross = root.children[0];
  const swiperWrapper = root.children[1];
  const imageWrapper = swiperWrapper.children[0];
  const pagination = swiperWrapper.children[1];
  const slot = swiperWrapper.children[2];

  const tl = gsap
    .timeline()
    .addLabel("start")
    .to(cross, { opacity: 0, duration: 0.25, ease: Power2.easeOut }, "start")
    .to(
      pagination,
      { opacity: 0, duration: 0.25, ease: Power2.easeOut },
      "start"
    )
    .to(slot, { opacity: 0, duration: 0.25, ease: Power2.easeOut }, "start")
    .to(
      imageWrapper,
      { opacity: 0, duration: 0.25, ease: Power2.easeOut },
      "start"
    )
    .to(root, { opacity: 0, duration: 0.25, ease: Power2.easeOut }, "start");

  return tl;
};
