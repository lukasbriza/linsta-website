import { StaticImageData } from "next/image";
import { Routes } from "../../models";

export type ReferenceCardProps = {
  src: StaticImageData;
  header: string;
  place: string;
  realization: string;
  url: Routes;
};
