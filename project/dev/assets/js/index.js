'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // === mmenu
  // =============================================================================

  // === нацеливание на страницу
  Mmenu.configs.offCanvas.page.selector = '#page';

  // === когда показывать мобильную панель
  let mobileSize = 992;

  // === высота мобильной панели
  let mobilePanelHeight = getComputedStyle(
    document.querySelector('.js-component-mobile-top-panel')
  ).height;

  // === первичная инициализация мобильной шапки
  if (window.innerWidth <= mobileSize) {
    // === показать мобильную панель, если размер окна меньше нужного
    document
      .querySelector('.js-component-mobile-top-panel')
      .classList.add('--js-show');
    // === добавить для body padding-top равный высоте мобильной панели
    document.querySelector(
      '#page'
    ).style.cssText = `padding-top: ${mobilePanelHeight};`;
  } else {
    // === скрыть мобильную панель, если размер окна больше нужного
    document
      .querySelector('.js-component-mobile-top-panel')
      .classList.remove('--js-show');
    // === убрать для body padding-top равный высоте мобильной панели
    document.querySelector('#page').style.cssText = 'padding-top: 0;';
  }

  //   === прослушка изменения размеров окна
  window.addEventListener('resize', function (event) {
    if (window.innerWidth <= mobileSize) {
      document
        .querySelector('.js-component-mobile-top-panel')
        .classList.add('--js-show');
      document.querySelector(
        '#page'
      ).style.cssText = `padding-top: ${mobilePanelHeight};`;
    } else {
      document
        .querySelector('.js-component-mobile-top-panel')
        .classList.remove('--js-show');
      document.querySelector('#page').style.cssText = 'padding-top: 0;';
    }
  });

  // === запуск конструктора mmenu
  new Mmenu(
    '#mmenu',
    {
      // === options
      extensions: ['pagedim-black', 'position-left'],
      iconPanels: true,
      navbars: [
        {
          position: 'top',
          content: ['prev', 'title'],
        },
      ],
      navbar: {
        title: 'Меню',
      },
    },
    {
      // === config
      offCanvas: {
        clone: true,
      },
    }
  );

  //
  //
  // === intl-tel-input
  // ===========================================================================
  // let phoneInput = document.querySelector('.js-input-mask-phone');

  // window.intlTelInput(phoneInput, {
  //   initialCountry: 'ru',
  //   preferredCountries: ['ru', 'by', 'ua', 'kz'],
  //   onlyCountries: ['ru', 'by', 'ua', 'kz', 'en', 'gr'],
  //   separateDialCode: false,
  //   // utilsScript: '../vendors/intl-tel-input/js/utils.js',
  // });


});

//
//
// === Masonry #masonryOurWork
// =============================================================================
window.addEventListener('load', function () {
  let htmlList_01 = document.querySelector('#masonryOurWork');
  let masonryList_01 = new Masonry(htmlList_01, {
    // options
    itemSelector: '.our-work-card',
    columnWidth: '.our-work-card',
    percentPosition: true,
    horizontalOrder: true,
  });
});

//
//
//
//
//
//

