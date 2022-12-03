import { StaticImageData } from "next/image";

export type ServiceCardProps = {
  src: any;
  text: string;
  className?: string;
  onClick: () => void;
};
export type CardBodyProps = {
  text: string;
  onClick: () => void;
};
