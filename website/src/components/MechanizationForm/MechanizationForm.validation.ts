import { joiResolver } from "@hookform/resolvers/joi";
import { TFunction } from "next-i18next";
import { fileListExtension } from "joi-filelist";
import Joi from "joi";

const ExtendedJoi = fileListExtension(Joi);

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
    price: Joi.number()
      .required()
      .messages({ "any.required": `Price property is required.` }),
    order: Joi.number().required(),
    type: requiredStringValidation("type", 2),
    file: ExtendedJoi.filelist()
      .ruleset.min(1)
      .max(1)
      .rule({ message: "Form allow only one file." })
      .ruleset.maxSize(1024 * 1024 * 3)
      .rule({ message: "Maximum file size is 3MB." })
      .ruleset.mimeType(["image/svg+xml"])
      .rule({ message: "Accept only svg files." })
      .required()
      .messages({ "any.empty": "File is required." }),
  });
};

export const formValidationSchema = (t: TFunction) => {
  return joiResolver(schema(t));
};
