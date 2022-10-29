import { StaticImageData } from "next/image";

export type StatutarCardProps = {
  src?: string | StaticImageData;
  alt?: string;
  header: string;
  subtitle: string;
  phone: string;
  mail: string;
};
