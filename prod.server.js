const express = require('express')
const axios = require('axios')
const app = express()
const apiRoutes = express.Router()
const config = require('./config/index')
app.use('/api', apiRoutes)

var port = process.env.PORT || config.build.port


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
// 获取排行榜详情
apiRoutes.get('/api/musicRankDetails', (req, res) => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  axios.get(url, {
    headers: {
      referrer: `https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=${req.query.topid}&type=top`,
      host: 'm.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(error => {
    console.log(error)
  })
})
// 歌手，歌名搜索
apiRoutes.get('/api/searchList', (req, res) => {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
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
// 歌手，歌名搜索推荐
apiRoutes.get('/api/searchHotKey', (req, res) => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
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

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
