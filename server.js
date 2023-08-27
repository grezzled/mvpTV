require('dotenv').config()
const { buildServer, returnHTMLPage, returnJSON } = require('./utils/easyServer')
const { nowPlaying } = require('./api/innerAPI')

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

myServer.get('/search', (req, res, params) => {
    returnHTMLPage('./public/search.html', res)
})

myServer.getAPI('/api/now-playing', (req, res, params) => {
    nowPlaying().then(data => {
        returnJSON(data, res)
    })
})

