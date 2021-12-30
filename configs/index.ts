/**
 * DO NOT EXPORT build.ts from here, because it uses "path" import from Node.js
 * When bundling with Webpack 5, the path polyfill is no longer added. So, it
 * will throw error.
 */
export * from "./app";