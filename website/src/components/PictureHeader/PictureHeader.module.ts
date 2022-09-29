import { StaticImageData } from "next/image";

export type PictureHeaderProps = {
  src: StaticImageData;
  alt?: string;
  text: string;
};
