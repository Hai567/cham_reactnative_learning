// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
	expoConfig,
	{
		ignores: ["dist/*"],
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		rules: {
			"@typescript-eslint/consistent-type-imports": "error",
			"react/self-closing-comp": "error",
			"no-console": "warn",
			eqeqeq: "error",
		},
	},
	{
		files: ["src/app/**", "src/components/**"],
		rules: {
			"no-restricted-imports": [
				"error",
				{
					patterns: [
						{
							group: ["**/test-factories", "**/*.test"],
							message: "Code app không được import code test.",
						},
					],
				},
			],
		},
	},
]);
