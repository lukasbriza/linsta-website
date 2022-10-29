import { Routes } from "../../models";

export type MenuProps = {
  items: {
    name: string;
    src: string;
    url: Routes;
  }[];
};
