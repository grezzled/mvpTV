const http = require('http')
const path = require('path');
const { getFile, getPath, getQuery } = require('../helpers')


const returnHTMLPage = (path, res) => {

  res.setHeader('Content-Type', 'text/html')

  getFile(path).then((data) => {
    res.writeHead(200)
    res.write(data)
    res.end()
  }).catch((err) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  })
}

const _returnResources = (req, res) => {
  const fileExtensions = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript'
  };

  const filePath = '.' + req.url;

  console.log(filePath)
  const extname = path.extname(filePath);

  res.setHeader('Content-Type', fileExtensions[extname] || 'text/plain');

  getFile(filePath).then((data) => {
    console.log(filePath)
    res.writeHead(200)
    res.write(data)
    res.end()
  }).catch((err) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  })
}

const makeServer = {
  server: null,
  routes: [],

  _build() {
    if (this.server === null) {
      this.server = http.createServer((req, res) => {
        const requestedPath = getPath(req.url);
        let pageFound = false
        this.routes.forEach(route => {
          if (requestedPath === route.path) {
            pageFound = true
            route.cb(req, res, getQuery(req.url));
          }
          if(route.path === "/public" && requestedPath.startsWith('/public')){
            pageFound = true
            route.cb(req, res, getQuery(req.url));
          }
        });
        if (!pageFound) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Page Not Found');
        }
      });
    } else {
      console.log('Server already created.');
    }
    return this;
  },

  listen(port, cb) {
    this.server.listen(port, cb);
    return this;
  },

  getList(paths = [], cb) {
    paths.forEach(p => {
      this.routes.push({ path: p, cb })
    })
    return this
  },

  get(path, cb) {
    console.log(path)
    this.routes.push({ path, cb })
    return this;
  },

  getPublic(cb) {
    this.routes.push({ path: '/public', cb })
    return this
  },

  post() {
    // Add implementation for post route if needed
  }
};

makeServer.getPublic((req, res, params) => {
  _returnResources(req, res)
})

function buildServer() {
  return makeServer._build()
}


module.exports = { buildServer, returnHTMLPage}