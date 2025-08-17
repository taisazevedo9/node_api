import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {},
  //   plugins: [react()],
  //   resolve: {
  //     alias: {
  //       "@": fileURLToPath(new URL("./src", import.meta.url)),
  //       "@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
  //       "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
  //       "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
  //       "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
  //     },
  //   },
  //   server: {
  //     port: 3000,
  //     host: "localhost",
  //     open: true,
  //     strictPort: true,
  //     hmr: {
  //       overlay: false,
  //     },
  //   },
  //   build: {
  //     outDir: "build",
  //     sourcemap: true,
  //     rollupOptions: {
  //       input: {
  //         main: fileURLToPath(new URL("./src/index.html", import.meta.url)),
  //         about: fileURLToPath(new URL("./src/about.html", import.meta.url)),
  //         contact: fileURLToPath(new URL("./src/contact.html", import.meta.url)),
  //       },
  //       output: {
  //         entryFileNames: "assets/[name].js",
  //         chunkFileNames: "assets/[name].js",
  //         assetFileNames: "assets/[name].[ext]",
  //       },
  //     },
  //   },
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: `@import "@/styles/variables.scss"; @import "@/styles/mixins.scss";`,
  //       },
  //     },
  //   },
  //   optimizeDeps: {
  //     include: [
  //       "react",
  //       "react-dom",
  //       "react-router-dom",
  //       "axios",
  //       "lodash",
  //       "dayjs",
  //     ],
  //   },
  //   define: {
  //     "process.env": {
  //       NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
  //       API_URL: JSON.stringify(process.env.API_URL || "http://localhost:3333"),
  //       VERSION: JSON.stringify(process.env.npm_package_version || "1.0.0"),
  //     },
  //   },
  //   test: {
  //     globals: true,
  //     environment: "jsdom",
  //     setupFiles: ["./src/setupTests.ts"],
  //     coverage: {
  //       provider: "istanbul",
  //       reporter: ["text", "json", "html"],
  //       include: ["src/**/*.{ts,tsx}"],
  //       exclude: [
  //         "src/**/*.test.{ts,tsx}",
  //         "src/**/*.stories.{ts,tsx}",
  //         "src/setupTests.ts",
  //         "src/index.tsx",
  //         "src/reportWebVitals.ts",
  //         "src/serviceWorker.ts",
  //         "src/assets/**/*",
  //         "src/styles/**/*",
  //         "src/types/**/*",
  //         "src/utils/**/*",
  //         "src/hooks/**/*",
  //         "src/components/**/*",
  //         "src/features/**/*",
  //         "src/entities/**/*",
  //       ],
  //     },
  //     transform: {
  //       "^.+\\.(ts|tsx)$": "ts-jest",
  //       "^.+\\.(js|jsx)$": "babel-jest",
  //     },
  //     globals: {
  //       "ts-jest": {
  //         tsconfig: "./tsconfig.json",
  //         isolatedModules: true,
  //         useESM: true,
  //       },
  //       "babel-jest": {
  //         presets: ["@babel/preset-env", "@babel/preset-react"],
  //         plugins: [
  //           "@babel/plugin-transform-runtime",
  //           "@babel/plugin-proposal-class-properties",
  //           "@babel/plugin-proposal-object-rest-spread",
  //           "@babel/plugin-syntax-dynamic-import",
  //           "@babel/plugin-transform-modules-commonjs",
  //         ],
  //       },
  //     },
  //     coverageThreshold: {
  //       global: {
  //         branches: 80,
  //         functions: 80,
  //         lines: 80,
  //         statements: 80,
  //       },
  //       "./src/features/**": {
  //         branches: 85,
  //         functions: 85,
  //         lines: 85,
  //         statements: 85,
  //       },
  //       "./src/entities/**": {
  //         branches: 90,
  //         functions: 90,
  //         lines: 90,
  //         statements: 90,
  //       },
  //       "./src/shared/**": {
  //         branches: 75,
  //         functions: 75,
  //         lines: 75,
  //         statements: 75,
  //       },
  //     },
  //   },
});
// import react from "@vitejs/plugin-react";
// import { fileURLToPath, URL } from "node:url";
// // import fastify from "fastify";
// // import fastifyCors from "@fastify/cors";
// // import fastifySwagger from "@fastify/swagger";
// // import fastifySwaggerUi from "@fastify/swagger-ui";
// // import { jsonSchemaTransform, validatorCompiler } from "fastify-type-provider-zod";
// import { serializerCompiler } from "fastify-type-provider-zod";
// import { routes } from "./routes.js";
// import { ZodTypeProvider } from "fastify-type-provider-zod";
// import { fastify } from "fastify";
// import fastifyCors from "@fastify/cors";
// import fastifySwagger from "@fastify/swagger";
// import fastifySwaggerUi from "@fastify/swagger-ui";
// import {
//   jsonSchemaTransform,
//   validatorCompiler,
// } from "fastify-type-provider-zod";
// import { DatabasePostgres } from "./database/database-postgres.js";
// import { DatabaseMemory } from "./database/database-memory.js";
