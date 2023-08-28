// Fetch movie data from the JSON file
fetch("../public/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const swiperWrapper = document.querySelector(".swiper-wrapper");

    data.forEach((movie) => {
      const movieSlide = createMovieSlide(movie);
      swiperWrapper.appendChild(movieSlide);
    });
  })
  .catch((error) => {
    console.error("Error fetching movie data:", error);
  });

// Create a movie slide element
function createMovieSlide(movie) {
  const movieSlide = document.createElement("div");
  movieSlide.classList.add("swiper-slide");

  const movieDetail = createMovieDetail(movie);

  const img = document.createElement("img");
  img.src = movie.poster;
  img.alt = movie.title;

  movieSlide.appendChild(movieDetail);
  movieSlide.appendChild(img);

  return movieSlide;
}

// Create a movie detail element
function createMovieDetail(movie) {
  const movieDetail = document.createElement("div");
  movieDetail.classList.add("swiper-movie-detail");

  movieDetail.innerHTML = `
    <p>${movie.title}</p>
    <div class="movie-details">
      <div class="rating">⭐ ${movie.vote}</div>
      <div class="genre"><span>${movie.genres.join(" | ")}</span></div>
    </div>
  `;

  return movieDetail;
}

// Function to update the content with data from the JSON file
function updateContent(movie) {
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-image").src = movie.poster;
  document.getElementById("movie-details").textContent = movie.overview;
  document.getElementById("rating").textContent = `⭐ ${movie.vote} |`;
  document.getElementById("date").textContent = ` ${movie.releaseDate} |`;
  document.getElementById("genre").textContent = movie.genres.join(" | ");
}

// Function to fetch JSON data and update content
function fetchDataAndRender() {
  fetch("../public/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const randomMovie = data[Math.floor(Math.random() * data.length)];
      updateContent(randomMovie);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Initial fetch and render
fetchDataAndRender();

// Refresh data every 10 minutes
setInterval(fetchDataAndRender, 10 * 60 * 1000);
