import main from "@assets/main.svg";
import services from "@assets/services.svg";
import references from "@assets/references.svg";
import mechanization from "@assets/mechanization.svg";
import contact from "@assets/contact.svg";
import { routes } from "./routes";

export const menuConfig = {
  items: [
    { src: main, url: routes.home, name: "item1" },
    { src: services, url: routes.services, name: "item2" },
    { src: references, url: routes.references, name: "item3" },
    { src: mechanization, url: routes.mechanization, name: "item4" },
    { src: contact, url: routes.contact, name: "item5" },
  ],
};
