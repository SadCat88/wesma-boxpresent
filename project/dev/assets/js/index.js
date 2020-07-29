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

jQuery.noConflict();
jQuery(document).ready(function ($) {});
