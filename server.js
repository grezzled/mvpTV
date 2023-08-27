require('dotenv').config()
const { buildServer, returnHTMLPage} = require('./utils/easyServer')

const myServer = buildServer()
const PORT = process.env.PORT || 3000
myServer.listen(PORT, () => {
    console.info('server started at http://localhost:3000')
})

myServer.getList(['', '/', '/index', '/index.html', '/home'], (req, res, params) => {
    returnHTMLPage('./public/index.html', res)
})

myServer.get('/movie', (req, res, params) => {
    returnHTMLPage('./public/movie.html', res)
})

myServer.get('/api/', (req, res, params) => {
    
})

