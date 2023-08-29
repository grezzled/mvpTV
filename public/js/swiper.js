let swiperBrIndex = 0;
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    "@0.50": {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    "@0.75": {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});
swiper.on("navigationNext", (e) => {
  swiperBrIndex++;
  console.log("next navigation");
});
swiper.on("navigationPrev", () => {
  swiperBrIndex--;
  console.log("Prev navigation");
});
