import { joiResolver } from "@hookform/resolvers/joi";
import { TFunction } from "next-i18next";
import Joi from "joi";

const requiredStringValidtion = (t: TFunction) => {
  return Joi.string()
    .ruleset.max(40)
    .min(1)
    .rule({ message: t("pages.contact.form.validations.max40") })
    .ruleset.alphanum()
    .rule({ message: t("pages.contact.form.validations.specialCharacters") })
    .required()
    .messages({ "string.empty": t("pages.contact.form.validations.required") });
};

const requiredEmailValidation = (t: TFunction) => {
  return Joi.string()
    .ruleset.email({ tlds: false })
    .rule({ message: t("pages.contact.form.validations.invalidEmail") })
    .required()
    .messages({ "string.empty": t("pages.contact.form.validations.required") });
};
const requiredMessageValidation = (t: TFunction) => {
  return Joi.string()
    .ruleset.min(1)
    .max(500)
    .rule({ message: t("pages.contact.form.validations.max500") })
    .required()
    .messages({ "string.empty": t("pages.contact.form.validations.required") });
};

const optionalCompanyValidation = (t: TFunction) => {
  return Joi.string()
    .optional()
    .allow("")
    .ruleset.pattern(/[^$&;=?@#|'<>^*()%]/)
    .rule({ message: t("pages.contact.form.validations.specialCharacters") });
};

const requiredCheckboxValidation = (t: TFunction) => {
  return Joi.boolean()
    .invalid(false)
    .required()
    .messages({ "any.invalid": t("pages.contact.form.validations.required") });
};
const schema = (t: TFunction) => {
  return Joi.object({
    name: requiredStringValidtion(t),
    surname: requiredStringValidtion(t),
    email: requiredEmailValidation(t),
    company: optionalCompanyValidation(t),
    message: requiredMessageValidation(t),
    gdpr: requiredCheckboxValidation(t),
  });
};

export const formValidationSchema = (t: TFunction) => {
  return joiResolver(schema(t));
};
