import { ImageProps } from "next/image";

export type SwiperWrapperProps = {
  src: Promise<string>[];
  description: string;
  onCancel: () => void;
};
export type ImageLoadingProps = {
  src: Promise<string | undefined>;
  alt: string;
};
