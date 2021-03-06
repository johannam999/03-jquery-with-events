'use strict';

// REVIEW: Configure an object to hold all of our functions for dynamic updates and 
//article-related event handlers.
let articleView = {};

articleView.populateFilters = function() {
  
  $('article').each(function() {
    // REVIEW: We can declare several variables at once and assign their values later 
    //when using let. Keep in mind that we cannot do this with const.
    let authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      // REVIEW: We need to take every author name from the page, and make it an option in the
      // Author filter.
      // To do so, Build an <option> DOM element that we can append to the author <select> 
      //element.
      // Start by grabbing the author's name from `this` article element, and then use that 
      //bit of text to create the option tag (in a variable named `optionTag`) that we can
      // append to the #author-filter select element.

      authorName = $(this).attr('data-author');

      optionTag = `<option value="${authorName}"> ${authorName} </option>`;

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      // REVIEW: Similar to the above, but...
      // Avoid duplicates! We don't want to append the category name if the <select>
      // already has this category as an option!
      category = $(this).attr('data-category');

      optionTag = `<option value="${category}"> ${category} </option>`;

      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  
  $('#author-filter').on('change', function() {
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we
    // are defining. "$(this)" is using jQuery to select that element (analogous to event.target that we 
    // have seen before), so we can chain jQuery methods onto it.
    
    if ( $(this).val()) {
      let $authorChoice = $(this).val();
      $('article').hide();
      $(`article[data-author='${$authorChoice}']`).fadeIn(750);

    } else {
      $('article').show();
      $('.template').hide();
    }
    $('#category-filter').val('');
    
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    
    if ( $(this).val()) {
      let $categoryChoice = $(this).val();

      $('article').hide();
      $(`article[data-category='${$categoryChoice}']`).fadeIn(750);

    } else {
      $('article').show();
      $('.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('nav li').on('click', function() {
    let $whereToGo = $(this).data('content');
    $('.tab-content').hide();
    $(`#${$whereToGo}`).show('.tab-content');
  })

  // REVIEW: Now trigger a click on the first .tab element, to set up the page.
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // REVIEW: Hide elements beyond the first 2 in any article body.
  $('.article-body *:nth-of-type(n+2)').hide();

  $('article').on('click', '.read-on', function(event) {
    event.preventDefault();
    $(this).parent().find('.article-body *:nth-of-type(n+2)').show();
    $(this).hide();
  })
}

$(document).ready(function() {
  $('.template').hide();
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
