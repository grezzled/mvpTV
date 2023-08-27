const { buildMovieList, endPoints } = require('./tmdb')

const nowPlaying = (page = 1) => {
    return buildMovieList(endPoints.NOW_PLAYING, page)
}

const popular = (page = 1) => {
    return buildMovieList(endPoints.POPULAR, page)
}

const topRated = (page = 1) => {
    return buildMovieList(endPoints.TOP_RATED, page)
}


const upcoming = (page = 1) => {
    return buildMovieList(endPoints.UPCOMING, page)
}

const search = (page =1, query) => {
    return buildMovieList(endPoints.SEARCH, page, query)
}

module.exports = { nowPlaying, popular, topRated, upcoming, search }