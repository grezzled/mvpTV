const fetch = require('node-fetch');

const fetchData = async (url, options) => {
    return await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err))
}

module.exports = { fetchData }