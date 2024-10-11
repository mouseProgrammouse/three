import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
  includeIgnoreFile(gitignorePath),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: true, // This includes the process global variable you specified
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: { prettier: prettierPlugin }, // Including Prettier as a plugin
    rules: {
      'prettier/prettier': 'error', // Setting Prettier rules to error
    },
  },
  pluginJs.configs.recommended,
];
