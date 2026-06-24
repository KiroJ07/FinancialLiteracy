module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    '*.html'
  ],
  coverageDirectory: 'coverage'
};
