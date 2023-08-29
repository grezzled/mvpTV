function addMovie(movie){
    let title=document.querySelector('.infos-movie .title');
    let details=document.querySelector('.infos-movie .details .details');
    let storyLine=document.querySelector('.movie-information .story-line')
    let hero1=document.querySelector('.hero1')
    title.innerHTML=movie.title;
    details.innerHTML=movie.releaseDate;
    storyLine.innerHTML=movie.overview;
    const gradient = `linear-gradient(360deg, #0D0C0F 0%, rgba(13, 12, 15, 0.85) 27.08%, rgba(13, 12, 15, 0.00) 46.88%, rgba(13, 12, 15, 0.28) 68.23%, #0D0C0F 100%)`;
    const backgroundImage = `url(${movie.backdrop}) lightgray no-repeat center/cover`;
    hero1.style.setProperty('background', `${gradient}, ${backgroundImage}`);
}

function addCast(cast){
    // Create the cast div
const castDiv = document.createElement("swiper-slide");
castDiv.classList.add('cast');

// Create the image element
const img = document.createElement('img');
img.src = cast.profile;
img.alt = '';
img.srcset = '';

// Create the name-job div
const nameJobDiv = document.createElement('div');
nameJobDiv.classList.add('name-job');

// Create the h4 and h6 elements
const h4 = document.createElement('h4');
h4.textContent = cast.name;

const h6 = document.createElement('h6');
h6.textContent = cast.character;

// Append h4 and h6 to the name-job div
nameJobDiv.appendChild(h4);
nameJobDiv.appendChild(h6);

// Append img and name-job div to the cast div
castDiv.appendChild(img);
castDiv.appendChild(nameJobDiv);

// Get the .top-cast .stream-brand element
const topCastStreamBrand = document.querySelector('#cast-swiper');

// Append the cast div to .top-cast .stream-brand
topCastStreamBrand.appendChild(castDiv);
// This code will create the HTML structure you provided and then append it to the .top-cast .stream-brand element in the DOM. Make sure that the structure of your HTML and the classes used in the code match the actual structure and classes in your project.

topCastStreamBrand.appendChild(castDiv);

}

function addSimilarMovie(similarMovie){
  genres=similarMovie.genres.slice(0,2);
  // Create the similar-movie div
const similarMovieDiv = document.createElement("swiper-slide");
similarMovieDiv.classList.add('similar-movie');

const anchorElement = document.createElement("a");
  anchorElement.href = `/movie?id=${similarMovie.id}`;


// Create the img element
const imgMovie = document.createElement('img');
imgMovie.classList.add('img-movie');
imgMovie.src = similarMovie.backdrop;
imgMovie.alt = '';

// Create the title-desc div
const titleDescDiv = document.createElement('div');
titleDescDiv.classList.add('title-desc');

// Create the h4 element for movie title
const h4Title = document.createElement('h4');
h4Title.textContent = similarMovie.title;

// Create the rating-genre div
const ratingGenreDiv = document.createElement('div');
ratingGenreDiv.classList.add('rating-genre');

// Create the rating div
const ratingDiv = document.createElement('div');
ratingDiv.classList.add('rating');

// Create the img element for star
const imgStar = document.createElement('img');
imgStar.src = '../public/images/star.svg';
imgStar.alt = '';

// Create the h4 element for rating
const h4Rating = document.createElement('h4');
h4Rating.textContent = similarMovie.vote;



// Append img and h4 to rating div
ratingDiv.appendChild(imgStar);
ratingDiv.appendChild(h4Rating);

// Create the genre div
const genreDiv = document.createElement('div');
genreDiv.classList.add('genre');

// Create the h4 element for genre
const h4Genre = document.createElement('h4');
h4Genre.innerHTML = `<ul class="movie-genre">
${genres.map(genre => `<li>${genre}</li>`).join("")}
</ul>`

// Append h4 to genre div
genreDiv.appendChild(h4Genre);

// Append rating div and genre div to rating-genre div
ratingGenreDiv.appendChild(ratingDiv);
ratingGenreDiv.appendChild(genreDiv);

// Append h4 to title-desc div
titleDescDiv.appendChild(h4Title);
titleDescDiv.appendChild(ratingGenreDiv);


// 
// Append img and title-desc div to similar-movie div
similarMovieDiv.appendChild(anchorElement);
similarMovieDiv.appendChild(imgMovie);
similarMovieDiv.appendChild(titleDescDiv);
anchorElement.appendChild(imgMovie);
// Get the #similar-movie-swiper element
const similarMovieSwiper = document.querySelector('#similar-movie-swiper');

// Append the similar-movie div to #similar-movie-swiper
similarMovieSwiper.appendChild(similarMovieDiv);

}

let movieShowed = JSON.parse(document.getElementById('movie-details-data').textContent);
let movieCast = JSON.parse(document.getElementById('movie-credits-data').textContent);
let similarMovies = JSON.parse(document.getElementById('movie-similar-data').textContent);


addMovie(movieShowed)

for(let i=0;i<10;i++){
    addCast(movieCast[i])
}


// for(let i=0;i<5;i++){
//     addSimilarMovie(similarMovies[i])
// }

similarMovies.forEach((movieData) => {
  addSimilarMovie(movieData);
});

const swiperEl0 = document.querySelector('#cast-swiper')
// console.log(swiperEl0);
Object.assign(swiperEl0, {
    // autoplay: {
    //   delay: 3500,
    //   disableOnInteraction: false,
    // },
    // navigation:"true",
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  });
swiperEl0.initialize();

const swiperEl1 = document.querySelector('#similar-movie-swiper')
Object.assign(swiperEl1, {
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    // navigation:"true",
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });
swiperEl1.initialize();