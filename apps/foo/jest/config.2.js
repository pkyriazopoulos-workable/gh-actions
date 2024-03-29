const isCi = process.env.CI_ENABLED === "true";

const config = {
  rootDir: "../",
  testMatch: ["<rootDir>/src/**/*.2.test.+(js|jsx)"],
  transform: {
    "\\.jsx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/jest/"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage/2",
  coverageReporters: ["text-summary", "lcov", "json"],
  transformIgnorePatterns: ["node_modules"],
  coveragePathIgnorePatterns: ["<rootDir>/dist/"],
};

module.exports = config;
