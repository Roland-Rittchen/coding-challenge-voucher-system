const config = {
  // testEnvironment: 'jsdom',
  // testPathIgnorePatterns: ['<rootDir>/integration'],
  preset: 'jest-puppeteer',
  testPathIgnorePatterns: ['<rootDir>/util/__tests__'],
};

export default config;
