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
    place: requiredStringValidation("Place", 50),
    realization: requiredStringValidation("Realization", 30),
    detail: requiredStringValidation("Detail", 500),
    file: ExtendedJoi.filelist()
      .ruleset.min(1)
      .rule({ message: "Form allow minimal one file." })
      .required()
      .messages({ "any.empty": "File is required." }),
  });
};

export const formValidationSchema = (t: TFunction) => {
  return joiResolver(schema(t));
};
