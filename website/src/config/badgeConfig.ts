import demolition from "@assets/demolition.svg";
import transport from "@assets/transport.svg";
import canalization from "@assets/canalization.svg";
import steamroller from "@assets/steamroller.svg";
import { routes } from "./routes";

export const badgeConfig = [
  { icon: steamroller, text: "badge1", url: routes.communications },
  {
    icon: canalization,
    text: "badge2",
    url: routes.sewersconstruction,
  },
  { icon: demolition, text: "badge3", url: routes.demolition },
  { icon: transport, text: "badge4", url: routes.transport },
];
