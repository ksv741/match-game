const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      'components': path.resolve(__dirname, 'src/components'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'context': path.resolve(__dirname, 'src/context'),
      'src': path.resolve(__dirname, 'src')
    },
  };
  return config;
};
