import { Props } from "@lukasbriza/lbui-lib";
import { StaticImageData } from "next/image";

export type PictureHeaderProps = {
  src: StaticImageData;
  alt?: string;
  text: string;
  className?: string;
} & Props<HTMLElement>;
