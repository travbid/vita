// @ts-check
/* eslint @typescript-eslint/naming-convention: 0 */

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2022,
		},
		rules: {
			"@typescript-eslint/ban-ts-comment": ["off"],
			"@typescript-eslint/naming-convention": ["warn"],
			"@typescript-eslint/no-explicit-any": ["off"],
			"@typescript-eslint/no-unused-vars": ["warn"],
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
			"object-curly-spacing": ["warn", "always"],
			"prefer-const": ["warn"],
			quotes: ["warn", "double"],
			semi: ["warn", "always"],
			"space-before-blocks": ["warn", "always"],
			"space-before-function-paren": ["warn", "never"],
		},
	},
);
