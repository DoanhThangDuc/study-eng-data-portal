module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: "(/test/.*\\.spec)\\.(tsx?)$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};
