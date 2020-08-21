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

    // === клик по btn-close
    $('#searchPanel')
      .find('.js-close')
      .on('click', function (event) {
        $(this).parents('#searchPanel').removeClass('--js-show').off();
      });
      
    // === клик мимо панели поиска
    event.stopPropagation();
    $(document).on('click', function (event) {
      console.log($(event.target));
      if (!$(event.target).hasClass('w-search-panel')) {
        $('#searchPanel').removeClass('--js-show').off();
      }
    });
  });

  //
  //
  //
  // ===========================================================================
  // === component - tabs-panel
  // ===========================================================================
  $('.component-tabs-panel-item__btn').on('click', function (event) {
    // === снять --js-active со всех кнопок
    $(this)
      .parents('.component-tabs-panel')
      .find('.component-tabs-panel-item__btn')
      .removeClass('--js-active');

    // === пометить кнопку классом --js-active
    $(this).addClass('--js-active');

    // === считать по какой кнопке был клик
    let dataNumTab = $(this).data('num-btn');

    // === снять со всех табов класс --js-show
    $(this)
      .parents('.component-tabs-panel')
      .find('.component-tabs-panel-body')
      .removeClass('--js-show');

    // === добавить нужному табу класс --js-show
    $(this)
      .parents('.component-tabs-panel')
      .find(
        `.w-component-tabs-panel-body .component-tabs-panel-body[data-num-tab = ${dataNumTab}]`
      )
      .addClass('--js-show');
  });

  //
  //
  // === fast category - expand list
  // ===========================================================================

  // === первичная инициализация
  $(document).ready(function () {
    addDataAttrPrimaryHeight(
      '.js-component-fast-category .js-component-fast-category-list'
    );
  });
  $(window).resize(function () {
    addDataAttrPrimaryHeight(
      '.js-component-fast-category .js-component-fast-category-list'
    );
  });

  // === === прослушка клика по кнопке =>
  // переключить класс --js-show для компонента
  // растянуть / сжать блок динамичной высоты
  $('.js-component-fast-category-btn').on('click', function (event) {
    // === компонент
    let $thisRoot = $(this).parents('.js-component-fast-category');
    // === блок динамичной высоты
    let $expandBlock = $thisRoot.find('.js-component-fast-category-list');

    // === первичная высота блока с динамичной высотой
    let expandBlockPrimaryHeight = $expandBlock.data('primary-height');

    // === на какую высоту нужно растянуть блок с динамичной высотой
    let expandBlockSecondaryHeight = $expandBlock.prop('scrollHeight');

    // === установить компоненту класс --js-show
    $thisRoot.toggleClass('--js-show');

    if ($thisRoot.hasClass('--js-show')) {
      // === растянуть блок
      $expandBlock.css('height', `${expandBlockSecondaryHeight}px`);
    } else {
      // === сжать блок
      $expandBlock.css('height', `${expandBlockPrimaryHeight}px`);
    }
  });

  //
  //
  // === catalog products card - expand list
  // ===========================================================================

  // === первичная инициализация
  $(document).ready(function () {
    addDataAttrPrimaryHeight('.js-component-expand-block__list');
  });
  $(window).resize(function () {
    addDataAttrPrimaryHeight('.js-component-expand-block__list');
  });

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
  // === footer menu - expand list
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
    $('').slick({
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

  //
  //
  //
  // ===========================================================================
  // === component - show-modal
  // ===========================================================================
  //
  // кнопка для запуска модалки
  // button.js-show-modal(data-target-modal="modal_01") Личный кабинет

  // ===  отслеживание клика по кнопке/ссылке запускающей модалку =>
  // добавить класс оверлею --js-show
  // убрать основной скролл страницы
  $('.js-show-modal').on('click', function (event) {
    event.preventDefault();

    // === считать целевое модальное окно
    let nameModal = $(this).data('target-modal');

    // === закрыть все модалки
    $('.modal-overlay').removeClass('--js-show');
    // === показать нужную модалку
    $(nameModal).addClass('--js-show');

    // === ширина скролла
    let scrollWidth = getScrollWidth();

    $('body')
      // === убрать основной скролл страницы
      .addClass('--js-scroll-hidden')
      // === добавить для body padding-right равный ширине убираемого скролла
      .css('padding-right', scrollWidth + 'px');

    // === начать отслеживание клика по оверлею любой модалки =>
    // удалить класс --js-show у оверлея
    // убить отслеживание
    // вернуть основной скролл страницы
    $('.modal-overlay').on('mousedown', function (event) {
      // === если клик именно по оверлею, то закрыть его
      if ($(event.target).hasClass('modal-overlay')) {
        $(this).removeClass('--js-show').off();
        // ==== вернуть основной скролл страницы
        $('body').removeClass('--js-scroll-hidden').css('padding-right', '0');
      }
    });

    // === начать отслеживание клика по кнопке закрытия модалки =>
    // удалить класс --js-show у оверлея
    // убить отслеживание
    // вернуть основной скролл страницы
    $('.modal-close').on('mousedown', function (event) {
      event.preventDefault();
      $('.modal-overlay').removeClass('--js-show');
      $(this).off();
      // === вернуть основной скролл страницы
      $('body').removeClass('--js-scroll-hidden').css('padding-right', '0');
    });
  });

  //
  //
  //
  // ===========================================================================
  // === component - city-menu
  // ===========================================================================
  //

  // === если модалка показывается высчитать и записать ее высоту в атрибуты
  if ($('.js-component-city-choice-menu-heading').hasClass('js-show-modal')) {
    addDataAttrPrimaryHeight('.js-component-city-choice-menu-dropdown');

    $(window).resize(function () {
      addDataAttrPrimaryHeight('.js-component-city-choice-menu-dropdown');
    });
  }

  //  === клик на название города в dropdown панели
  $('.js-component-city-choice-menu-heading').on('click', function (event) {
    // === название города
    let selectedCityName;

    // === === отслеживание клика внутри dropdown панели
    $('.js-component-city-choice-menu-dropdown').on('click', function (event) {
      // === если клик прошел по названию города
      if ($(event.target).hasClass('js-city-name')) {
        event.preventDefault();

        // === запомнить имя города
        selectedCityName = $(event.target).text();

        // === снять класс .--js-selected со всех городов в dropdown панели
        $(event.target)
          .parents('.js-component-city-choice-menu-dropdown')
          .find('.js-city-name')
          .removeClass('--js-selected');

        // === пометить выбранный город в dropdown панели классом .--js-selected
        $(event.target).addClass('--js-selected');

        // === поменять имя города в шапке
        $('.js-component-city-choice-menu-heading')
          .find('.js-city-selected')
          .text(selectedCityName);

        // ==== вернуть основной скролл страницы
        $('body').removeClass('--js-scroll-hidden').css('padding-right', '0');

        // === закрыть dropdown панель
        $(event.target).parents('.modal-overlay').removeClass('--js-show');
      }
    });

    // === === набор текста в строку поиска
    $('.js-component-city-choice-menu-dropdown .js-c-city-search').on(
      'keyup',
      function (event) {
        // === считать из атрибута высоту модалки
        let lockHeight = $('.js-component-city-choice-menu-dropdown').data(
          'primary-height'
        );

        // === прописать в модалку минимальную высоту
        $('.js-component-city-choice-menu-dropdown').css(
          'min-height',
          `${lockHeight}px`
        );

        // === карта русских букв на английских кнопках
        const map = {
          q: 'й',
          w: 'ц',
          e: 'у',
          r: 'к',
          t: 'е',
          y: 'н',
          u: 'г',
          i: 'ш',
          o: 'щ',
          p: 'з',
          '[': 'х',
          ']': 'ъ',
          a: 'ф',
          s: 'ы',
          d: 'в',
          f: 'а',
          g: 'п',
          h: 'р',
          j: 'о',
          k: 'л',
          l: 'д',
          ';': 'ж',
          "'": 'э',
          z: 'я',
          x: 'ч',
          c: 'с',
          v: 'м',
          b: 'и',
          n: 'т',
          m: 'ь',
          ',': 'б',
          '.': 'ю',
          Q: 'Й',
          W: 'Ц',
          E: 'У',
          R: 'К',
          T: 'Е',
          Y: 'Н',
          U: 'Г',
          I: 'Ш',
          O: 'Щ',
          P: 'З',
          '[': 'Х',
          ']': 'Ъ',
          A: 'Ф',
          S: 'Ы',
          D: 'В',
          F: 'А',
          G: 'П',
          H: 'Р',
          J: 'О',
          K: 'Л',
          L: 'Д',
          ';': 'Ж',
          "'": 'Э',
          Z: '?',
          X: 'ч',
          C: 'С',
          V: 'М',
          B: 'И',
          N: 'Т',
          M: 'Ь',
          ',': 'Б',
          '.': 'Ю',
          '{': 'Х',
          '}': 'Ъ',
          ':': 'Ж',
          '"': 'Э',
          '<': 'Б',
          '>': 'Ю',
        };

        // === удалить все символы кроме букв
        if (this.value.match(/[!0-9\s\-]/g))
          this.value = this.value.replace(/[!0-9\s\-]/g, '');

        // === переменная для хранения пользовательского ввода
        let inputString = $(this).val();

        // === переменная для хранения преобразованного значения, если забыли сменить язык
        let inputEnToRuString = '';

        // === цикл для сверки пользовательского ввода с картой кнопок
        for (let i = 0; i < inputString.length; i++) {
          inputEnToRuString +=
            map[inputString.charAt(i)] || inputString.charAt(i);
        }

        // === занести в инпут преобразованный ввод
        $(this).val(inputEnToRuString);

        // === преобразованный пользовательский ввод в нижнем регистре
        let inputRuSmallLetters = inputEnToRuString.toLowerCase();

        // === === если в инпуте есть разрешенные символы
        if (inputRuSmallLetters != '') {
          // === флаг
          let findCityName = false;

          // === добавить модалке класс .--js-input-not-empty
          $('.js-component-city-choice-menu-dropdown').addClass(
            '--js-input-not-empty'
          );

          // === перебор доступных городов из списка
          $('.js-component-city-choice-menu-dropdown .js-city-name').each(
            function () {
              // === город в текущей итерации
              let cityListItem = $(this).text().toLowerCase();

              // === если пользовательский ввод совпадает с городом из итерации
              if (cityListItem.indexOf(inputRuSmallLetters) == 0) {
                $(this).removeClass('--js-hide');
                findCityName = true;
              } else {
                $(this).addClass('--js-hide');
              }
            }
          );

          // === перебор заглавных букв
          $(
            '.js-component-city-choice-menu-dropdown .small-city-letter .letter'
          ).each(function () {
            // === заглавная буква в текущей итерации
            let cityListFirstLetter = $(this).text().toLowerCase();

            // === первая буква из пользовательского ввода
            let inputFirstLetter = inputRuSmallLetters.substr(0, 1);

            // === если первая буква пользовательского ввода совпадает с загланой буквой итерации
            if (cityListFirstLetter.indexOf(inputFirstLetter) == 0) {
              $(this).removeClass('--js-hide');
            } else {
              $(this).addClass('--js-hide');
            }
          });

          // === если города не найдены
          if (findCityName == false) {
            // ===  показать ошибку
            $(
              '.js-component-city-choice-menu-dropdown .city-not-found'
            ).addClass('--js-show');
            // === показать заглавные буквы
            $(
              '.js-component-city-choice-menu-dropdown .small-city-letter .letter'
            ).addClass('--js-hide');
          } else {
            // === скрыть текст ошибки
            $(
              '.js-component-city-choice-menu-dropdown .city-not-found'
            ).removeClass('--js-show');
          }
        }

        // === === иначе (если инпут пустой)
        else {
          // === показать все города
          $(
            '.js-component-city-choice-menu-dropdown .js-city-name'
          ).removeClass('--js-hide');

          // === показать заглавные буквы
          $(
            '.js-component-city-choice-menu-dropdown .small-city-letter .letter'
          ).removeClass('--js-hide');

          // === скрыть текст ошибки
          $(
            '.js-component-city-choice-menu-dropdown .city-not-found'
          ).removeClass('--js-show');

          // === убрать из модалки класс .--js-input-not-empty
          $('.js-component-city-choice-menu-dropdown').removeClass(
            '--js-input-not-empty'
          );

          // === убрать минимальную высоту модалки
          $('.js-component-city-choice-menu-dropdown').css(
            'min-height',
            'auto'
          );
        }
      }
    );
  });

  //
  //
  //
  // ===========================================================================
  // === component-input-text dynamic placeholder
  // ===========================================================================
  //

  // === отслеживание потери фокуса текстовым вводом =>
  // проверить value у input
  // добавить инпуту класс --js-val-not-empty если value заполнено
  // иначе убрать класс --js-val-not-empty
  $('.js-component-input-text .js-input').on('blur', function (event) {
    if ($(this).val() != '') {
      $(this).addClass('--js-val-not-empty');
    } else {
      $(this).removeClass('--js-val-not-empty');
    }
  });

  // ===========================================================================
  // === функции
  // ===========================================================================

  //
  //
  // === позволяет узнать ширину вертикальной полосы прокрутки
  // =============================================================================
  function getScrollWidth() {
    let windowWidth = window.innerWidth;
    // ширина окна браузера
    let viewPortWidth = document.body.offsetWidth;
    // ширина вьюпорта
    let scrollWidth = windowWidth - viewPortWidth;
    // ширина полосы прокрутки
    return scrollWidth;
  }

  //
  //
  // === функция проставления дата атрибута data-primary-height
  // во все блоки динамичной высоты
  function addDataAttrPrimaryHeight(selector) {
    $(selector).each(function (index, element) {
      let primaryHeight = $(element).prop('clientHeight');
      $(element).attr('data-primary-height', `${primaryHeight}`);
    });
  }
});
