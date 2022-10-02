import img from "@assets/referencePicturetest.jpg";
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
