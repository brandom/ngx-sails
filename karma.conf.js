const ENV = process.env.npm_lifecycle_event;
const WATCH = ENV === 'test:watch';

module.exports = function (config) {
  const CONFIGURATION = {
    frameworks: ['jasmine', 'karma-typescript'],
    files: [{
      pattern: 'tests/base.spec.ts'
    },
    {
      pattern: 'src/**/*.+(ts|html)'
    }
    ],
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },
    karmaTypescriptConfig: {
      exclude: ['dist', 'node_modules'],
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [
          require('karma-typescript-angular2-transform')
        ]
      },
      compilerOptions: {
        lib: ["es2015", "dom"]
      }
    },
    reporters: ['progress', 'karma-typescript', 'kjhtml'],
    browsers: ['Chrome'],
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: !WATCH,
    autoWatch: WATCH,
    client: {
      captureConsole: true,
      clearContext: false
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  };

  if (!WATCH) {
    CONFIGURATION.karmaTypescriptConfig.coverageOptions = {
      instrumentation: true,
      exclude: [
        /\.(d|spec|test|module|ngfactory)\.ts/,
        /\index.ts/,
      ]
    };
    CONFIGURATION.karmaTypescriptConfig.reports = {
      'text': '',
      'text-summary': '',
      'html': {
        'directory': 'coverage',
      },
      'lcovonly': {
        'directory': 'coverage',
        'subdirectory': 'lcov',
        'filename': 'lcov.info'
      }
    };
  }

  if (process.env.TRAVIS) {
    CONFIGURATION.browsers = ['Chrome_travis_ci'];
  }

  config.set(CONFIGURATION);
};
