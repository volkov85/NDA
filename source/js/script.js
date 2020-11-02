/**
 * Оживление мобильного меню
 */
let header = document.querySelector(`.header`);
let mobileMenu = document.querySelector(`.mobile-menu`);
let mobileMenuOpenBtn = header.querySelector(`.header__mobile-menu-toggle`);
let mobileMenuCloseBtn = mobileMenu.querySelector(`.mobile-menu__close`);

mobileMenuOpenBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  showPopup(mobileMenu, `mobile-menu--shown`);
});

mobileMenuCloseBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  closePopup(mobileMenu, `mobile-menu--shown`);
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
 * Добавление полностраничной прокрутки
 */
let fullpage = new fullpage(`#fullpage`, {
  licenseKey: `YOUR_KEY_HERE`,
  recordHistory: false,
  scrollOverflow: true,
  responsiveWidth: 1200,
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

    if (overlay.classList.contains(`overlay--shown`)) {
      return false;
    }
  }
});

/**
 * Оживление модального окна вопроса
 */
let askQuestionBtn = document.querySelector(`.contacts__block-link-ask`);
let askQuestionFaqBtn = document.querySelector(`.faq__link-ask`);
let askQuestionFooterBtn = document.querySelector(`.footer__link-ask`);

if (askQuestionBtn || askQuestionFaqBtn || askQuestionFooterBtn) {
  let questionPopup = document.querySelector(`.popup--question`);
  let questionPopupClose = questionPopup.querySelector(`.popup__close`);

  if (askQuestionBtn) {
    askQuestionBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      showPopup(questionPopup, `popup--shown`);
    });
  }

  if (askQuestionFaqBtn) {
    askQuestionFaqBtn.addEventListener(`click`, (evt) => {
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
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
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
    loopedSlides: 2,
    slidesPerView: `auto`,
    spaceBetween: 28,
    autoplay: {
      delay: 5000
    },
    breakpoints: {
      768: {
        spaceBetween: 30
      },
      1200: {
        loopedSlides: null,
        slidesPerView: 2,
        spaceBetween: 28
      },
      1600: {
        loopedSlides: null,
        slidesPerView: 3,
        spaceBetween: 28
      },
      1920: {
        loopedSlides: null,
        slidesPerView: 3,
        spaceBetween: 18
      },
      3840: {
        loopedSlides: null,
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
    direction: `vertical`,
    slidesPerView: 4,
    spaceBetween: 10,
    breakpoints: {
      768: {
        direction: `horizontal`,
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 30
      },
      1200: {
        direction: `horizontal`,
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 30
      },
      1920: {
        direction: `horizontal`,
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 42
      },
      3840: {
        direction: `horizontal`,
        slidesPerView: 4,
        slidesPerColumn: 2,
        spaceBetween: 42
      }
    },
    navigation: {
      nextEl: `.services__slider-button--right`,
      prevEl: `.services__slider-button--left`
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
   * Добавление аккордеона блока reviews
   */
  let reviewCards = document.querySelectorAll(`.reviews__card`);
  let reviewCardActive = document.querySelector(`.reviews__card--active`);

  for (let i = 0; i < reviewCards.length; i++) {
    reviewCards[i].addEventListener(`click`, () => {
      if (!reviewCards[i].classList.contains(`reviews__card--active`)) {
        reviewCardActive.classList.remove(`reviews__card--active`);
        reviewCards[i].classList.add(`reviews__card--active`);
        reviewCardActive = reviewCards[i];
      }
    });
  }

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
  let partnershipFormArrows = document.querySelector(`.partnership__form-arrows`);
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

      partnershipFormArrows.classList.toggle('partnership__form-arrows--active');

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
   * Оживление FAQ на главной странице
   */
  let faqQuestions = document.querySelectorAll(`.faq__qa-question`);
  let faqAnswers = document.querySelectorAll(`.faq__qa-answer`);

  let faqPopup = document.querySelector(`.popup--qa-answer`);
  let faqPopupClose = faqPopup.querySelector(`.popup__close`);
  let faqPopupQuestion = faqPopup.querySelector(`.qa-answer__title`);
  let faqPopupAnswer = faqPopup.querySelector(`.qa-answer__text`);

  for (let i = 0; i < faqQuestions.length; i++) {
    faqQuestions[i].addEventListener(`click`, (evt) => {
      evt.preventDefault();

      faqPopupQuestion.textContent = faqQuestions[i].textContent;
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
} else if (document.querySelector(`.page--inner`) && document.querySelector(`.contacts`)) {
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
    slidesPerView: `auto`,
    slidesPerColumn: 2,
    spaceBetween: 25,
    breakpoints: {
      768: {
        loop: true,
        loopedSlides: 4,
        slidesPerColumn: 1,
        spaceBetween: 42,
        speed: 3000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        },
      },
      1920: {
        loop: true,
        loopedSlides: 6,
        slidesPerColumn: 1,
        slidesPerView: 15,
        spaceBetween: 25,
        speed: 3000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        },
      },
      3840: {
        loop: true,
        loopedSlides: 6,
        slidesPerColumn: 1,
        slidesPerView: 12,
        spaceBetween: 62,
        speed: 3000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        },
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

    let labelsSwiperHoverTimer;
    let labelsSwiperMouseLeaveEventHandler = () => {
      labelsSwiperHoverTimer = window.setTimeout(() => {
        labelsSwiper.wrapperEl.classList.add(`labels__slide-list--linear`);
        labelsSwiper.autoplay.start();
        labelsSwiper.params.speed = 3000;
      }, 2000);
    };

    if (window.matchMedia(`(min-width: 768px)`).matches) {
      labelsSwiper.autoplay.start();

      labelsSwiper.el.addEventListener(`mouseenter`, () => {
        if (labelsSwiperHoverTimer) {
          window.clearTimeout(labelsSwiperHoverTimer);
        }

        labelsSwiper.wrapperEl.classList.remove(`labels__slide-list--linear`);
        labelsSwiper.autoplay.stop();
        labelsSwiper.params.speed = 300;
      });

      labelsSwiper.el.addEventListener(`mouseleave`, labelsSwiperMouseLeaveEventHandler);

      labelsSwiper.navigation.nextEl.addEventListener(`click`, labelsSwiperNavClickEventHandler);

      labelsSwiper.navigation.prevEl.addEventListener(`click`, labelsSwiperNavClickEventHandler);
    } else {
      labelsSwiper.el.removeEventListener(`mouseleave`, labelsSwiperMouseLeaveEventHandler);

      labelsSwiper.navigation.nextEl.removeEventListener(`click`, labelsSwiperNavClickEventHandler);

      labelsSwiper.navigation.prevEl.removeEventListener(`click`, labelsSwiperNavClickEventHandler);
    }

    window.addEventListener(`resize`, () => {
      if (window.matchMedia(`(min-width: 768px)`).matches) {
        labelsSwiper.autoplay.start();

        labelsSwiper.el.addEventListener(`mouseleave`, labelsSwiperMouseLeaveEventHandler);

        labelsSwiper.navigation.nextEl.addEventListener(`click`, labelsSwiperNavClickEventHandler);

        labelsSwiper.navigation.prevEl.addEventListener(`click`, labelsSwiperNavClickEventHandler);
      } else {
        labelsSwiper.el.removeEventListener(`mouseleave`, labelsSwiperMouseLeaveEventHandler);

        labelsSwiper.navigation.nextEl.removeEventListener(`click`, labelsSwiperNavClickEventHandler);

        labelsSwiper.navigation.prevEl.removeEventListener(`click`, labelsSwiperNavClickEventHandler);
      }
    });
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
          header.classList.add(`header--dark`);
          about.classList.add(`about--dark`);
        } else {
          header.classList.remove(`header--dark`);
          about.classList.remove(`about--dark`);
        }
      }
    }
  });

  /**
   * Добавление слайдера блока отзывов
   */
  let reviewsThumbsSwiper = new Swiper(`.reviews__slider-thumbs`, {
    loop: true,
    loopedSlides: 4,
    slidesPerView: 4,
    speed: 4000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    breakpoints: {
      1920: {
        slidesPerView: 6
      }
    },
    watchSlidesVisibility: true,
    watchSlidesProgress: true
  });

  if (reviewsThumbsSwiper.el) {
    reviewsThumbsSwiper.el.addEventListener(`mouseenter`, () => {
      reviewsThumbsSwiper.wrapperEl.classList.remove(`reviews__slider-thumbs-list--linear`);
      reviewsThumbsSwiper.autoplay.stop();
      reviewsThumbsSwiper.params.speed = 300;
    });

    reviewsThumbsSwiper.el.addEventListener(`mouseleave`, () => {
      window.setTimeout(() => {
        reviewsThumbsSwiper.wrapperEl.classList.add(`reviews__slider-thumbs-list--linear`);
        reviewsThumbsSwiper.autoplay.start();
        reviewsThumbsSwiper.params.speed = 4000;
      }, 2000);
    });
  }

  let reviewsSwiper = new Swiper(`.reviews__slider-main`, {
    loop: true,
    loopedSlides: 4,
    effect: `fade`,
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: `.reviews__slider-button--right`,
      prevEl: `.reviews__slider-button--left`
    },
    pagination: {
      el: `.reviews__slider-pagination`,
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
      currentClass: `reviews__slider-pagination-current`,
      totalClass: `reviews__slider-pagination-total`
    },
    thumbs: {
      swiper: reviewsThumbsSwiper,
      slideThumbActiveClass: `reviews__slider-thumb--active`
    }
  });

  let reviewCardActive = null;
  let reviewsSwiperMobile = new Swiper(`.reviews__list`, {
    slidesPerView: 1,
    navigation: {
      nextEl: `.reviews__slider-button--right`,
      prevEl: `.reviews__slider-button--left`
    },
    pagination: {
      el: `.reviews__slider-pagination`,
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
      currentClass: `reviews__slider-pagination-current`,
      totalClass: `reviews__slider-pagination-total`
    },
    on: {
      init() {
        /**
         * Добавление аккордеона блока reviews
         */
        let reviewCards = document.querySelectorAll(`.reviews__card`);
        let reviewCardHeights = [];

        for (let i = 0; i < reviewCards.length; i++) {
          reviewCards[i].style.height = `auto`;
          reviewCardHeights.push(reviewCards[i].offsetHeight);
          reviewCards[i].style.removeProperty(`height`);
        }

        for (let i = 0; i < reviewCards.length; i++) {
          reviewCards[i].addEventListener(`click`, () => {
            if (reviewCardActive) {
              if (reviewCards[i].classList.contains(`reviews__card--active`)) {
                reviewCardActive.classList.remove(`reviews__card--active`);
                reviewCardActive.style.removeProperty(`height`);

                reviewCardActive = null;
              } else {
                reviewCardActive.classList.remove(`reviews__card--active`);
                reviewCardActive.style.removeProperty(`height`);

                reviewCards[i].classList.add(`reviews__card--active`);
                reviewCardActive = reviewCards[i];

                reviewCardActive.style.height = `${reviewCardHeights[i]}px`;
              }
            } else {
              reviewCards[i].classList.add(`reviews__card--active`);
              reviewCardActive = reviewCards[i];

              reviewCardActive.style.height = `${reviewCardHeights[i]}px`;
            }
          });
        }
      },
      slideChange() {
        if (reviewCardActive) {
          reviewCardActive.classList.remove(`reviews__card--active`);
          reviewCardActive.style.removeProperty(`height`);
          reviewCardActive = null;
        }
      }
    }
  });

  /**
   * Добавление слайдера страницы интерфейса дистрибуции
   */
  let serviceDistridutionSwiper = new Swiper(`.service-page--distribution .service-page__slider-wide-wrapper`, {
    loop: true,
    loopedSlides: 2,
    slidesPerView: `auto`,
    spaceBetween: 12,
    autoplay: {
      delay: 5000
    },
    breakpoints: {
      1200: {
        loopedSlides: null,
        slidesPerView: 3
      },
      1920: {
        loopedSlides: null,
        slidesPerView: 3,
        spaceBetween: 19
      },
      3840: {
        loopedSlides: null,
        slidesPerView: 3,
        spaceBetween: 42
      }
    },
    navigation: {
      nextEl: `.service-page__slider-button--right`,
      prevEl: `.service-page__slider-button--left`
    },
    pagination: {
      el: `.service-page__slider-pagination`,
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
      currentClass: `service-page__slider-pagination-current`,
      totalClass: `service-page__slider-pagination-total`
    }
  });

  /**
   * Добавление лайтбокса для слайдера страницы интерфейса дистрибуции
   */
  if (document.querySelector(`.service-page--distribution`)) {
    let serviceDistridutionLightbox = new SimpleLightbox(`.service-page__slider-wide-list .service-page__slide-wide`, {
      showCounter: false
    });
  }

  /**
   * Добавление слайдера страницы цифровых платформ
   */
  let servicePlatformSwiper = new Swiper(`.service-page--platform .service-page__slider-wrapper`, {
    loop: true,
    loopedSlides: 2,
    slidesPerView: `auto`,
    spaceBetween: 30,
    autoplay: {
      delay: 5000
    },
    breakpoints: {
      320: {
        loopedSlides: null,
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 10,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        }
      },
      768: {
        loopedSlides: null,
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 20,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        }
      },
      1200: {
        loopedSlides: null,
        slidesPerView: 4,
        slidesPerColumn: 1,
        speed: 3000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true,
        }
      },
      1920: {
        loopedSlides: null,
        slidesPerView: 6,
        slidesPerColumn: 1,
        speed: 3000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true,
        }
      },
      3840: {
        loopedSlides: null,
        slidesPerView: 6,
        spaceBetween: 9,
        slidesPerColumn: 1,
        speed: 3000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true,
        }
      }
    },
    navigation: {
      nextEl: `.service-page__slider-button--right`,
      prevEl: `.service-page__slider-button--left`
    },
    on: {
      init() {
        /**
         * Оживление модального окна сервиса на странице цифровых платформ
         */
        let servicePlatformPopup = document.querySelector(`.popup--platform`);
        let servicePlatformPopupClose = servicePlatformPopup.querySelectorAll(`[class$="__close"]`);

        for (let i = 0; i < this.slides.length; i++) {
          this.slides[i].addEventListener(`click`, (evt) => {
            evt.preventDefault();
            showPopup(servicePlatformPopup, `popup--shown`);
          });
        }

        for (let i = 0; i < servicePlatformPopupClose.length; i++) {
          servicePlatformPopupClose[i].addEventListener(`click`, (evt) => {
            evt.preventDefault();
            closePopup(servicePlatformPopup, `popup--shown`);
          });
        }
      }
    }
  });

  /**
   * Оживление модального окна сервиса на странице сервисов инфо
   */
  let serviceInfoPopup = document.querySelector(`.popup--info`);

  if (serviceInfoPopup) {
    let serviceInfoPopupOpen = document.querySelectorAll(`.services-info__card-button`);
    let serviceInfoPopupOpenLink = document.querySelectorAll(`.services-info__card-top`);
    let serviceInfoPopupClose = serviceInfoPopup.querySelectorAll(`[class$="__close"]`);

    for (let i = 0; i < serviceInfoPopupOpen.length; i++) {
      serviceInfoPopupOpen[i].addEventListener(`click`, (evt) => {
        evt.preventDefault();
        showPopup(serviceInfoPopup, `popup--shown`);
      });

      serviceInfoPopupOpenLink[i].addEventListener(`click`, (evt) => {
        evt.preventDefault();
        showPopup(serviceInfoPopup, `popup--shown`);
      });
    }

    for (let i = 0; i < serviceInfoPopupClose.length; i++) {
      serviceInfoPopupClose[i].addEventListener(`click`, (evt) => {
        evt.preventDefault();
        closePopup(serviceInfoPopup, `popup--shown`);
      });
    }
  }

  /**
   * Оживление панели поиска для мобильных на странице сервисов инфо
   */
  let serviceInfoSearchPanel = document.querySelector(`.services-info__search-wrapper`);
  let serviceInfoSearchShowBtn = document.querySelector(`.services-info__search-show`);

  if (serviceInfoSearchPanel) {
    serviceInfoSearchShowBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      showPopup(serviceInfoSearchPanel, `services-info__search-wrapper--shown`);
    });

    overlay.addEventListener(`click`, () => {
      closePopup(serviceInfoSearchPanel, `services-info__search-wrapper--shown`);
    });
  }

  /**
   * Оживление модального окна артиста
   */
  let artistCards = document.querySelectorAll(`.artists__card`);

  if (artistCards.length) {
    let artistPopup = document.querySelector(`.popup--artist`);
    let artistPopupClose = artistPopup.querySelector(`.popup__close`);
    let artistPopupImageNodes = artistPopup.querySelector(`.artist__image picture`).childNodes;
    let artistPopupName = artistPopup.querySelector(`.artist__name`);

    for (let i = 0; i < artistCards.length; i++) {
      artistCards[i].addEventListener(`click`, (evt) => {
        evt.preventDefault();

        // Подстановка соответствующих значений карточки в попап
        let artistCardImageNumber = artistCards[i].firstChild.firstChild.srcset.slice(17, 19);

        artistPopupImageNodes[0].srcset = `img/artist_image-${artistCardImageNumber}-4k@1x.jpg 1x, img/artist_image-${artistCardImageNumber}-4k@2x.jpg 2x`;
        artistPopupImageNodes[1].srcset = `img/artist_image-${artistCardImageNumber}@1x.jpg 1x, img/artist_image-${artistCardImageNumber}@2x.jpg 2x`;
        artistPopupImageNodes[2].src = `img/artist_image-${artistCardImageNumber}@1x.jpg`;
        artistPopupImageNodes[2].alt = artistCards[i].lastChild.textContent;

        artistPopupName.textContent = artistCards[i].lastChild.textContent;

        showPopup(artistPopup, `popup--shown`);
      });
    }

    artistPopupClose.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      closePopup(artistPopup, `popup--shown`);
    });
  }

  /**
   * Оживление FAQ на внутренней странице
   */
  let faqQuestions = document.querySelectorAll(`.faq__qa-question`);
  let faqAnswers = document.querySelectorAll(`.faq__qa-answer`);

  for (let i = 0; i < faqQuestions.length; i++) {
    faqQuestions[i].addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (faqQuestions[i].parentNode.classList.contains(`faq__qa-item--active`)) {
        faqQuestions[i].parentNode.classList.remove(`faq__qa-item--active`);
        removeAnimationClassShown(faqAnswers[i], `faq__qa-answer--active`);
      } else {
        faqQuestions[i].parentNode.classList.add(`faq__qa-item--active`);
        faqAnswers[i].classList.add(`faq__qa-answer--active`);
      }
    });
  }
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
let phoneInputs = document.querySelectorAll(`.partnership__form-field [type=tel]`);

if (phoneInputs.length) {
  for (let i = 0; i < phoneInputs.length; i++) {
    IMask(phoneInputs[i], {
      mask: `+{7} (000)000-00-00`,
      lazy: false
    });
  }
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

  if (document.body.classList.contains(`page--inner`) || (document.body.classList.contains(`page--index`) && window.matchMedia(`(max-width: 1199px)`).matches)) {
    document.body.style.top = `-${window.scrollY}px`;
    document.body.classList.add(`page--block`);
  }
}

/**
 * Закрытие модального окна
 */
function closePopup(el, cls) {
  removeAnimationClassShown(el, cls);
  overlay.classList.remove(`overlay--shown`);

  if (document.body.classList.contains(`page--inner`) || (document.body.classList.contains(`page--index`) && window.matchMedia(`(max-width: 1199px)`).matches)) {
    let scrollY = document.body.style.top;

    document.body.style.removeProperty(`top`);
    document.body.classList.remove(`page--block`);

    window.scrollTo(0, parseInt(scrollY || `0`, 10) * -1);
  }
}

/**
 * Сброс CSS-анимации
 */
function resetCSSAnimation(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}
