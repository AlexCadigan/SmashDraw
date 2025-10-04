import ts from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default [
    // TypeScript support for all TS/TSX files
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: new URL(".", import.meta.url).pathname,
            },
        },
        plugins: { ts, prettier },
    },
    // Frontend (Next.js web app)
    {
        files: ["apps/web/**/*.{ts,tsx}"],
        languageOptions: {
            globals: {
                window: "readonly",
                document: "readonly",
            },
        },
        ...next,
        ...nextCoreWebVitals,
        ...nextTypescript,
    },
    // Backend (Node.js API + scraper)
    {
        files: ["apps/api/**/*.ts", "apps/scraper/**/*.ts", "packages/**/*.ts"],
        languageOptions: {
            globals: {
                process: "readonly",
                module: "readonly",
            },
        },
    },
];
