module.exports = {
    parserOptions: {
        parser: "@typescript-eslint/parser",
        // project: "tsconfig.json",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    root: true,
    env: {
        node: true,
        es6: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js","README.md"],
	overrides: [
        {
            files: ["*.model.ts", "*.resolver.ts"],
            rules: {
                "no-undef": "off",
				"@typescript-eslint/no-unused-vars": "off"
            },
        },
    ],
    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",

        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                singleQuote: false,
            },
        ],
    },
};
