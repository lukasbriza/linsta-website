const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "../src/components/index.ts"),
      "@assets": path.resolve(__dirname, "../public/assets"),
      "@hooks": path.resolve(__dirname, "../src/hooks/index.ts"),
      "@fetchers": path.resolve(__dirname, "../src/fetchers/"),
    };
    config.resolve.fallback = {
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
