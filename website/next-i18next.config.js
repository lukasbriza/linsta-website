module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "cs",
    locales: ["cs", "en"],
  },
  // localePath,
  // serializeConfig: false,
};
