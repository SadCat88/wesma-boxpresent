'use strict';

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

document.addEventListener('DOMContentLoaded', function () {
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
});

jQuery(document).ready(function ($) {
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
  // === header slider
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
    });
  });

  //
  //
  // === group slider
  // ===========================================================================
  $(document).ready(function () {
    $('#slider-group').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 3,
      dots: false,
      arrows: false,
      variableWidth: false,
      swipeToSlide: true,

      responsive: [
        {
          // breakpoint: 1440,
          // settings: { slidesToShow: 3 },
        },
      ],
    });
  });
});
