module.exports = {
  testURL: 'http://localhost:8080',
  collectCoverage: true,
  // since we moved config to a deeper folder, we are specifying what <rootDir> should now point to.
  rootDir: '../',
  coverageDirectory: '<rootDir>/jest/coverage',
  coverageReporters: ['html'],
  transform: {
    '^.+\\.js|jsx|ts|tsx$': '<rootDir>/jest/transform.js',
  },
  testPathIgnorePatterns: ['<rootDir>/cypress'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
