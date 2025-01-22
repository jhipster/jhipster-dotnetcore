const { pathsToModuleNameMapper } = require('ts-jest');

const {
  compilerOptions: { paths = {}, baseUrl = './' },
} = require('./tsconfig.json');

module.exports = {
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|dayjs/esm)'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  globals: {
    __VERSION__: 'test',
  },
  roots: ['<rootDir>', `<rootDir>/${baseUrl}`],
  modulePaths: [`<rootDir>/${baseUrl}`],
  setupFiles: ['jest-date-mock'],
  cacheDirectory: '<rootDir>/../../../tmp/jest-cache',
  coverageDirectory: '<rootDir>/../../../tmp/test-results/',
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: `<rootDir>/${baseUrl}/` }),
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: '<rootDir>/../../../tmp/test-results/', outputName: 'TESTS-results-jest.xml' }],
    ['jest-sonar', { outputDirectory: './../../../tmp/test-results/jest', outputName: 'TESTS-results-sonar.xml' }],
  ],
  testMatch: ['<rootDir>/src/app/**/@(*.)@(spec.ts)'],
  testEnvironmentOptions: {
    url: 'https://jhipster.tech',
  },
};
