module.exports = {
  transform: { ".(js|jsx|ts|tsx)": "@sucrase/jest-plugin" },
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  coverageDirectory: "./coverage",
};
