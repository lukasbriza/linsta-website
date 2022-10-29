import img from "@assets/referencePicturetest.jpg";
import mech from "@assets/mechanization/230SRLC.svg";
import { StaticImageData } from "next/image";
import { Routes } from "../src/models";

export const data: {
  src: StaticImageData;
  header: string;
  place: string;
  realization: string;
  url: Routes;
}[] = [
  {
    src: img,
    header: "Název stavby",
    place: "Nová Ves",
    realization: "2022",
    url: "/",
  },
  {
    src: img,
    header: "Název stavby",
    place: "Nová Ves",
    realization: "2022",
    url: "/",
  },
  {
    src: img,
    header: "Název stavby",
    place: "Nová Ves",
    realization: "2022",
    url: "/",
  },
  {
    src: img,
    header: "Název stavby",
    place: "Nová Ves",
    realization: "2022",
    url: "/",
  },
  {
    src: img,
    header: "Název stavby",
    place: "Nová Ves",
    realization: "2022",
    url: "/",
  },
  {
    src: img,
    header: "Název stavby",
    place: "Nová Ves",
    realization: "2022",
    url: "/",
  },
];

export const mechanizationData: {
  src: StaticImageData;
  name: string;
  indication: string;
  capacity: number;
  price: number;
}[] = [
  {
    src: mech,
    name: "Otočný pásový bagr Kolbeco",
    indication: "230 SR LC",
    capacity: 26,
    price: 500,
  },
];
