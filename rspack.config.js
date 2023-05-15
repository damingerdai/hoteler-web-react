const html = require('@rspack/plugin-html').default;

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  entry: {
    main: './src/index.tsx'
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [
          {
            loader: 'sass-loader'
          }
        ],
        type: 'css'
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  builtins: {
    emotion: true,
    react: {
      importSource: '@emotion/react'
    },
    html: [
      {
        template: './public/index.html' // 对齐 CRA 生成index.html
      }
    ],
    copy: {
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    }
  }
  // plugins: [
  //   new html({
  //     template: "./public/index.html",
  //     templateParameters: false,
  //   }),
  // ],
};
