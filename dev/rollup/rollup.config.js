import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
  entry: 'src/js/index.js',
  dest: 'dist/rested.js',
  format: 'iife',
  /* NOTE: Inline source maps are super slow in Firefox. */
  sourceMap: true,
  sourceMapFile: 'dist/rested.map.js',
  banner: '/* RESTED source code can be found at https://github.com/esphen/RESTED :) */',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        /* Fix 'cloneElement' is not exported by node_modules/react/react.js */
        'node_modules/react/react.js': [
          'Component',
          'PropTypes',
          'createElement',
          'cloneElement'
       ]
      }
    }),
    eslint({
      exclude: [
        'src/styles/**',
        'node_modules/**',
      ]
    }),
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'react'],
      plugins: [
        'transform-object-assign',
        'transform-es2015-destructuring',
        'transform-object-rest-spread'
      ],
      exclude: 'node_modules/**',
    }),
    replace({
      /* Fix "process is not defined" */
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    replace({
      /* Fix "module is not defined" */
      include: 'node_modules/symbol-observable/es/index.js',
      '= module': ';',
    }),
  ],
};

