/**
 * Добавление слайдера блока hero
 */
let heroSwiper = new Swiper(`.hero__wrapper`, {
  loop: true,
  effect: `fade`,
  fadeEffect: {
    crossFade: true
  },
  navigation: {
    nextEl: `.hero__slider-button--right`,
    prevEl: `.hero__slider-button--left`
  }
});

/**
 * Добавление слайдера блока features
 */
let featuresSwiper = new Swiper(`.features__wrapper`, {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 28,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: `.features__pagination`,
    clickable: true,
    renderBullet(index, className) {
      return `<button class="${className}" type="button"><span class="visually-hidden">К слайду ${index + 1}</span></button>`;
    },
    bulletClass: `slider-pagination__button`,
    bulletActiveClass: `slider-pagination__button--active`
  }
});

/**
 * Добавление слайдера блока services
 */
let servicesSwiper = new Swiper(`.services__wrapper`, {
  slidesPerView: 3,
  slidesPerColumn: 2,
  spaceBetween: 30,
  pagination: {
    el: `.services__pagination`,
    clickable: true,
    renderBullet(index, className) {
      return `<button class="${className}" type="button"><span class="visually-hidden">К слайду ${index + 1}</span></button>`;
    },
    bulletClass: `slider-pagination__button`,
    bulletActiveClass: `slider-pagination__button--active`
  }
});

/**
 * Добавление полностраничной прокрутки
 */
let header = document.querySelector(`.header`);

let fullpage = new fullpage(`#fullpage`, {
  licenseKey: `YOUR_KEY_HERE`,
  recordHistory: false,
  scrollOverflow: true,
  onLeave(origin, destination) {
    if (destination.isFirst) {
      header.classList.remove(`header--hidden`);
    } else {
      header.classList.add(`header--hidden`);
    }
  }
});
