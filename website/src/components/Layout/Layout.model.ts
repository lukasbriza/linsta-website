import { Element } from "@lukasbriza/lbui-lib";

export type LayoutProps = {
  children: Element;
  menu: Element;
  menuClass?: string;
  layoutClass?: string;
  headerClass?: string;
  footerClass?: string;
  pageClass?: string;
  header?: Element;
  footer?: Element;
};
