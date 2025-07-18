module.exports = {
  testEnvironmentOptions: {
    url: 'http://localhost:8080',
    environment: 'jest-environment-jsdom-sixteen',
  },
  verbose: true,
  setupFiles: ['<rootDir>/jest/setupTest.js'],
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
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest/setupTest.js'],
};
