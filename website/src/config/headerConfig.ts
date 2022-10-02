import email from "@assets/email.svg";
import phone from "@assets/phone.svg";
import { routes } from "./routes";

export const headerConfig = {
  leftItems: [
    { src: phone, name: "+420 774 876 504", url: routes.contact },
    { src: email, name: "linstastavebniny@email.cz", url: routes.contact },
  ],
  rightItems: [{ name: "Přihlásit", url: routes.administration }],
};
