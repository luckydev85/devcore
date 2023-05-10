// https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
const { argv } = require("yargs");
const path = require("path");
// const webpack = require("webpack");

const appUrls = {
  // dev: "http://homestead.test",
  // local: "http://homestead.test",
  // proxy: "https://stage.devcore.app",
  // staging: "https://stage.devcore.app",
  // prod: "https://devcore.app"
  dev: "http://localhost",
  local: "http://localhost",
  proxy: "https://stage.devcore.app",
  staging: "https://stage.devcore.app",
  prod: "https://localhost"
};

module.exports = {
  publicPath: process.env.VUE_APP_SUBFOLDER || "/",
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    proxy: "https://127.0.0.1",
    headers: { "Access-Control-Allow-Origin": "*" },
    watchOptions: {
      clientLogLevel: "warning"
    }
  },

  outputDir: "../devcore_server_lavarel/public/frontend",
  productionSourceMap: false,
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    },
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV !== "production" ? "eval" : "",

    // plugins: [
    //   new webpack.DefinePlugin({
    //     "process.env": {
    //       ...process.env,
    //       VUE_APP_VERSION: `"${require("./package.json").version}"`
    //     }
    //   })
    // ]
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_fonts.scss";
          @import "@/scss/_medias.scss";
          @import "@/scss/_mixins.scss";
        `
      }
    }
  },

  chainWebpack: config => {
    console.log('_________________')
    console.log(`Building app with environment: ${process.env.BASE}`)
    console.log('_________________')
    config.resolve.alias.set("@", path.join(__dirname, "./src"));

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();

    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .options({
        svgo: {
          plugins: [{ removeDimensions: true }, { removeViewBox: false }]
        }
      })
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]"
      });

    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.transformAssetUrls = {
          img: "src",
          image: "xlink:href",
          "b-avatar": "src",
          "b-img": "src",
          "b-img-lazy": ["src", "blank-src"],
          "b-card": "img-src",
          "b-card-img": "src",
          "b-embed": "src"
        };
        return options;
      });

    if (process.env.NODE_ENV !== "production") {
      config.plugin("define").tap(options => {
        if (argv.mode === "proxy") {
          options[0]["process.env"].BASE_URL = `'${appUrls.proxy}'`;
          return options;
        }
        if (argv.mode === "dev") {
          options[0]["process.env"].BASE_URL = `'${appUrls.dev}'`;
          return options;
        }
        if (argv.mode === "staging") {
          options[0]["process.env"].BASE_URL = `'${appUrls.staging}'`;
          return options;
        }
      });

    } else {
      // mutate for production...
      // config.optimization.minimizer("terser").tap(args => {
      //   const { terserOptions } = args[0];
      //   terserOptions.compress["drop_console"] = false;
      //   terserOptions.compress["dead_code"] = true;
      //   terserOptions["ecma"] = 6;

      //   return args;
      // });
      config.plugin("define").tap(options => {
        if (argv.mode === "local") {
          options[0]["process.env"].BASE_URL = `'${appUrls.local}'`;
          return options;
        }
        if (argv.mode === "staging") {
          options[0]["process.env"].BASE_URL = `'${appUrls.staging}'`;
          return options;
        }

        options[0]["process.env"].BASE_URL = `'${appUrls.prod}'`;
        return options;
      });
    }
  }
};
