require('dotenv').config()
const { buildServer, returnHTMLPage, returnJSON } = require('./utils/easyServer')
const { nowPlaying, popular, topRated, upcoming } = require('./api/innerAPI')

const myServer = buildServer()
const PORT = process.env.PORT || 3000
myServer.listen(PORT, () => {
    console.info('server started at http://localhost:3000')
})

myServer.getList(['', '/', '/index', '/index.html', '/home'], (req, res, params) => {
    returnHTMLPage('./public/index.html', res)
})

myServer.get('/movie', (req, res, params) => {
    // console.log(__dirname + '/public/movie.html')
    returnHTMLPage(__dirname + '/public/movie.html', res)
})

myServer.get('/api/movies/movie', (req, res, params) => {
    
    returnHTMLPage('./public/search.html', res)
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