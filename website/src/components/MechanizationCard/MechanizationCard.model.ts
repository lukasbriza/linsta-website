import { StaticImageData } from "next/image";

export type MechanizationCardProps = {
  name: string;
  src: string | StaticImageData;
  indication: string;
  capacity: number;
  price: number;
};
