export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  modulePathIgnorePatterns: ['__testUtils__'],
  transformIgnorePatterns: [],
  testEnvironment: 'node',
};
