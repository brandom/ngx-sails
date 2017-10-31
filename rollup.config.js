import commonjs from 'rollup-plugin-commonjs';
import resolveAliases from 'rollup-plugin-resolve-aliases';
import rxPaths from 'rxjs/_esm5/path-mapping';

export default {
  input: 'dist/index.js',
  output: {
    file: 'dist/bundles/ngx-sails.umd.js',
    format: 'umd'
  },
  sourceMap: false,
  name: 'ng.SailsClient',
  onwarn: (warning) => {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.error(warning.message);
  },
  plugins: [
    commonjs(),
    resolveAliases({
      aliases: {
        'socket.io-client': 'node_modules/socket.io-client/dist/socket.io.js',
      }
    })
  ],
  external: (id) => {
    return id.startsWith('@angular') || id.startsWith('rxjs');
  },
  resolve: {
    alias: rxPaths()
  },
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    'rxjs/Observable': 'Rx',
    'rxjs/Observer': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/observable/EmptyObservable': 'Rx.Observable',
    'rxjs/operators': 'Rx.Observable',
    'rxjs/operators/index': 'Rx.Observable',
  }
}
