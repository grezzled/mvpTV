require('dotenv').config()
const { deprecate } = require('util')
const { fetchData } = require('./helpers')

const rootURl = 'https://api.themoviedb.org/3/'
const rootImgUrl = 'https://image.tmdb.org/t/p/'
const backdrop_sizes = { w300: 'w300', w780: 'w780', w1280: 'w1280', original: 'original' }
const logo_sizes = { w45: 'w45', w92: 'w92', w154: 'w154', w185: 'w185', w300: 'w300', w500: 'w500', original: 'original' }
const poster_sizes = { w92: 'w92', w154: 'w154', w185: 'w185', w342: 'w342', w500: 'w500', w780: 'w780', original: 'original' }
const movie_genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
]

const endPoints = {
  NOW_PLAYING: 'movie/now_playing?language=en-US&region=US',
  POPULAR: 'movie/popular?language=en-US&region=US',
  TOP_RATED: 'movie/top_rated?language=en-US&region=US',
  UPCOMING: 'movie/upcoming?language=en-US&region=US',
  SEARCH: 'search/movie?include_adult=false&language=en-US&region=US',
  MOVIE: 'movie',
  CREDITS: 'credits',
  
}

const buildImgUrl = (rootImgUrl, size, id) => {
  return `${rootImgUrl}${size}${id}`
}

const buildUrl = (rootURl, path, page, search = "") => {

  if (search !== "")
    return `${rootURl}${path}&page=${page}&query=${search}`
  return `${rootURl}${path}&page=${page}`
}

const buildUrlV2 = (rootURl, path, params) => {
  let query = ""
  Object.entries(params).forEach(([key, value]) => {
    query += `&${key}=${value}`
  })
  query = query.substring(1)
  return `${rootURl}${path}${query !== "" ? "&" + query : ""}`
}

const buildOptions = (httpMethod, token, payload) => {
  return {
    method: httpMethod,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
      //TODO add header payload for POST method
    }
  }
}

const getGenreNameById = (id) => {
  const genre = movie_genres.filter(e => {
    if (e.id === id) {
      return e
    }
  })

  return genre[0].name
}




/* MOVIE OBJECT END POINT EXAMPLE
{
      "adult": false,
      "backdrop_path": "/lDCIQ1Qe7cRnhZ4ybQVVEbadMZ.jpg",
      "genre_ids": [
        27,
        53
      ],
      "id": 1008042,
      "original_language": "en",
      "original_title": "Talk to Me",
      "overview": "When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.",
      "popularity": 741.313,
      "poster_path": "/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
      "release_date": "2023-07-28",
      "title": "Talk to Me",
      "video": false,
      "vote_average": 7.2,
      "vote_count": 236
    },
*/

const makeMovie = (e) => {
  return {
    id: e.id,
    title: e.title,
    genres: e.genre_ids.map(e => { return getGenreNameById(e) }),
    // genres:e.genre_ids,
    overview: e.overview,
    releaseDate: e.release_date,
    vote: e.vote_average,
    voteCount: e.vote_count,
    backdrop: buildImgUrl(rootImgUrl, backdrop_sizes.original, e.backdrop_path),
    poster: buildImgUrl(rootImgUrl, poster_sizes.original, e.poster_path)
  }
}

const makeCredit = (e) => {
  if (e.profile_path !== null && e.known_for_department === 'Acting') {
    return {
      id: e.id,
      name: e.name,
      profile: buildImgUrl(rootImgUrl, backdrop_sizes.original, e.profile_path),
      character: e.character
    }
  }
  return false
}

const makeApendedMovie = (e) => {
  return {
    id: e.id,
    title: e.title,
    // genres: e.genre_ids.map(e => { return getGenreNameById(e) }),
    genre:e.genre_id,
    overview: e.overview,
    releaseDate: e.release_date,
    vote: e.vote_average,
    voteCount: e.vote_count,
    backdrop: buildImgUrl(rootImgUrl, backdrop_sizes.original, e.backdrop_path),
    poster: buildImgUrl(rootImgUrl, poster_sizes.original, e.poster_path)
  }
}

const buildMovieList = async (endPoint, params = {}) => {
  try {
    const data = await fetchData(
      buildUrlV2(rootURl, endPoint, params),
      buildOptions('GET', process.env.TMDB_AUTH)
    )
    const arrData = data.results
    const movieList = []
    arrData.forEach(e => {
      const movie = makeMovie(e)
      movieList.push(movie)
    })
    return JSON.stringify(movieList)
  } catch (err) {
    return (err)
  }
}

const buildMovie = async (endPoint, params = {}) => {
  try {
    const data = await fetchData(
      buildUrlV2(rootURl, endPoint, params),
      buildOptions('GET', process.env.TMDB_AUTH)
    )

    const movie = makeApendedMovie(data)
    return JSON.stringify(movie)
  } catch (err) {
    return (err)
  }
}

const buildCreditList = async (endPoint, params = {}) => {
  try {

    const data = await fetchData(
      buildUrlV2(rootURl, endPoint, params),
      buildOptions('GET', process.env.TMDB_AUTH)
    )
    const creditsList = []
    data.cast.forEach(e => {
      const credit = makeCredit(e)
      if (credit)
        creditsList.push(credit)
    })
    return JSON.stringify(creditsList)
  } catch (err) {
    return (err)
  }
}


const buildSimilarList = async (endPoint, params = {}) => {
  try {

    const data = await fetchData(
      buildUrlV2(rootURl, endPoint, params),
      buildOptions('GET', process.env.TMDB_AUTH)
    )
    const arrData = data.results
    const movieList = []
    arrData.forEach(e => {
      const movie = makeMovie(e)
      movieList.push(movie)
    })
    return JSON.stringify(movieList)
  } catch (err) {
    return (err)
  }
}


// TODO embed credits in the returned movie list


module.exports = { buildMovieList, buildMovie, endPoints, buildCreditList, buildSimilarList }