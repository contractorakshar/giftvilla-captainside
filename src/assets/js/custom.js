(function ($) {
    "use strict";

    $(window).load(function () {
        // Animate loader off screen
        $('.se-pre-con').fadeOut('slow');
    });

    //sticky nav

     $('.navbar').sticky({topSpacing:0});

    /*
     /*
     * Custom Data Fixed
     */
    $('.beactive').addClass('active');
    $('.beactive').removeClass('beactive');



    /*============================================
     Tooltip
     ==============================================*/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** news-slider ******************/
    $('#left-banner').owlCarousel({
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsMobile: [600, 1],
        pagination: false,
        autoPlay: true
    });
    /* ---------------------------------------------------------------- */
    $('.cd-lightbox-image').magnificPopup({
        removalDelay: 300,
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        image: {
            verticalFit: true
        },
        gallery: {
            enabled: true
        }
    });
    /*============================================
     Portfolio
     ==============================================*/
    $(document).ready(function () {
        $('#portfolio-list').filterable();
    /* Flexslider
     /* ---------------------------------------------------------------- */
     $('#main_slider').flexslider({
      animation: 'slide',
      useCSS: false,
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      sync: '#main_thumbs'
  });

  $('#main_thumbs').flexslider({
      animation: 'slide',
      useCSS: false,
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      minItems: 1,
      maxItems: 15,
      itemWidth: 103.75,
      itemMargin: 10,
      asNavFor: '#main_slider'
  });


    });
    /* Flexslider
     /* ---------------------------------------------------------------- */
    $('#main_slider').flexslider({
        animation: 'slide',
        useCSS: false,
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: '#main_thumbs'
    });

    $('#main_thumbs').flexslider({
        animation: 'slide',
        useCSS: false,
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        minItems: 3,
        maxItems: 4,
        itemWidth: 103.75,
        itemMargin: 10,
        asNavFor: '#main_slider'
    });

    $(document).ready(function () {
        $('#portfolio-list').filterable();

    /*============================================
     MagnificPopup Bar
     ==============================================*/
     $('.mp-lightbox').magnificPopup({
      removalDelay: 300,
      type: 'image',
      closeOnContentClick: true,
      mainClass: 'mfp-fade',
      image: {
          verticalFit: true
      },
      gallery: {
          enabled: true
      }
  });

  $('.cd-lightbox-image').magnificPopup({
    removalDelay: 300,
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-fade',
    image: {
        verticalFit: true
    },
    gallery: {
        enabled: true
    }
});
/*============================================
 Portfolio
 ==============================================*/


      });

})(jQuery, window, document);

