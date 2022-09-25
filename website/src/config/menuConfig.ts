import main from "../assets/main.svg";
import services from "../assets/services.svg";
import references from "../assets/references.svg";
import mechanization from "../assets/references.svg";
import contact from "../assets/contact.svg";
import { routes } from "./routes";

export const menuConfig = {
  items: [
    { src: main, url: routes.home, name: "Hlavní stránka" },
    { src: services, url: routes.services, name: "Služby" },
    { src: references, url: routes.references, name: "Reference" },
    { src: mechanization, url: routes.mechanization, name: "Mechanizace" },
    { src: contact, url: routes.contact, name: "Kontakt" },
  ],
};
