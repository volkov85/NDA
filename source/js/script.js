let header = document.querySelector(`.header`);

/**
 * Добавление полностраничной прокрутки
 */
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
 * Закрытие попапов по клику на overlay
 */
let overlay = document.querySelector(`.overlay`);

overlay.addEventListener(`click`, () => {
  let shownPopup = document.querySelector(`.popup--shown`);

  closePopup(shownPopup, `popup--shown`);
});

/**
 * Оживление модального окна вопроса
 */
let askQuestionBtn = document.querySelector(`.contacts__block-link-ask`);
let askQuestionFooterBtn = document.querySelector(`.footer__link-ask`);

if (askQuestionBtn || askQuestionFooterBtn) {
  let questionPopup = document.querySelector(`.popup--question`);
  let questionPopupClose = questionPopup.querySelector(`.popup__close`);

  if (askQuestionBtn) {
    askQuestionBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      showPopup(questionPopup, `popup--shown`);
    });
  }

  if (askQuestionFooterBtn) {
    askQuestionFooterBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      showPopup(questionPopup, `popup--shown`);
    });
  }

  questionPopupClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closePopup(questionPopup, `popup--shown`);
  });
}

if (document.querySelector(`.page--index`)) {
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
   * Оживление формы блока partnership
   */
  let partnershipFormVariantBtns = document.querySelectorAll(`.partnership__form-variant`);
  let partnershipFormVariantBtnActive = document.querySelector(`.partnership__form-variant--active`);
  let partnershipForms = document.querySelectorAll(`.partnership__form`);
  let partnershipFormShown = document.querySelector(`.partnership__form--shown`);

  let partnershipFormNextBtns = document.querySelectorAll(`.partnership__form-button-next`);
  let partnershipFormPrevBtns = document.querySelectorAll(`.partnership__form-button-prev`);
  let partnershipFormFirstStages = document.querySelectorAll(`.partnership__form-stage--first`);
  let partnershipFormSecondStages = document.querySelectorAll(`.partnership__form-stage--second`);

  for (let i = 0; i < partnershipForms.length; i++) {
    /**
     * Переключение между формами покупателя и продавца
     */
    partnershipFormVariantBtns[i].addEventListener(`click`, (evt) => {
      evt.preventDefault();

      partnershipFormVariantBtnActive.classList.remove(`partnership__form-variant--active`);
      partnershipFormShown.classList.remove(`partnership__form--shown`);

      partnershipFormVariantBtns[i].classList.add(`partnership__form-variant--active`);
      partnershipFormVariantBtnActive = partnershipFormVariantBtns[i];

      partnershipForms[i].classList.add(`partnership__form--shown`);
      partnershipFormShown = partnershipForms[i];
    });

    /**
     * Переключение между первым и вторым шагом формы
     */
    partnershipFormNextBtns[i].addEventListener(`click`, (evt) => {
      evt.preventDefault();

      partnershipFormFirstStages[i].classList.remove(`partnership__form-stage--active`);
      partnershipFormSecondStages[i].classList.add(`partnership__form-stage--active`);
    });

    partnershipFormPrevBtns[i].addEventListener(`click`, (evt) => {
      evt.preventDefault();

      partnershipFormSecondStages[i].classList.remove(`partnership__form-stage--active`);
      partnershipFormFirstStages[i].classList.add(`partnership__form-stage--active`);
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

  for (let i = 0; i < faqQuestions.length; i++) {
    faqQuestions[i].firstChild.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      faqPopupQuestion.textContent = faqQuestions[i].firstChild.textContent;
      faqPopupAnswer.textContent = faqAnswers[i].textContent;

      showPopup(faqPopup, `popup--shown`);
    });
  }

  faqPopupClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closePopup(faqPopup, `popup--shown`);
  });

  /**
   * Оживление модального окна обратной связи
   */
  let feedbackBtn = document.querySelector(`.button--contact`);
  let feedbackPopup = document.querySelector(`.popup--feedback`);
  let feedbackPopupClose = feedbackPopup.querySelector(`.popup__close`);

  feedbackBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    showPopup(feedbackPopup, `popup--shown`);
  });

  feedbackPopupClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closePopup(feedbackPopup, `popup--shown`);
  });
}

