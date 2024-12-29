import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: '.build/edjsHTML.js',
      format: 'umd',
      name: 'edjsHTML',
    },
    {
      file: '.build/edjsHTML.node.js',
      name: 'edjsHTML',
      format: 'cjs',
    },
    {
      file: '.build/edjsHTML.browser.js',
      name: 'edjsHTML',
      format: 'iife',
    },
  ],
  plugins: [
    typescript(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts'],
    }),
    terser(),
  ],
};
