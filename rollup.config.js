import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2'

export default {
  input: "src/app.ts",
  output: [
    {
      file: "build/edjsHTML.js",
      format: "umd",
      name: "edjsHTML",
    },
    {
      file: "build/edjsHTML.node.js",
      name: 'edjsHTML',
      format: "cjs",
    },
    {
      file: "build/edjsHTML.browser.js",
      name: "edjsHTML",
      format: "iife",
    } 
  ],
  plugins: [babel(), terser(), typescript()],
};
