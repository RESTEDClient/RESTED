import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
  entry: 'src/js/index.js',
  dest: 'dist/rested.js',
  format: 'iife',
  sourceMap: 'inline',
  banner: '/* RESTED source code can be found at https://github.com/esphen/RESTED :) */',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'react'],
      exclude: 'node_modules/**',
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
    }),
    replace({
      /* Fix "process is not defined" */
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev'),
      /* Fix "module is not defined" */
      '= module': ';',
    }),
  ],
};

