/* eslint-disable no-undef */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/__tests__/prisma-mock.ts'],
    rootDir: './',
};