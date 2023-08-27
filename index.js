require('dotenv').config()
const { buildServer, returnHTMLPage, returnJSON } = require('./utils/easyServer')
const { nowPlaying, popular, topRated, upcoming, search } = require('./api/innerAPI')

const myServer = buildServer()
const PORT = process.env.PORT || 3000
myServer.listen(PORT, () => {
    console.info('server started at http://localhost:3000')
})

myServer.getList(['', '/', '/index', '/index.html', '/home'], (req, res, params) => {
    returnHTMLPage('./public/index.html', res)
})



myServer.getAPI('/api/movies/now-playing', (req, res, params) => {
    nowPlaying(params.page ?? 1).then(data => {
        returnJSON(data, res)
    })
})

myServer.getAPI('/api/movies/popular', (req, res, params) => {
    popular(params.page ?? 1).then(data => {
        returnJSON(data, res)
    })
})

myServer.getAPI('/api/movies/top_rated', (req, res, params) => {
    topRated(params.page ?? 1).then(data => {
        returnJSON(data, res)
    })
})

myServer.getAPI('/api/movies/upcoming', (req, res, params) => {
    upcoming(params.page ?? 1).then(data => {
        returnJSON(data, res)
    })
})

myServer.get('/api/movies/movie', (req, res, params) => {
    search(params.page ?? 1, params.query).then(data => {
        returnJSON(data, res)
    })
})
