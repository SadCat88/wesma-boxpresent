'use strict';

jQuery(document).ready(function ($) {
  // === component - spoiler
  $('.component.spoiler .spoiler-header').on('click', function (event) {
    $(this).parent('.component.spoiler').toggleClass('--js-show');
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

  // === клик на шапке => показать dropdown панель
  $('.js-component-city-choice-menu-heading').on('click', function (event) {
    // === === === клик на название города в dropdown панели =>
    // сменить город в шапке
    // пометить выбранный город в dropdown панели классом .--js-selected

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
