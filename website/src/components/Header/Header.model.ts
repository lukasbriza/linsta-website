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

export type LeftItemProps = {
  name: string;
  url: Routes;
  src: string;
};

export type RightItemProps = {};
