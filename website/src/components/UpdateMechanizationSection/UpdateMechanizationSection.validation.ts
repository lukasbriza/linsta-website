import { joiResolver } from "@hookform/resolvers/joi";
import { TFunction } from "next-i18next";
import Joi from "joi";

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
    label: requiredStringValidation("Label", 50),
    capacity: requiredStringValidation("Capacity", 50),
    price: Joi.number().required().messages({
      "any.required": `Price property is required.`,
      "number.base": "Order must be number.",
    }),
    order: Joi.number().required().messages({
      "any.required": `Order property is required.`,
      "number.base": "Order must be number.",
    }),
    type: requiredStringValidation("type", 2),
  });
};

export const formValidationSchema = (t: TFunction) => {
  return joiResolver(schema(t));
};
