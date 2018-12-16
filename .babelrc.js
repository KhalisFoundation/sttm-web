const alias = require('./webpack.config').resolve.alias;

const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-class-properties',
];

const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        // Webpack breaks above chrome 43
        browsers: ['chrome 42'],
      },
      modules: false,
    },
  ],
  '@babel/typescript',
  '@babel/preset-react',
];

module.exports = {
  env: {
    production: {
      presets: presets.map(preset =>
        preset[0] !== '@babel/preset-env'
          ? preset
          : [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['ie 11', 'safari 9'],
                },
                modules: false,
              },
            ]
      ),
      plugins: plugins.concat([
        [
          'transform-react-remove-prop-types',
          {
            mode: 'remove',
            ignoreFilenames: ['node_modules'],
          },
        ],
      ]),
    },
  },
  presets,
  plugins,
};
