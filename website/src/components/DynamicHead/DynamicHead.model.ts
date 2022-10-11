import { Element } from "@lukasbriza/lbui-lib";

export type HeadProps = {
  children?: Element;
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: "article" | "website";
  ogImageUrl?: string;
};
