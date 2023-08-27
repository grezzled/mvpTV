const fs = require('fs');
const querystring = require('querystring')
const url = require('url')

async function getFile(path) {
    return await new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err)
                reject(err)
            resolve(data);
        })
    })
}

const getPath = (uri) => {
    const parsedUrl = url.parse(uri)
    return parsedUrl.pathname
}

const getQuery = (uri) => {
    const parsedUrl = url.parse(uri)
    const query = querystring.parse(parsedUrl.query)
    return query
}

const fetchData = (link, callback)=>{
    
}

module.exports = { getFile, getPath, getQuery }