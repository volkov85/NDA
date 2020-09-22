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
  speed: 1000,
  loop: true,
  slidesPerView: 3,
  spaceBetween: 28,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    3840: {
      slidesPerView: 4,
      spaceBetween: 88,
      centeredSlides: false
    }
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
  afterRender() {
    // Появление соц.иконок и стрелок слайдера
    let heroSocials = document.querySelector(`.hero__social`);
    let heroSliderControls = document.querySelector(`.hero__slider-control`);

    heroSocials.classList.add(`hero__social--shown`);
    heroSliderControls.classList.add(`hero__slider-control--shown`);
  },
  onLeave(origin, destination) {
    if (destination.isFirst) {
      header.classList.remove(`header--small`);
      header.classList.remove(`header--dark`);
    } else {
      header.classList.add(`header--small`);
      header.classList.add(`header--dark`);
    }
  }
});

/**
 * Оживление формы
 */
let partnershipInputs = document.querySelectorAll(`.partnership__form-field`);

for (let i = 0; i < partnershipInputs.length; i++) {
  partnershipInputs[i].firstChild.addEventListener(`input`, () => {
    if (partnershipInputs[i].firstChild.value) {
      partnershipInputs[i].firstChild.classList.add(`filled`);
    } else {
      partnershipInputs[i].firstChild.classList.remove(`filled`);
    }
  });
}

/**
 * Оживление FAQ
 */
let faqQuestions = document.querySelectorAll(`.faq__qa-question`);
let faqAnswers = document.querySelectorAll(`.faq__qa-answer`);

let faqPopup = document.querySelector(`.popup--qa-answer`);
let faqPopupClose = faqPopup.querySelector(`.popup__close`);
let faqPopupQuestion = faqPopup.querySelector(`.qa-answer__title`);
let faqPopupAnswer = faqPopup.querySelector(`.qa-answer__text`);
let overlay = document.querySelector(`.overlay`);

for (let i = 0; i < faqQuestions.length; i++) {
  faqQuestions[i].firstChild.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    faqPopupQuestion.textContent = faqQuestions[i].firstChild.textContent;
    faqPopupAnswer.textContent = faqAnswers[i].textContent;

    faqPopup.classList.add(`popup--shown`);
    overlay.classList.add(`overlay--shown`);
  });
}

faqPopupClose.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  removeAnimationClassShown(faqPopup, `popup--shown`);
  overlay.classList.remove(`overlay--shown`);
});

overlay.addEventListener(`click`, () => {
  let shownPopup = document.querySelector(`.popup--shown`);

  removeAnimationClassShown(shownPopup, `popup--shown`);
  overlay.classList.remove(`overlay--shown`);
});

/**
 * Закрытие панели cookies
 */
let cookies = document.querySelector(`.cookies`);
let cookiesBtn = cookies.querySelector(`.button`);

cookiesBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  cookies.remove();
});

/**
 * Скрытие элемента (удаляем класс &--shown)
 */
function removeAnimationClassShown(el, cls) {
  resetCSSAnimation(el, cls);
  el.style.animationDirection = `reverse`;

  window.setTimeout(() => {
    el.classList.remove(cls);
    el.removeAttribute(`style`);
  }, 300);
}

/**
 * Сброс CSS-анимации
 */
function resetCSSAnimation(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}
