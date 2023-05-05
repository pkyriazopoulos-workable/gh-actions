const isCi = process.env.CI_ENABLED === "true";

const config = {
  rootDir: "../../",
  testMatch: ["<rootDir>/src/**/*.test.+(js|jsx)"],
  transform: {
    "\\.jsx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/jest/"],
  collectCoverage: isCi,
  coverageDirectory: "<rootDir>/coverage/",
  coverageReporters: ["text-summary", "lcov", "json"],
  transformIgnorePatterns: ["node_modules"],
  coveragePathIgnorePatterns: ["<rootDir>/dist/"],
};

module.exports = config;
