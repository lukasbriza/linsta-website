const path = require("path");
const { i18n } = require("./next-i18next.config");
/** @type {import('next').NextConfig} */
module.exports = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  output: "standalone",
};
