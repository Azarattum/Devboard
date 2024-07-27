/** @type {import("eslint").Linter.Config} */
const config = {
  // Core
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:perfectionist/recommended-line-length-legacy",
  ],
  plugins: ["@typescript-eslint", "drizzle", "perfectionist"],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: true },
  // Rules
  rules: {
    // TypeScript
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        fixStyle: "inline-type-imports",
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/array-type": "off",
    // Drizzle
    "drizzle/enforce-delete-with-where": [
      "error",
      {
        drizzleObjectName: ["db", "ctx.db"],
      },
    ],
    "drizzle/enforce-update-with-where": [
      "error",
      {
        drizzleObjectName: ["db", "ctx.db"],
      },
    ],
    // Perfectionist
    "perfectionist/sort-object-types": [
      "error",
      {
        customGroups: { accessor: "+(get|set) *", method: "*(*):*" },
        groups: ["unknown", "method", "accessor"],
        type: "line-length",
        order: "desc",
      },
    ],
    "perfectionist/sort-imports": [
      "error",
      {
        groups: ["side-effect", "type", "unknown"],
        newlinesBetween: "never",
        type: "line-length",
        order: "desc",
      },
    ],
    "perfectionist/sort-union-types": [
      "error",
      {
        groups: ["unknown", "nullish"],
        type: "line-length",
        order: "desc",
      },
    ],
    "perfectionist/sort-objects": [
      "error",
      {
        partitionByComment: true,
        type: "line-length",
        order: "desc",
      },
    ],
    "perfectionist/sort-enums": "off",
  },
};

module.exports = config;
