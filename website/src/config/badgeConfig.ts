import demolition from "@assets/demolition.svg";
import transport from "@assets/transport.svg";
import canalization from "@assets/canalization.svg";
import steamroller from "@assets/steamroller.svg";
import { routes } from "./routes";

export const badgeConfig = [
  { icon: steamroller, text: "badge1", url: routes.services },
  {
    icon: canalization,
    text: "badge2",
    url: routes.services,
  },
  { icon: demolition, text: "badge3", url: routes.services },
  { icon: transport, text: "badge4", url: routes.services },
];
