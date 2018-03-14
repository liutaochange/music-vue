'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const express = require('express')
const axios = require('axios')
const app = express()
const apiRoutes = express.Router()

app.use('/api', apiRoutes)
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(apiRoutes) {
      // 获取banner
      apiRoutes.get('/api/recomend', (req, res) => {
        const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
        axios.get(url, {
          headers: {
            referrer: 'https://m.y.qq.com/',
            host: 'm.y.qq.com'
          },
          params: req.query
        }).then(response => {
          res.json(response.data)
        }).catch(error => {
          console.log(error)
        })
      })
      // 获取歌单
      apiRoutes.get('/api/playList', (req, res) => {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/portal/playlist.html'
          },
          params: req.query
        }).then(response => {
          res.json(response.data)
        }).catch(error => {
          console.log(error)
        })
      })
      // 获取歌手
      apiRoutes.get('/api/singerList', (req, res) => {
        const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/portal/singer_list.html'
          },
          params: req.query
        }).then(response => {
          res.json(response.data)
        }).catch(error => {
          console.log(error)
        })
      })
      // 获取歌手详情
      apiRoutes.get('/api/singerDetail', (req, res) => {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
        axios.get(url, {
          headers: {
            referer: `https://y.qq.com/n/yqq/singer/${req.query.singermid}.html`
          },
          params: req.query
        }).then(response => {
          res.json(response.data)
        }).catch(error => {
          console.log(error)
        })
      })
      // 获取歌词
      apiRoutes.get('/api/musicLyric', (req, res) => {
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/portal/player.html'
          },
          params: req.query
        }).then(response => {
          let ret = response.data;
          if (typeof (ret) === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var mathes = ret.match(reg)
            if (mathes) {
              ret = JSON.parse(mathes[1])
            }
          }
          res.json(ret)
        }).catch(error => {
          console.log(error)
        })
      })
      // 获取歌单详情
      apiRoutes.get('/api/musicDisc', (req, res) => {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        axios.get(url, {
          headers: {
            referer: `https://y.qq.com/n/yqq/playsquare/${req.query.disstid}.html`
          },
          params: req.query
        }).then(response => {
          let ret = response.data;
          if (typeof (ret) === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var mathes = ret.match(reg)
            if (mathes) {
              ret = JSON.parse(mathes[1])
            }
          }
          res.json(ret)
        }).catch(error => {
          console.log(error)
        })
      })
      // 获取排行榜
      apiRoutes.get('/api/musicRank', (req, res) => {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
        axios.get(url, {
          headers: {
            referrer: 'https://m.y.qq.com/',
            host: 'm.y.qq.com'
          },
          params: req.query
        }).then(response => {
          res.json(response.data)
        }).catch(error => {
          console.log(error)
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
