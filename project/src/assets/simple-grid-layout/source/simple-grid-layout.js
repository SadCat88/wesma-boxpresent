'use strict';

jQuery(document).ready(function ($) {
  // === component - spoiler
  $('.component.spoiler .spoiler-header').on('click', function (event) {
    $(this).parent('.component.spoiler').toggleClass('--js-show');
  });
});





