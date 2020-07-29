'use strict';

jQuery(document).ready(function ($) {
  // === component - spoiler
  $('.component.spoiler .spoiler-header').on('click', function (event) {
    $(this).parent('.component.spoiler').toggleClass('--js-show');
  });

  // === component - city-menu
  // ===========================================================================
  // ===========================================================================

  // === клик на шапке => показать dropdown панель
  $('.js-component-city-choice-menu-heading').on('click', function (event) {
    // === показать dropdown панель
    $('.js-component-city-choice-menu-dropdown').addClass('--js-show');

    // === === === начать отслеживать событие клика внутри dropdown панели
    // =========================================================================

    // === === === клик на название города в dropdown панели =>
    // сменить город в шапке
    // пометить выбранный город в dropdown панели классом .--js-selected

    let selectedCityName;
    // название города

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

        // === закрыть dropdown панель
        $(event.target)
          .parents('.js-component-city-choice-menu-dropdown')
          .removeClass('--js-show');
      }
    });
  });

  // === component - show-modal
  // ===========================================================================
  // ===========================================================================
  // кнопка для запуска модалки
  // button.js-show-modal(data-target-modal="modal_1") Личный кабинет

  // === === отслеживание клика по кнопке/ссылке запускающей модалку =>
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
    $('.modal-overlay').on('click', function (event) {
      event.preventDefault();

      // === если клик именно по оверлею, то закрыть его
      if ($(event.target).hasClass('modal-overlay')) {
        $(this).removeClass('--js-show').off();
      }
      // ==== вернуть основной скролл страницы
      $('body').removeClass('--js-scroll-hidden').css('padding-right', '0');
    });

    // === начать отслеживание клика по кнопке закрытия модалки =>
    // удалить класс --js-show у оверлея
    // убить отслеживание
    // вернуть основной скролл страницы
    $('.modal-close').on('click', function (event) {
      event.preventDefault();
      $('.modal-overlay').removeClass('--js-show');
      $(this).off();
      // === вернуть основной скролл страницы
      $('body').removeClass('--js-scroll-hidden').css('padding-right', '0');
    });
  });
});

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
