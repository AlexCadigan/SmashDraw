import ts from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
    {
        ignores: ["**/.next/**", "next-env.d.ts"],
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser,
            parserOptions: {
                project: resolve(__dirname, "./tsconfig.json"),
                tsconfigRootDir: resolve(__dirname),
            },
        },
        plugins: { "@typescript-eslint": ts, prettier },
        rules: {
            ...ts.configs.recommended.rules,
            "prettier/prettier": "error",
        },
    },
];
