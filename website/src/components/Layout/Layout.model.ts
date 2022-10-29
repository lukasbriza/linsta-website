import { Element } from "@lukasbriza/lbui-lib";

export type LayoutProps = {
  children: Element;
  menu: Element;
  menuClass?: string;
  layoutClass?: string;
  headerClass?: string;
  footerClass?: string;
  pageClass?: string;
  maxHeight?: boolean;
  header?: Element;
  footer?: Element;
};
