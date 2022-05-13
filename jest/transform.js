const { alias } = require('../webpack.config').resolve;
const { presets, plugins } = require('../.babelrc');

module.exports = require('babel-jest').createTransformer({
  // we don't need any config for `@babel/preset-env`
  presets: presets.map((p) =>
    Array.isArray(p) && p[0] === '@babel/preset-env'
      ? [
          p[0],
          {
            targets: {
              browsers: ['chrome 70'],
            },
          },
        ]
      : p
  ),
  plugins: [
    ...plugins,
    [
      'module-resolver',
      {
        root: ['./src'],
        alias,
      },
    ],
  ],
});
