import { gsap, Power2, Power3 } from "gsap";
import React from "react";

const showtextAnimation = (el: SVGPathElement) => {
  return gsap.effects.show(el, { duration: 1.5 });
};
const strokeElement = (
  el: SVGPathElement,
  duration?: number,
  delay?: number
) => {
  const lenght = el.getTotalLength();
  return gsap.effects.stroke(el, {
    lenght: lenght + 2,
    duration: duration ? duration : undefined,
    delay: delay ? delay : undefined,
  });
};

const fillElement = (el: SVGPathElement) => {
  return gsap.to(el, {
    fill: "white",
    strokeOpacity: 0,
    duration: 0.5,
    ease: Power2.easeOut,
  });
};

const moveToInitialState = (
  svgRoot: SVGSVGElement,
  text: SVGPathElement,
  layer: HTMLDivElement
) => {
  const tl = gsap
    .timeline()
    .addLabel("initialStart")
    .to(
      svgRoot,
      {
        top: "51.115px",
        left: "15px",
        transform: "unset",
        height: "38px",
        delay: 0.5,
        duration: 1,
        ease: Power3.easeInOut,
      },
      "initialStart"
    )
    .set(svgRoot, { attr: { viewBox: "0 0 460 95" } })
    .addLabel("roundInInitial")
    .add(showtextAnimation(text), "roundInInitial")
    .add(gsap.effects.hide(layer), 1.5);
  return tl;
};

const resetAnimationState = (
  svgRoot: SVGSVGElement,
  upPath: SVGPathElement,
  downPath: SVGPathElement,
  round: SVGPathElement,
  layer: HTMLDivElement,
  svgContainer: HTMLDivElement,
  setAnimated: React.Dispatch<React.SetStateAction<boolean>>
) => {
  gsap.set(svgRoot, {
    width: "unset",
    left: "0px",
    top: "0px",
    transform: "unset",
    height: "38px",
    zIndex: "initial",
  });
  gsap.set(svgContainer, {
    width: "180px",
    paddingBottom: "38px",
    height: "unset",
    position: "absolute",
    transform: "translateY(-50%)",
    top: "50%",
    left: "unset",
    verticalAlign: "middle",
  });

  setTimeout(() => {
    setAnimated(true);
  }, 200);
  setTimeout(() => {
    svgContainer.removeAttribute("style");
    svgRoot.removeAttribute("style");
    upPath.removeAttribute("style");
    downPath.removeAttribute("style");
    round.removeAttribute("style");
    layer.removeAttribute("style");
  }, 250);
};

export const initialAnimation = (
  round: SVGPathElement,
  downPath: SVGPathElement,
  upPath: SVGPathElement,
  svgRoot: SVGSVGElement,
  svgContainer: HTMLDivElement,
  text: SVGPathElement,
  layer: HTMLDivElement,
  setAnimated: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const tl = gsap.timeline();
  tl.set(svgRoot, { attr: { viewBox: "0 0 94.5 94.5" } })
    .set(upPath, { fill: "transparent" })
    .set(downPath, { fill: "transparent" })
    .addLabel("start")
    .add(gsap.effects.show(round), "start")
    .addLabel("paths")
    //SET DEFAULT PATH STATE
    .set(upPath, { opacity: 1 })
    .set(downPath, { opacity: 1 })
    //ANIMATE PATHS
    .add(strokeElement(upPath, 3.5), "paths")
    .add(strokeElement(downPath, 2, 1), 1)
    //ANIMATE FILL + PUSH TO INITIAL POSITION
    .addLabel("fillAndShrink")
    .add(fillElement(upPath), "fillAndShrink")
    .add(fillElement(downPath), "fillAndShrink")
    .add(moveToInitialState(svgRoot, text, layer), 3.75)
    .addLabel("clear")
    //CLEAR PROPERTIES
    .call(() =>
      resetAnimationState(
        svgRoot,
        upPath,
        downPath,
        round,
        layer,
        svgContainer,
        setAnimated
      )
    );
};
