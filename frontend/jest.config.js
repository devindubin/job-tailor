export default {
  roots: ["<rootDir>/frontend"],
  testMatch: [
    "**/__tests__/**/*.+(js|jsx|ts|tsx)",
    "**/?(*.)+(spec|test).+(js|jsx|ts|tsx)",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};
