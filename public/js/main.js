

function addNewReleasedMovie(id,poster,title,vote,genres){
    // Create the new swiper-slide element
    genres=genres.slice(0,2);
var swiperSlide = document.createElement("swiper-slide");
swiperSlide.innerHTML = `
    <div class="new-movies-carousel-container-item">
    <a href="../movie?id=${id}">
        <img src="${poster}" class="new-movie-poster-image" alt="${title} Poster" sizes="" srcset="">
            </a>
        <div class="new-movies-infos">
            <span>
            <a href="../movie?id=${id}">
            ${title}
            </a>
            </span>
            <div class="movie-rating-genre">
                <img src="./public/imgs/star.png" alt="" srcset="">
                <span>${vote}</span>
                <div>
                    <ul class="movie-genre">
                    ${genres.map(genre => `<li>${genre}</li>`).join("")}
                    </ul>
                </div>
            </div>
        </div>
    </div>
`;


// Get the div.myswiper element
var mySwiper = document.getElementById("released-movies-swiper");

console.log(mySwiper)

// Append the swiper-slide element to div.myswiper
mySwiper.appendChild(swiperSlide);

}


function addPopularMovie(id,poster,title,vote,genres,cat,classement){
    // Create the new swiper-slide element
var swiperSlide = document.createElement("swiper-slide");
swiperSlide.innerHTML = `
    <div class="popular-movies-carousel-container-item">
        <div class="movie-classement">${classement+1}</div>
        <a href="../movie?id=${id}">
        <img src="${poster}" class="popular-movie-poster-image" alt="${title} Poster" sizes="" srcset="">
        </a>
        <div class="popular-movies-infos">
            <div class="movie-cat">${cat}</div>
            <span>
            <a href="../movie?id=${id}">
            ${title}
            </a>
            </span>
                <div>
                    <ul class="popular-movie-genre">
                    ${genres[0]}
                    </ul>
                </div>
                <div class="popular-movie-rating">
                    <img src="./public/imgs/star.png" alt="" srcset="">
                    <span>${vote}</span>
                </div>     
        </div>
    </div>
`;

// Get the popular-movies-swiper element by id
var popularMoviesSwiper = document.getElementById("popular-movies-swiper");

// Append the swiper-slide element to popular-movies-swiper
popularMoviesSwiper.appendChild(swiperSlide);
}


function addUpcomingMovie(id,poster,title,vote,genres){
    genres=genres.slice(0,2);
    // Create the new upcoming-movies-carousel-container-item element
    var swiperSlide = document.createElement("swiper-slide");
    swiperSlide.innerHTML = `
    <div class="upcoming-movies-carousel-container-item">
    <a href="../movie?id=${id}">
        <img src="${poster}" class="upcoming-movie-poster-image" alt="${title} Poster" sizes="" srcset="">
            </a>
        <div class="upcoming-movies-infos">
            <span>
            <a href="../movie?id=${id}">
            ${title}
            </a>
            </span>
            <div class="movie-rating-genre">
                <img src="./public/imgs/star.png" alt="" srcset="">
                <span>${vote}</span>
                <div>
                    <ul class="movie-genre">
                    ${genres.map(genre => `<li>${genre}</li>`).join("")}
                    </ul>
                </div>
            </div>    
        </div>
    </div>
`;

// Get the upcoming-movies-swiper element by id
var upcomingMoviesSwiper = document.getElementById("upcoming-movies-swiper");

// Append the upcoming-movies-carousel-container-item element to upcoming-movies-swiper
upcomingMoviesSwiper.appendChild(swiperSlide);
}




let nowPlayingMovies = JSON.parse(document.getElementById('now-plying-data').textContent);
let popularMovies = JSON.parse(document.getElementById('popular-data').textContent);
let topMovies = JSON.parse(document.getElementById('top-rated-data').textContent);
let upcomingMovies = JSON.parse(document.getElementById('upcoming-data').textContent);


console.log(nowPlayingMovies)
console.log(popularMovies)
console.log(topMovies)

function AddDataToSection(section){
    if(section==="New"){
        nowPlayingMovies.forEach((movie) => {
            addNewReleasedMovie(movie.id,movie.poster,movie.title,movie.vote,movie.genres);
        });
    }
    if(section==="Popular"){
        popularMovies.forEach((movie,index)=>{
            addPopularMovie(movie.id,movie.poster,movie.title,movie.vote,movie.genres,"PG-13",index);
        })
    }
    if(section==="Upcoming"){
        upcomingMovies.forEach((movie)=>{
            addUpcomingMovie(movie.id,movie.backdrop,movie.title,movie.vote,movie.genres)
        })
    }
}

AddDataToSection("New");
AddDataToSection("Popular");
AddDataToSection("Upcoming");





  const swiperEl0 = document.querySelector('#released-movies-swiper')
    Object.assign(swiperEl0, {
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        navigation:"true",
        loop: true,
        coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 5,
        slideShadows: false,
        },
     
    });
    swiperEl0.initialize();

const swiperEl1 = document.querySelector('#popular-movies-swiper')
    Object.assign(swiperEl1, {
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
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
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
    });
    swiperEl1.initialize();

const swiperEl2 = document.querySelector('#upcoming-movies-swiper')
    Object.assign(swiperEl2, {
      autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 60,
        },
      },
    });
    swiperEl2.initialize();