jQuery(document).ready(function ($) {
  //
  //
  // === search panel #btnSearch => #searchPanel
  // ===========================================
  $('.--js-btn-search').on('click', function (event) {
    $('#searchPanel').addClass('--js-show');

    $('#searchPanel').find('.js-input-text').focus();

    $('#searchPanel')
      .find('.js-close')
      .on('click', function (event) {
        $(this).parents('#searchPanel').removeClass('--js-show').off();
      });
  });

  //
  //
  // === fast category - lazy list
  // ===========================================================================

  // === замер первичной высоты блока
  let expandBlockPrimaryHeight = $(
    '.js-component-fast-category .js-component-fast-category-list'
  ).prop('clientHeight');

  // === на какую высоту нужно растянуть
  let expandBlockScrollHeight = $(
    '.js-component-fast-category .js-component-fast-category-list'
  ).prop('scrollHeight');

  // === === прослушка клика по кнопке =>
  // переключить класс --js-show для компонента
  // растянуть / сжать блок динамичной высоты
  $('.js-component-fast-category-btn').on('click', function (event) {
    // === компонент
    let $thisRoot = $(this).parents('.js-component-fast-category');
    // === блок динамичной высоты
    let $expandBlock = $thisRoot.find('.js-component-fast-category-list');

    // === установить компоненту класс --js-show
    $thisRoot.toggleClass('--js-show');

    if ($thisRoot.hasClass('--js-show')) {
      // === растянуть блок
      $expandBlock.css('height', `${expandBlockScrollHeight}px`);
    } else {
      // === сжать блок
      $expandBlock.css('height', `${expandBlockPrimaryHeight}px`);
    }
  });

  //
  //
  // === catalog products card - lazy list
  // ===========================================================================

  // === первичная инициализация
  $(document).ready(function () {
    addDataAttrPrimaryHeight('.js-component-expand-block__list');
  });
  $(window).resize(function () {
    addDataAttrPrimaryHeight('.js-component-expand-block__list');
  });

  // === функция проставления дата атрибута data-primary-height
  // во все блоки динамичной высоты
  function addDataAttrPrimaryHeight(selector) {
    $(selector).each(function (index, element) {
      let primaryHeight = $(element).prop('clientHeight');
      $(element).attr('data-primary-height', `${primaryHeight}`);
    });
  }

  // === отслеживание клика по кнопке разворачивающей лист
  $('.js-component-expand-block__btn').on('click', function (event) {
    // === сбросить фокус с кнопки чтобы вьюпорт не ездил за кнопкой
    $(this).blur();

    // === блок динамичной высоты
    let $thisExpandBlock = $(this)
      .parents('.js-component-expand-block')
      .find('.js-component-expand-block__list');

    // === первичная высота блока с динамичной высотой
    let expandBlockPrimaryHeight = $thisExpandBlock.data('primary-height');

    // === на какую высоту нужно растянуть блок с динамичной высотой
    let expandBlockSecondaryHeight = $thisExpandBlock.prop('scrollHeight');

    // === переключить класс --js-show для блока с динамичной высотой
    $thisExpandBlock.toggleClass('--js-show');
    // === переключить класс --js-show для обертки кнопки
    $(this).parents('.w-btn-view-all').toggleClass('--js-show');

    if ($thisExpandBlock.hasClass('--js-show')) {
      // === растянуть блок
      $thisExpandBlock.css('height', `${expandBlockSecondaryHeight}px`);
    } else {
      // === сжать блок
      $thisExpandBlock.css('height', `${expandBlockPrimaryHeight}px`);
    }
  });

  //
  //
  // === footer menu - lazy list
  // ===========================================================================
  // === отслеживание клика по кнопке разворачивающей лист
  $('.w-footer-navigation-group .footer-title').on('click', function (event) {
    // === блок динамичной высоты
    let $thisExpandBlock = $(this).siblings('.js-component-expand-block__list');

    // === первичная высота блока с динамичной высотой
    let expandBlockPrimaryHeight = $thisExpandBlock.data('primary-height');

    // === на какую высоту нужно растянуть блок с динамичной высотой
    let expandBlockSecondaryHeight = $thisExpandBlock.prop('scrollHeight');

    // === переключить класс --js-show для блока с динамичной высотой
    $thisExpandBlock.toggleClass('--js-show');
    // === переключить класс --js-show для заголовка
    $(this).toggleClass('--js-show');

    if ($thisExpandBlock.hasClass('--js-show')) {
      // === растянуть блок
      $thisExpandBlock.css('height', `${expandBlockSecondaryHeight}px`);
    } else {
      // === сжать блок
      $thisExpandBlock.css('height', `${expandBlockPrimaryHeight}px`);
    }
  });

  //
  //
  // === header slider #header-slider
  // ===========================================================================
  $(document).ready(function () {
    $('#header-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      variableWidth: true,
      swipeToSlide: true,
      fade: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnDotsHover: true,
      centerMode: true,
      draggable: false,
      waitForAnimate: false,
    });
  });

  //
  //
  // === group slider #slider-group
  // ===========================================================================
  $(document).ready(function () {
    $('#slider-group').slick({
      // === Элементы
      // ============
      //
      arrows: false,
      // показывать стандартные кнопки листания
      dots: false,
      // показывать стандартные точки листания

      // === Слайды
      // ==========
      //
      slidesToShow: 4,
      // количество слайдов в карусели
      slidesToScroll: 1,
      // сколько слайдов листать за раз
      swipeToSlide: true,
      // разрешить листать мышкой и свайпом слайдер сразу к нужному слайду
      // игнорирует slidesToScroll

      // === Поведение
      // =============
      //
      infinite: true,
      // бесконечное листание
      initialSlide: 0,
      // стартовый слайд
      centerMode: false,
      // главный слайд по центру
      rows: 1,
      // количество карточек из верстки в одном слайде в ряду
      slidesPerRow: 1,
      // количество рядов в отображаемой части карусели
      verticalSwiping: false,
      // вертикальный слайдер

      // === Автолистание
      // ================
      //
      autoplay: true,
      // автолистание
      autoplaySpeed: 5000,
      // задержка автолистания
      pauseOnFocus: false,
      // пауза автолистания когда слайдер в фокусе
      pauseOnHover: true,
      // пауза автолистания когда слайдер в ховере
      pauseOnDotHover: true,
      // пауза автоличстания когда точки в ховере

      // === Свайпы
      // ==========
      //
      draggable: true,
      // перетаскивание мышью
      swipe: true,
      // свайп на мобилках
      waitForAnimate: false,
      // разрешить листать дальше не дожидаясь завершения анимации
      touchThreshold: 3,
      // длина свайпа (в частях длины слайдера)  для листания
      touchMove: true,
      // разрешить промежуточную анимацию между двумя положениями карусели

      // === Анимация
      // ============
      //
      speed: 300,
      // скорость анимации листания в мс
      easing: 'linear',
      // тип анимации на основе библиотеки jQuery
      cssEase: 'ease',
      // тип анимации из правил CSS3, можно вставить что-то типа
      // 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
      fade: false,
      // смена слайдера из одного слайда затемнением

      // Адаптивное поведение слайдов
      // ============================
      //
      variableWidth: true,
      // каждый слайд будет занимать разную ширину на основе ширины контента
      adaptiveHeight: false,
      // адаптивная высота слайдера под высоту активного слайда

      // Адаптивное поведение слайдера по брейкпоинтам
      // ============================================
      mobileFirst: false,
      // поведение брейкпоинтов на основе правила @media(min-width: 992px){ }

      // === брейкпоинты
      // responsive: [
      //   {
      //     breakpoint: 992,
      //     settings: { slidesToShow: 3 },
      //   },
      // ],
    });

    // === btn prev
    $('#slider-group-prev').click(function (event) {
      $('#slider-group').slick('slickPrev');
    }); // === btn next
    $('#slider-group-next').click(function (event) {
      $('#slider-group').slick('slickNext');
    });
  });

  //
  //
  // === slider #our-services-cards
  // ===========================================================================
  $(document).ready(function () {
    $('#our-services-cards').slick({
      // === Элементы
      // ============
      //
      arrows: false,
      // показывать стандартные кнопки листания
      dots: false,
      // показывать стандартные точки листания

      // === Слайды
      // ==========
      //
      slidesToShow: 1,
      // количество слайдов в карусели
      slidesToScroll: 1,
      // сколько слайдов листать за раз
      swipeToSlide: true,
      // разрешить листать мышкой и свайпом слайдер сразу к нужному слайду
      // игнорирует slidesToScroll

      // === Поведение
      // =============
      //
      infinite: true,
      // бесконечное листание
      initialSlide: 0,
      // стартовый слайд
      centerMode: false,
      // главный слайд по центру
      rows: 1,
      // количество карточек из верстки в одном слайде в ряду
      slidesPerRow: 1,
      // количество рядов в отображаемой части карусели
      verticalSwiping: false,
      // вертикальный слайдер

      // === Автолистание
      // ================
      //
      autoplay: true,
      // автолистание
      autoplaySpeed: 10000,
      // задержка автолистания
      pauseOnFocus: false,
      // пауза автолистания когда слайдер в фокусе
      pauseOnHover: true,
      // пауза автолистания когда слайдер в ховере
      pauseOnDotHover: true,
      // пауза автоличстания когда точки в ховере

      // === Свайпы
      // ==========
      //
      draggable: true,
      // перетаскивание мышью
      swipe: true,
      // свайп на мобилках
      waitForAnimate: false,
      // разрешить листать дальше не дожидаясь завершения анимации
      touchThreshold: 6,
      // длина свайпа (в частях длины слайдера)  для листания
      touchMove: true,
      // разрешить промежуточную анимацию между двумя положениями карусели

      // === Анимация
      // ============
      //
      speed: 300,
      // скорость анимации листания в мс
      easing: 'linear',
      // тип анимации на основе библиотеки jQuery
      cssEase: 'ease',
      // тип анимации из правил CSS3, можно вставить что-то типа
      // 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
      fade: false,
      // смена слайдера из одного слайда затемнением

      // Адаптивное поведение слайдов
      // ============================
      //
      variableWidth: true,
      // каждый слайд будет занимать разную ширину на основе ширины контента
      adaptiveHeight: false,
      // адаптивная высота слайдера под высоту активного слайда

      // Адаптивное поведение слайдера по брейкпоинтам
      // ============================================
      mobileFirst: false,
      // поведение брейкпоинтов на основе правила @media(min-width: 992px){ }

      // === брейкпоинты
      // responsive: [
      //   {
      //     breakpoint: 992,
      //     settings: { slidesToShow: 3 },
      //   },
      // ],
    });

    // === btn prev
    $('#our-services-cards-prev').click(function (event) {
      $('#our-services-cards').slick('slickPrev');
    }); // === btn next
    $('#our-services-cards-next').click(function (event) {
      $('#our-services-cards').slick('slickNext');
    });
  });

  //
  //
  // === slider #brands-list
  // ===========================================================================
  $(document).ready(function () {
    $('#brands-list').slick({
      // === Элементы
      // ============
      //
      arrows: true,
      // показывать стандартные кнопки листания
      dots: false,
      // показывать стандартные точки листания

      // === Слайды
      // ==========
      //
      slidesToShow: 4,
      // количество слайдов в карусели
      slidesToScroll: 1,
      // сколько слайдов листать за раз
      swipeToSlide: true,
      // разрешить листать мышкой и свайпом слайдер сразу к нужному слайду
      // игнорирует slidesToScroll

      // === Поведение
      // =============
      //
      infinite: true,
      // бесконечное листание
      initialSlide: 0,
      // стартовый слайд
      centerMode: false,
      // главный слайд по центру
      rows: 1,
      // количество карточек из верстки в одном слайде в ряду
      slidesPerRow: 1,
      // количество рядов в отображаемой части карусели
      verticalSwiping: false,
      // вертикальный слайдер

      // === Автолистание
      // ================
      //
      autoplay: true,
      // автолистание
      autoplaySpeed: 7000,
      // задержка автолистания
      pauseOnFocus: false,
      // пауза автолистания когда слайдер в фокусе
      pauseOnHover: true,
      // пауза автолистания когда слайдер в ховере
      pauseOnDotHover: true,
      // пауза автоличстания когда точки в ховере

      // === Свайпы
      // ==========
      //
      draggable: true,
      // перетаскивание мышью
      swipe: true,
      // свайп на мобилках
      waitForAnimate: false,
      // разрешить листать дальше не дожидаясь завершения анимации
      touchThreshold: 6,
      // длина свайпа (в частях длины слайдера)  для листания
      touchMove: true,
      // разрешить промежуточную анимацию между двумя положениями карусели

      // === Анимация
      // ============
      //
      speed: 300,
      // скорость анимации листания в мс
      easing: 'linear',
      // тип анимации на основе библиотеки jQuery
      cssEase: 'ease',
      // тип анимации из правил CSS3, можно вставить что-то типа
      // 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
      fade: false,
      // смена слайдера из одного слайда затемнением

      // Адаптивное поведение слайдов
      // ============================
      //
      variableWidth: true,
      // каждый слайд будет занимать разную ширину на основе ширины контента
      adaptiveHeight: false,
      // адаптивная высота слайдера под высоту активного слайда

      // Адаптивное поведение слайдера по брейкпоинтам
      // ============================================
      mobileFirst: false,
      // поведение брейкпоинтов на основе правила @media(min-width: 992px){ }

      // === брейкпоинты
      // responsive: [
      //   {
      //     breakpoint: 992,
      //     settings: { slidesToShow: 3 },
      //   },
      // ],
    });

    // // === btn prev
    // $('#slider-group-prev').click(function (event) {
    //   $('#slider-group').slick('slickPrev');
    // }); // === btn next
    // $('#slider-group-next').click(function (event) {
    //   $('#slider-group').slick('slickNext');
    // });
  });

  //
  //
  // === slider #promotions-list-slider
  $(document).ready(function () {
    $('#promotions-list-slider').slick({
      // === Элементы
      // ============
      //
      arrows: false,
      // показывать стандартные кнопки листания
      dots: false,
      // показывать стандартные точки листания

      // === Слайды
      // ==========
      //
      slidesToShow: 2,
      // количество слайдов в карусели
      slidesToScroll: 1,
      // сколько слайдов листать за раз
      swipeToSlide: true,
      // разрешить листать мышкой и свайпом слайдер сразу к нужному слайду
      // игнорирует slidesToScroll

      // === Поведение
      // =============
      //
      infinite: true,
      // бесконечное листание
      initialSlide: 0,
      // стартовый слайд
      centerMode: false,
      // главный слайд по центру
      rows: 1,
      // количество карточек из верстки в одном слайде в ряду
      slidesPerRow: 1,
      // количество рядов в отображаемой части карусели
      verticalSwiping: false,
      // вертикальный слайдер

      // === Автолистание
      // ================
      //
      autoplay: true,
      // автолистание
      autoplaySpeed: 8000,
      // задержка автолистания
      pauseOnFocus: false,
      // пауза автолистания когда слайдер в фокусе
      pauseOnHover: true,
      // пауза автолистания когда слайдер в ховере
      pauseOnDotHover: true,
      // пауза автоличстания когда точки в ховере

      // === Свайпы
      // ==========
      //
      draggable: true,
      // перетаскивание мышью
      swipe: true,
      // свайп на мобилках
      waitForAnimate: false,
      // разрешить листать дальше не дожидаясь завершения анимации
      touchThreshold: 6,
      // длина свайпа (в частях длины слайдера)  для листания
      touchMove: true,
      // разрешить промежуточную анимацию между двумя положениями карусели

      // === Анимация
      // ============
      //
      speed: 300,
      // скорость анимации листания в мс
      easing: 'linear',
      // тип анимации на основе библиотеки jQuery
      cssEase: 'ease',
      // тип анимации из правил CSS3, можно вставить что-то типа
      // 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
      fade: false,
      // смена слайдера из одного слайда затемнением

      // Адаптивное поведение слайдов
      // ============================
      //
      variableWidth: true,
      // каждый слайд будет занимать разную ширину на основе ширины контента
      adaptiveHeight: false,
      // адаптивная высота слайдера под высоту активного слайда

      // Адаптивное поведение слайдера по брейкпоинтам
      // ============================================
      mobileFirst: false,
      // поведение брейкпоинтов на основе правила @media(min-width: 992px){ }

      // === брейкпоинты
      // responsive: [
      //   {
      //     breakpoint: 992,
      //     settings: { slidesToShow: 3 },
      //   },
      // ],
    });

    // === btn prev
    $('#promotions-list-slider-prev').click(function (event) {
      $('#promotions-list-slider').slick('slickPrev');
    }); // === btn next
    $('#promotions-list-slider-next').click(function (event) {
      $('#promotions-list-slider').slick('slickNext');
    });
  });

  //
  //
  // === slider #blog-preview-slider
  // ===========================================================================
  $(document).ready(function () {
    $('#blog-preview-slider').slick({
      // === Элементы
      // ============
      //
      arrows: false,
      // показывать стандартные кнопки листания
      dots: false,
      // показывать стандартные точки листания

      // === Слайды
      // ==========
      //
      slidesToShow: 2,
      // количество слайдов в карусели
      slidesToScroll: 1,
      // сколько слайдов листать за раз
      swipeToSlide: true,
      // разрешить листать мышкой и свайпом слайдер сразу к нужному слайду
      // игнорирует slidesToScroll

      // === Поведение
      // =============
      //
      infinite: true,
      // бесконечное листание
      initialSlide: 0,
      // стартовый слайд
      centerMode: false,
      // главный слайд по центру
      rows: 1,
      // количество карточек из верстки в одном слайде в ряду
      slidesPerRow: 1,
      // количество рядов в отображаемой части карусели
      verticalSwiping: false,
      // вертикальный слайдер

      // === Автолистание
      // ================
      //
      autoplay: false,
      // автолистание
      autoplaySpeed: 8000,
      // задержка автолистания
      pauseOnFocus: false,
      // пауза автолистания когда слайдер в фокусе
      pauseOnHover: true,
      // пауза автолистания когда слайдер в ховере
      pauseOnDotHover: true,
      // пауза автоличстания когда точки в ховере

      // === Свайпы
      // ==========
      //
      draggable: true,
      // перетаскивание мышью
      swipe: true,
      // свайп на мобилках
      waitForAnimate: false,
      // разрешить листать дальше не дожидаясь завершения анимации
      touchThreshold: 6,
      // длина свайпа (в частях длины слайдера)  для листания
      touchMove: true,
      // разрешить промежуточную анимацию между двумя положениями карусели

      // === Анимация
      // ============
      //
      speed: 300,
      // скорость анимации листания в мс
      easing: 'linear',
      // тип анимации на основе библиотеки jQuery
      cssEase: 'ease',
      // тип анимации из правил CSS3, можно вставить что-то типа
      // 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
      fade: false,
      // смена слайдера из одного слайда затемнением

      // Адаптивное поведение слайдов
      // ============================
      //
      variableWidth: true,
      // каждый слайд будет занимать разную ширину на основе ширины контента
      adaptiveHeight: false,
      // адаптивная высота слайдера под высоту активного слайда

      // Адаптивное поведение слайдера по брейкпоинтам
      // ============================================
      mobileFirst: false,
      // поведение брейкпоинтов на основе правила @media(min-width: 992px){ }

      // === брейкпоинты
      // responsive: [
      //   {
      //     breakpoint: 992,
      //     settings: { slidesToShow: 3 },
      //   },
      // ],
    });

    // // === btn prev
    $('#blog-preview-slider-prev').click(function (event) {
      $('#blog-preview-slider').slick('slickPrev');
    }); // === btn next
    $('#blog-preview-slider-next').click(function (event) {
      $('#blog-preview-slider').slick('slickNext');
    });
  });
});
