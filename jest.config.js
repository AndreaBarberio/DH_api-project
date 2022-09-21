module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: false,
  clearMocks: true,
  setupFilesAfterEnv: [
    "./src/lib/prisma/client.mock.ts",
    "./src/lib/middleware/multer.mock.ts"
  ],
};