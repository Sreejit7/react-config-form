const postcss = require('rollup-plugin-postcss');
const autoprexifer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprexifer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        extract: !!options.writeMeta,
      })
    );
    return config;
  },
};
