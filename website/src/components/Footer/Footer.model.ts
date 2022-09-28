import { Routes } from "../../models";
import { Element, Variants } from "@lukasbriza/lbui-lib";

export type FooterProps = {};
export type FooterTypographyProps = {
  children: Element;
  className?: string;
  noWrap?: boolean;
};
export type FooterheaderProps = {
  children: Element;
  className?: string;
  variant?: Variants[];
};
export type FooterPointProps = {
  children: Element;
  className?: string;
  pointClassName?: string;
};
export type ReferenceProps = {
  url: Routes;
  text: string;
};
