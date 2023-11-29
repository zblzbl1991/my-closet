const path = require('path')

/**
 * @description: 根据vant组件名，生成相应的映射地址
 * @param {*} componentName：组件名
 * @return {*} 组件映射地址
 */
const createVantPatterns = (componentName) => {
  const fileTypes = ['wxml', 'wxs', 'wxss'];
  return fileTypes.map((item) => {
    return {
      from: `src/components/vant-weapp/view/${componentName}/index.${item}`,
      to: `dist/components/vant-weapp/dist/${componentName}/index.${item}`,
    };
  });
};

const config = {
  projectName: 'my-closet',
  date: '2023-11-29',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  alias: {
    '@/vant': path.resolve(__dirname, '../src/components/vant-weapp/view')
  },
  copy: {
    patterns: [
      { from: 'src/components/vant-weapp/view/wxs', to: 'dist/components/vant-weapp/dist/wxs' },
      { from: 'src/components/vant-weapp/view/common/style', to: 'dist/components/vant-weapp/dist/common/style' },
      {
        from: 'src/components/vant-weapp/view/common/index.wxss',
        to: 'dist/components/vant-weapp/dist/common/index.wxss',
      },
      {
        from: 'src/components/vant-weapp/view/calendar/index.wxs',
        to: 'dist/components/vant-weapp/dist/calendar/index.wxs',
      },
      {
        from: 'src/components/vant-weapp/view/calendar/utils.wxs',
        to: 'dist/components/vant-weapp/dist/calendar/utils.wxs',
      },
      {
        from: 'src/components/vant-weapp/view/calendar/calendar.wxml',
        to: 'dist/components/vant-weapp/dist/calendar/calendar.wxml',
      },
      {
        from: 'src/components/vant-weapp/view/calendar/components/month/index.wxs',
        to: 'dist/components/vant-weapp/dist/calendar/components/month/index.wxs',
      },
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    webpackChain (chain) {
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader')
                }
              }
            }
          }
        }
      })
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/van-/],
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
