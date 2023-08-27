const { buildMovieList, endPoints, buildMovie } = require('./tmdb')

const nowPlaying = (page = 1) => {
    return buildMovieList(endPoints.NOW_PLAYING, { page: page })
}

const popular = (page = 1) => {
    return buildMovieList(endPoints.POPULAR, { page: page })
}

const topRated = (page = 1) => {
    return buildMovieList(endPoints.TOP_RATED, { page: page })
}


const upcoming = (page = 1) => {
    return buildMovieList(endPoints.UPCOMING, { page: page })
}

const search = (page = 1, query) => {
    return buildMovieList(endPoints.SEARCH, { page: page, query: query })
}

const movie = (id) => {
    return buildMovie(`${endPoints.MOVIE}/${id}`)
}

module.exports = { nowPlaying, popular, topRated, upcoming, search, movie }