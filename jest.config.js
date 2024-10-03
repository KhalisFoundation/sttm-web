module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    "url": "http://localhost:8080/"
  },
  collectCoverage: true,
  // since we moved config to a deeper folder, we are specifying what <rootDir> should now point to.
  rootDir: './',
  coverageDirectory: '<rootDir>/jest/coverage',
  coverageReporters: ['html'],
  transform: {
    '^.+\\.js|jsx|ts|tsx$': '<rootDir>/jest/transform.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/cypress/*'],
  preset: 'ts-jest',
  setupFiles: [
    "<rootDir>/jest/setupTest.js"
  ]
};
