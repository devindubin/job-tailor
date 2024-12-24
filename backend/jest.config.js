import { transform } from "@babel/core";

export default {
  rootDir: "./",
  testEnvironment: "node",
  testMatch: ["<rootDir>/backend/**/*.test.js"],
  moduleFileExtensions: ["js", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/backend/coverage",
  coverageReporters: ["text", "lcov"],
  transform: {},
};
