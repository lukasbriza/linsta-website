import demolition from "../assets/demolition.svg";
import transport from "../assets/transport.svg";
import excavation from "../assets/excavation.svg";
import steamroller from "../assets/steamroller.svg";
import { routes } from "./routes";

export const badgeConfig = [
  { icon: steamroller, text: "Výstavba komunikací", url: routes.services },
  {
    icon: excavation,
    text: "Výstavba vodovodů a kanalizací",
    url: routes.services,
  },
  { icon: demolition, text: "Zemní práce a demolice", url: routes.services },
  { icon: transport, text: "Nákladní autodoprava", url: routes.services },
];
