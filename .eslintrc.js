module.exports = {
  root: true,
  env: { node: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json", "./tsconfig.eslint.json"] },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  overrides: [{ files: ["./*.js"], rules: { "@typescript-eslint/no-var-requires": "off" } }],
};
