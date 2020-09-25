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
  slidesPerView: 2,
  spaceBetween: 28,
  autoplay: {
    delay: 5000
  },
  breakpoints: {
    1600: {
      slidesPerView: 3
    },
    1920: {
      slidesPerView: 3,
      spaceBetween: 18
    },
    3840: {
      slidesPerView: 5,
      spaceBetween: 28
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
  breakpoints: {
    1920: {
      spaceBetween: 42
    },
    3840: {
      slidesPerView: 4
    }
  },
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
    // let heroSocials = document.querySelector(`.hero__social`);
    let heroSliderControls = document.querySelector(`.hero__slider-control`);

    // heroSocials.classList.add(`hero__social--shown`);
    heroSliderControls.classList.add(`hero__slider-control--shown`);
  },
  onLeave(origin, destination) {
    if (destination.isFirst) {
      header.classList.remove(`header--hidden`);
    } else {
      header.classList.add(`header--hidden`);
    }
  }
});

/**
 * Добавление параллакса в блоке hero
 */
let heroParallaxScenes = document.querySelectorAll(`.hero__slide-image`);

for (let i = 0; i < heroParallaxScenes.length; i++) {
  let heroParallax = new Parallax(heroParallaxScenes[i], {
    relativeInput: true,
    hoverOnly: true,
    inputElement: heroParallaxScenes[i].parentNode.parentNode,
    pointerEvents: true
  });
}

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
 * Добавление маски для телефона в форме
 */
let phoneInputMask = IMask(document.querySelector(`.partnership__form-field [type=tel]`), {
  mask: `+{7} (000)000-00-00`,
  lazy: false
});

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

// if (!document.cookie.split(`; `).find((row) => row.startsWith(`isCookiesAccepted`))) {
//   cookies.style.display = `block`;

//   let cookiesBtn = cookies.querySelector(`.button`);

//   cookiesBtn.addEventListener(`click`, (evt) => {
//     evt.preventDefault();
//     cookies.removeAttribute(`style`);
//     document.cookie = `isCookiesAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
//   });
// }

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
