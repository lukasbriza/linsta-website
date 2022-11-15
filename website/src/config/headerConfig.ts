import email from "@assets/email.svg";
import phone from "@assets/phone.svg";
import { routes } from "./routes";

export const headerConfig = {
  leftItems: [
    { src: phone, name: "phone", url: routes.contact },
    { src: email, name: "email", url: routes.contact },
  ],
  rightItems: [{ name: "login", url: routes.login }],
};
