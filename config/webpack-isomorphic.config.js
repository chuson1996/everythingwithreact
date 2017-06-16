var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
module.exports = {
  assets: {
    style_modules: {
      extensions: ['css'],
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        } else {
          // in production mode there's Extract Text Loader which extracts CSS text away
          return module.source;
        }
      }
    }
  }
};
