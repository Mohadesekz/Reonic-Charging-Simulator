module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@components/(.*)$": "src/components/$1",
  },
  roots: ["src"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "src"],
}
