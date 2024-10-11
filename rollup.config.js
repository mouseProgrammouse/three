import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import fs from 'fs';
import path from 'path';

const inputDir = '.'; // Root project directory
const outputDir = 'dist';

const args = process.argv;
let pageArg = args.find((arg) => arg.startsWith('page:'));
if (pageArg) {
  pageArg = pageArg.split(':')[1];
}

// get all subdirectories (00, 01, etc.)
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && /^\d+$/.test(dirent.name)) // Only include directories with numeric names
    .map((dirent) => dirent.name);

// Get all directories in the root (00, 01, etc.)
const pages = getDirectories(inputDir);

// Create a Rollup config for each page
const rollupConfigs = (pageArg ? [pageArg] : pages).map((page) => {
  return {
    input: path.join(inputDir, page, 'main.js'),
    output: {
      file: path.join(page, outputDir, 'bundle.js'),
      format: 'iife', // Immediately Invoked Function Expression
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
      serve({
        open: page === pages[pages.length - 1],
        contentBase: inputDir,
        port: 8080,
      }),
      livereload({
        watch: pages.map((_page) => path.join(_page, outputDir)), // Watch all dist directories
      }),
    ],
  };
});

console.log('Rollup config generated successfully!');
export default rollupConfigs;
