import { Routes } from "../../models";

export type HeaderProps = {
  leftItems: {
    name: string;
    src: string;
    url: Routes;
  }[];
  rightItems: {
    name: string;
    url: Routes;
  }[];
};
