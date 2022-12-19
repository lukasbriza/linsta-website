import { StaticImageData } from "next/image";

export type StatutarCardProps = {
  src?: string | StaticImageData;
  alt?: string;
  header: string;
  phone: string;
  mail: string;
};
