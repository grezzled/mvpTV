// Fetch movie data from the JSON file
let embeddedData = JSON.parse(
  document.getElementById("top-rated-data").textContent
);
const swiperWrapper = document.querySelector(".swiper-wrapper");

embeddedData.forEach((movie) => {
  const movieSlide = createMovieSlide(movie);
  swiperWrapper.appendChild(movieSlide);
});

// Create a movie slide element
function createMovieSlide(movie) {


  const movieSlide = document.createElement("div");

  const anchorElement = document.createElement("a");
  anchorElement.href = `/movie?id=${movie.id}`;

  movieSlide.classList.add("swiper-slide");

  const movieDetail = createMovieDetail(movie);

  const img = document.createElement("img");
  img.src = movie.poster;
  img.alt = movie.title;

  movieSlide.appendChild(movieDetail);
  movieSlide.appendChild(anchorElement);
  anchorElement.appendChild(img)
  // movieSlide.appendChild(img);
  // anchorElement.appendChild(imgMovie);

  return movieSlide;
}

// Create a movie detail element
function createMovieDetail(movie) {
  const movieDetail = document.createElement("div");
  movieDetail.classList.add("swiper-movie-detail");

  movieDetail.innerHTML = `
    <p>${movie.title}</p>
    <div class="movie-details ">
      <div class="rating"><span> ⭐ </span> ${movie.vote}</div>
      <div class="genre"><span>${movie.genres[0]} </span> <span> | </span> <span> ${movie.genres[1]}</span></div>
    </div>

  `;

  return movieDetail;
}

// Function to update the content with data from the JSON file
function updateContent(movie) {
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-image").src = movie.backdrop;
  document.getElementById("movie-details").textContent = movie.overview;
  document.getElementById("rating").textContent = `⭐ ${movie.vote} |`;
  document.getElementById("date").textContent = ` ${movie.releaseDate} |`;
  document.getElementById("genre").textContent = movie.genres[0];
  // imageElement.classList.add("scale-in-hor-right");
}

// Function to render random data from the embeddedData array
function renderRandomData() {
  // const randomMovie =
  //   embeddedData[Math.floor(Math.random() * embeddedData.length)];
  // updateContent(randomMovie);
  updateContent(embeddedData[swiperBrIndex]);
}

// Initial render
renderRandomData();

// Refresh data every 10 minutes
setInterval(renderRandomData);
