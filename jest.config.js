const {pathsToModuleNameMapper} = require('ts-jest/utils')
const fs = require('fs')
const {parse} = require('comment-json')
const tsconfig = fs.readFileSync('tsconfig.json', 'utf8')
const {compilerOptions: {paths}} = parse(tsconfig, null, true)

module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.test.{js,jsx,ts,tsx}',
    '!app/*/RbGenerated*/*.{js,jsx,ts,tsx}',
    '!app/app.tsx',
    '!app/global-styles.ts',
    '!app/*/*/Loadable.{js,jsx,ts,tsx}',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: false,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$':
      '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
    ...pathsToModuleNameMapper(paths, {prefix: '<rootDir>/'}),
  },
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/test-bundler.ts',
    '@testing-library/jest-dom/extend-expect',
  ],
  testRegex: 'tests/.*\\.(test|spec)\\.(js|ts(x?))$',
  transform: {
    '^.+\\.(ts(x?))$': 'ts-jest',
  },
  snapshotSerializers: [],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
