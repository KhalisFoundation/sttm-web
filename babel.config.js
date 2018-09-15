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
        browsers: ['last 1 chrome version', 'last 1 firefox version'],
      },
      modules: false,
    },
  ],
  '@babel/typescript',
  '@babel/preset-react',
];

const env = {
  production: {
    presets: presets.map(
      preset =>
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
  test: {
    presets,
    plugins: [
      ...plugins,
      // We need this to let jest resolve our webpack aliases
      [
        'module-resolver',
        {
          alias,
        },
      ],
    ],
  },
  development: {
    presets,
    plugins,
  },
};

module.exports = env[process.env.NODE_ENV] || env.development;
