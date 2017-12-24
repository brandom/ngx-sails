import commonjs from 'rollup-plugin-commonjs';
import resolveAliases from 'rollup-plugin-resolve-aliases';
import rxPaths from 'rxjs/_esm5/path-mapping';
import { rollupGlobals } from './tools/package/rollup-globals.ts';

export default {
  input: 'dist/index.js',
  context: 'this',
  output: {
    name: 'ng.SailsClient',
    globals: rollupGlobals,
    file: 'dist/bundles/ngx-sails.umd.js',
    format: 'umd',
  },
  sourceMap: false,
  plugins: [
    commonjs(),
    resolveAliases({
      aliases: {
        'socket.io-client': 'node_modules/socket.io-client/dist/socket.io.js',
      },
    }),
  ],
  external: Object.keys(rollupGlobals),
  resolve: {
    alias: rxPaths(),
  },
};
