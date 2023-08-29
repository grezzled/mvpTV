
// function addLogo(imgName,altName){
//     var newItem = document.createElement("swiper-slide");
//     var newDiv=document.createElement("div");
//     newDiv.classList.add("logos-carousel-container-item");

//     var newImage = document.createElement("img");
//     newImage.src = `./images/logos/${imgName}`;
//     newImage.alt = altName;

//     newDiv.appendChild(newImage);
//     newItem.appendChild(newDiv)
//     // Append the new item to the carousel
//     let logosCarouselContainer=document.getElementById('logos-swiper');
//     logosCarouselContainer.appendChild(newItem);
// }

function addNewReleasedMovie(id,poster,title,vote,genres){
    // Create the new swiper-slide element
var swiperSlide = document.createElement("swiper-slide");
swiperSlide.innerHTML = `
    <div class="new-movies-carousel-container-item">
    <a href="../movie?id=${id}">
        <img src="${poster}" class="new-movie-poster-image" alt="${title} Poster" sizes="" srcset="">
            </a>
        <div class="new-movies-infos">
            <span>${title}</span>
            <div class="movie-rating-genre">
                <img src="./public/imgs/star.png" alt="" srcset="">
                <span>${vote}</span>
                <div>
                    <ul class="movie-genre">
                    <li>${genres[0]}</li>
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
        <img src="${poster}" class="popular-movie-poster-image" alt="${title} Poster" sizes="" srcset="">
        <div class="popular-movies-infos">
            <div class="movie-cat">${cat}</div>
            <span>${title}</span>
                <div>
                    <ul class="popular-movie-genre">
                    <li>${genres[0]}</li>
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


function addOtherMovie(id,poster,title,vote,genres){
    // Create the new other-movies-carousel-container-item element
    var swiperSlide = document.createElement("swiper-slide");
    swiperSlide.innerHTML = `
    <div class="other-movies-carousel-container-item">
    <a href="../movie?id=${id}">
        <img src="${poster}" class="other-movie-poster-image" alt="${title} Poster" sizes="" srcset="">
            </a>
        <div class="other-movies-infos">
            <span>${title}</span>
            <div class="movie-rating-genre">
                <img src="./public/imgs/star.png" alt="" srcset="">
                <span>${vote}</span>
                <div>
                    <ul class="movie-genre">
                    <li>${genres[0]}</li>
                    </ul>
                </div>
            </div>    
        </div>
    </div>
`;

// Get the other-movies-swiper element by id
var otherMoviesSwiper = document.getElementById("other-movies-swiper");

// Append the other-movies-carousel-container-item element to other-movies-swiper
otherMoviesSwiper.appendChild(swiperSlide);
}

// let logos=[
//     {name:"disney-logo.png",alt:"logo of disney"},
//     {name:"netflix-logo.png",alt:"logo of netflix"},
//     {name:"marvel-logo.png",alt:"logo of marvel"},
//     {name:"pixar-logo.png",alt:"logo of pixar"},
//     {name:"national-geographic-logo.png",alt:"logo of national geographic"},
// ]

// logos.forEach((l)=>{
//     addLogo(l.name,l.alt)
// })

// let Movies=[
//     {imgName:"oppenheimer.jpg",imgAlt:"poster of movie oppenheimer",title:"Oppenheimer",rating:"8.6",genres:["Biographique", "Drame"],cat:"PG-13"},
//     {imgName:"barbie.jpg",imgAlt:"poster of movie barbie",title:"Barbie",rating:"7.2",genres:["Comedy","Romance"],cat:"PG-13"},
//     {imgName:"creed3.jpg",imgAlt:"poster of movie creed 3",title:"Creed 3",rating:"8.2",genres:["Boxing","Action"],cat:"PG-13"},
//     {imgName:"granturismo.jpg",imgAlt:"poster of movie granTurismo",title:"Gran Turismo",rating:"7.6",genres:["Adventure", "Drame"],cat:"PG-13"},
//     {imgName:"Meg2.jpg",imgAlt:"poster of movie Meg2",title:"Meg 2",rating:"7.8",genres:["Action", "Drame"],cat:"PG-13"},
//     {imgName:"strays.jpg",imgAlt:"poster of movie strays",title:"Strays",rating:"8.0",genres:["Comedy","Biographique"],cat:"PG-13"},
// ]

// function fetchDataIntoSection(url,section){
//     fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//         if(section==="New"){
//             data.forEach((movie) => {
//                 addNewReleasedMovie(movie.poster,movie.title,movie.vote,movie.genres);
//             });
//         }
//         else if(section==="Popular"){
//             data.forEach((movie,index) => {
//                 addPopularMovie(movie.poster,movie.title,movie.vote,movie.genres,"PG-13",index);
//             });
//         }
//         else if(section==="Top"){
//             data.forEach((movie) => {
//                 addOtherMovie(movie.backdrop,movie.title,movie.vote,movie.genres)
//             });
//         }
//         else throw new Error("Invalid Section Name.");
//   })
//   .catch((error) => {
//     console.error("Error fetching movie data:", error);
//   });
// }

// fetchDataIntoSection("http://localhost:3000/api/movies/now-playing","New")
// fetchDataIntoSection("http://localhost:3000/api/movies/popular","Popular")
// fetchDataIntoSection("http://localhost:3000/api/movies/top_rated","Top")

let nowPlayingMovies = JSON.parse(document.getElementById('now-plying-data').textContent);
let popularMovies = JSON.parse(document.getElementById('popular-data').textContent);
let topMovies = JSON.parse(document.getElementById('top-rated-data').textContent);

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
    if(section==="Top"){
        topMovies.forEach((movie)=>{
            addOtherMovie(movie.id,movie.backdrop,movie.title,movie.vote,movie.genres)
        })
    }
}

AddDataToSection("New");
AddDataToSection("Popular");
AddDataToSection("Top");


// Movies.forEach((m)=>{
//     addNewReleasedMovie(m.imgName,m.imgAlt,m.title,m.rating,m.genres)
// })

// Movies.forEach((m,index)=>{
//     addPopularMovie(m.imgName,m.imgAlt,m.title,m.rating,m.genres,m.cat,index)
// })

// Movies.forEach((m)=>{
//     addOtherMovie(m.imgName,m.imgAlt,m.title,m.rating,m.genres)
// })



// const swiperEl = document.querySelector('#logos-swiper')
//     Object.assign(swiperEl, {
//       autoplay: {
//         delay: 3000,
//         disableOnInteraction: false,
//       },
//       breakpoints: {
//         640: {
//           slidesPerView: 1,
//           spaceBetween: 0,
//         },
//         768: {
//           slidesPerView: 2,
//           spaceBetween: 40,
//         },
//         1024: {
//           slidesPerView: 5,
//           spaceBetween: 60,
//         },
//       },
//     });
//     swiperEl.initialize();


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
    //   autoplay: {
    //     delay: 3500,
    //     disableOnInteraction: false,
    //   },
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

const swiperEl2 = document.querySelector('#other-movies-swiper')
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