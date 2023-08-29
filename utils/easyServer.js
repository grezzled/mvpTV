const http = require('http')
const path = require('path');
const { getFile, getPath, getQuery } = require('./helpers')




const returnHTMLPage = (path, res, dataToInject = "") => {

  res.setHeader('Content-Type', 'text/html')

  getFile(path).then((data) => {
    res.writeHead(200)
    res.write(dataToInject)
    res.write(data)
    res.end()
  }).catch((err) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  })
}

const returnJSON = (data, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    JSON.parse(data) // check if json is valid
    res.writeHead(200)
    res.end(data)
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('JSON: Internal Server Error' + error);
  }
}

const _returnResources = (req, res) => {
  const fileExtensions = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.svg': 'image/svg+xml',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.tiff': 'image/tiff',
    '.bmp': 'image/bmp',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.txt': 'text/plain',
    '.csv': 'text/csv',
    '.xml': 'application/xml',
    '.json': 'application/json',
    '.zip': 'application/zip',
    '.tar': 'application/x-tar',
    '.gz': 'application/gzip',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.avi': 'video/x-msvideo',
    '.mkv': 'video/x-matroska',
  };

  const filePath = '.' + req.url;

  const extname = path.extname(filePath);

  res.setHeader('Content-Type', fileExtensions[extname] || 'text/plain');

  getFile(filePath).then((data) => {
    res.writeHead(200)
    res.write(data)
    res.end()
  }).catch((err) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  })
}


/* Looks at this object b7ala raha class with _build hia lconstructor
   and ${server} & ${routes} are properties and the rest are methods of the class
*/
const makeServer = {
  server: null,
  routes: [],

  _build() {
    if (this.server === null) {
      this.server = http.createServer((req, res) => {
        const requestedPath = getPath(req.url);
        let pageFound = false
        this.routes.forEach(route => {
          if (route.path === "/public" && requestedPath.startsWith('/public')) {
            pageFound = true
            route.cb(req, res, getQuery(req.url));
          }
          if (route.path === "/api" && requestedPath.startsWith('/api')) {
            pageFound = true
            route.cb(req, res, getQuery(req.url));
          }
          if (requestedPath === route.path) {
            pageFound = true
            route.cb(req, res, getQuery(req.url));
          }
        })
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
    this.routes.push({ path, cb })
    return this;
  },

  getPublic(cb) {
    this.routes.push({ path: '/public', cb })
    return this
  },

  getAPI(path, cb) {
    this.routes.push({ path, cb })
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


module.exports = { buildServer, returnHTMLPage, returnJSON }