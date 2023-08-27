const { buildMovieList, endPoints } = require('./tmdb')

const nowPlaying = (page = 1) => {
    return buildMovieList(endPoints.NOW_PLAYING, page)
}



module.exports = { nowPlaying }