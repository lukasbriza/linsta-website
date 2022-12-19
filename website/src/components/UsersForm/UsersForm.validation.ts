import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { TFunction } from "next-i18next";

const requiredStringValidation = (property: string, maxLength: number) => {
  return Joi.string()
    .ruleset.max(maxLength)
    .rule({ message: "Exceeded maximum number of characters." })
    .required()
    .messages({ "string.empty": `${property} property is required.` });
};

const schema = (t: TFunction) => {
  return Joi.object({
    name: requiredStringValidation("Name", 50),
    password: requiredStringValidation("Password", 100),
    permission: Joi.string()
      .required()
      .messages({ "string.empty": `Permission property is required.` }),
  });
};

export const formValidationSchema = (t: TFunction) => {
  return joiResolver(schema(t));
};
