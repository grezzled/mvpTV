require('dotenv').config()
const { buildServer, returnHTMLPage, returnJSON } = require('./utils/easyServer')
const { nowPlaying, popular, topRated, upcoming, search, movie, credits, similar } = require('./api/innerAPI')
const { buildJSONElement } = require('./utils/helpers')

const myServer = buildServer()
const PORT = process.env.PORT || 3000
myServer.listen(PORT, () => {
    console.info('server started at http://localhost:3000')
})

myServer.getList(['', '/', '/index', '/index.html', '/home'], async (req, res, params) => {
    let jsonElements = ""
    jsonElements += buildJSONElement('now-plying-data', await nowPlaying())
    jsonElements += buildJSONElement('popular-data', await popular())
    jsonElements += buildJSONElement('top-rated-data', await topRated())
    jsonElements += buildJSONElement('upcoming-data', await upcoming())
    returnHTMLPage('./public/index.html', res, jsonElements)
})

myServer.get('/movie', async (req, res, params) => {
    let jsonElements = buildJSONElement('movie-details-data', await movie(params.id))
    jsonElements += buildJSONElement('movie-credits-data', await credits(params.id))
    jsonElements += buildJSONElement('movie-similar-data', await similar(params.id))
    returnHTMLPage('./public/movie.html', res, jsonElements)
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

myServer.get('/api/movies/search', (req, res, params) => {
    search(params.page ?? 1, params.query).then(data => {
        returnJSON(data, res)
    })
})

myServer.get('/api/movies/movie', (req, res, params) => {
    movie(params.id).then(data => {
        returnJSON(data, res)
    })
})

myServer.get('/api/movie/credits', (req, res, params) => {
    credits(params.id).then(data => {
        returnJSON(data, res)
    })
})

myServer.get('/api/movie/similar', (req, res, params) => {
    similar(params.id, params.page ?? 1).then(data => {
        returnJSON(data, res)
    })
})