if (document.querySelector(`.page--inner`)) {
  /**
   * Оживление шапки на внутренних страницах
   */
  // window.addEventListener(`scroll`, () => {
  //   if (window.pageYOffset > 0) {
  //     header.classList.add(`header--small`);
  //   } else {
  //     header.classList.remove(`header--small`);
  //   }
  // });

  /**
   * Добавление слайдера блока labels
   */
  let labelsSwiper = new Swiper(`.labels__slider-wrapper`, {
    loop: true,
    slidesPerView: 9,
    spaceBetween: 31,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    breakpoints: {
      1920: {
        slidesPerView: 15,
        spaceBetween: 25
      },
      3840: {
        slidesPerView: 12,
        spaceBetween: 62
      }
    },
    navigation: {
      nextEl: `.labels__slider-button--right`,
      prevEl: `.labels__slider-button--left`
    }
  });

  if (labelsSwiper.el) {
    let labelsSwiperTimer;
    let labelsSwiperNavClickEventHandler = () => {
      if (labelsSwiperTimer) {
        window.clearTimeout(labelsSwiperTimer);
      }

      labelsSwiper.wrapperEl.classList.remove(`labels__slide-list--linear`);
      labelsSwiper.autoplay.stop();
      labelsSwiper.params.speed = 300;

      labelsSwiperTimer = window.setTimeout(() => {
        labelsSwiper.wrapperEl.classList.add(`labels__slide-list--linear`);
        labelsSwiper.autoplay.start();
        labelsSwiper.params.speed = 3000;
      }, 5000);
    };

    labelsSwiper.navigation.nextEl.addEventListener(`click`, labelsSwiperNavClickEventHandler);

    labelsSwiper.navigation.prevEl.addEventListener(`click`, labelsSwiperNavClickEventHandler);
  }

  /**
   * Добавление слайдера блока о компании
   */
  let about = document.querySelector(`.about`);
  let aboutSwiper = new Swiper(`.about__wrapper`, {
    loop: true,
    effect: `fade`,
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: `.about__slider-button--right`,
      prevEl: `.about__slider-button--left`
    },
    pagination: {
      el: `.about__slider-pagination`,
      type: `fraction`,
      formatFractionCurrent(num) {
        return `0${num}`.slice(-2);
      },
      formatFractionTotal(num) {
        return `0${num}`.slice(-2);
      },
      renderFraction(currentClass, totalClass) {
        return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
      },
      currentClass: `about__slider-pagination-current`,
      totalClass: `about__slider-pagination-total`
    },
    on: {
      slideChange(swiper) {
        if (swiper.slides[swiper.activeIndex].classList.contains(`about__slide--dark`)) {
          about.classList.add(`about--dark`);
        } else {
          about.classList.remove(`about--dark`);
        }
      }
    }
  });
}

/**
 * Оживление полей ввода форм
 */
let formFields = document.querySelectorAll(`[class$=__form-field]`);

if (formFields.length) {
  for (let i = 0; i < formFields.length; i++) {
    formFields[i].firstChild.addEventListener(`input`, () => {
      if (formFields[i].firstChild.value) {
        formFields[i].firstChild.classList.add(`filled`);
      } else {
        formFields[i].firstChild.classList.remove(`filled`);
      }
    });
  }
}

/**
 * Добавление маски для телефона в форме
 */
let phoneInput = document.querySelector(`.partnership__form-field [type=tel]`);

if (phoneInput) {
  let phoneInputMask = IMask(phoneInput, {
    mask: `+{7} (000)000-00-00`,
    lazy: false
  });
}

/**
 * Закрытие панели cookies
 */
let cookies = document.querySelector(`.cookies`);

if (cookies) {
  if (!document.cookie.split(`; `).find((row) => row.startsWith(`isCookiesAccepted`))) {
    cookies.style.display = `block`;

    let cookiesBtn = cookies.querySelector(`.button`);

    cookiesBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      cookies.removeAttribute(`style`);
      document.cookie = `isCookiesAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    });
  }
}

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
 * Появление модального окна
 */
function showPopup(el, cls) {
  el.classList.add(cls);
  overlay.classList.add(`overlay--shown`);
}

/**
 * Закрытие модального окна
 */
function closePopup(el, cls) {
  removeAnimationClassShown(el, cls);
  overlay.classList.remove(`overlay--shown`);
}

/**
 * Сброс CSS-анимации
 */
function resetCSSAnimation(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}
