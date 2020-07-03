module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	plugins: ["@typescript-eslint"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		"@typescript-eslint/ban-ts-comment": ["off"],
		"@typescript-eslint/naming-convention": ["warn"],
		"@typescript-eslint/no-explicit-any": ["off"],
		"array-bracket-spacing": ["warn", "never"],
		"block-spacing": ["warn", "always"],
		"brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
		"camelcase": ["warn"],
		"comma-dangle": ["warn", "always-multiline"],
		"comma-spacing": ["warn", { "before": false, "after": true }],
		curly: ["warn", "all"],
		"eol-last": ["warn", "always"],
		eqeqeq: ["warn", "always"],
		"func-call-spacing": ["warn", "never"],
		indent: ["warn", "tab"],
		"keyword-spacing": ["warn"],
		"linebreak-style": ["warn", "unix"],
		"max-len": ["warn", 100],
		"no-eval": ["warn"],
		"no-debugger": ["warn"],
		"no-trailing-spaces": ["warn"],
		"no-unused-vars": ["warn"],
		"object-curly-spacing": ["warn", "always"],
		"prefer-const": ["warn"],
		quotes: ["warn", "double"],
		semi: ["warn", "always"],
		"space-before-blocks": ["warn", "always"],
		"space-before-function-paren": ["warn", "never"],
	},
	overrides: [
		{
			files: [
				"**/.*", // Un-ignore dotfiles
				"**/__tests__/*.{j,t}s?(x)",
				"**/tests/unit/**/*.spec.{j,t}s?(x)",
			],
			env: {
				mocha: true,
			},
		},
	],
};
