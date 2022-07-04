import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
};

export default config;
