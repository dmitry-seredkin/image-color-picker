module.exports = {
  root: true,
  env: { node: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json", "./tsconfig.eslint.json"] },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "plugin:prettier/recommended",
  ],
  rules: {
    "import/no-default-export": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: ["builtin", "external", "internal", ["parent", "sibling"], "type"],
        pathGroups: [
          { pattern: "react", group: "builtin" },
          { pattern: "[a-zA-Z@]", group: "external" },
          { pattern: "{shared/**, features/**, widgest/**, pages/**}", group: "internal" },
          { pattern: "./*.module.css", group: "sibling", position: "after" },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
  },
  overrides: [{ files: ["./*.js"], rules: { "@typescript-eslint/no-var-requires": "off" } }],
  settings: { "import/resolver": { typescript: { project: "./tsconfig.json" } } },
};
