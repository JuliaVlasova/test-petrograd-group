"use strict";

$(document).ready(function() {
    let navHeight = $("nav").outerHeight();
    let section1Height = $(".section-1").outerHeight();
    let sectionsHeight = section1Height + $(".section-2").outerHeight() + $(".section-3").outerHeight();

    // Функции
    function getCurrentScroll() {
        return $(document).scrollTop();
    }
    
    function isInViewport(element) {
        let elementTop = $(element).offset().top;
        let elementBottom = elementTop + $(element).outerHeight();
    
        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();
    
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    
    function startAnimation(items) {
        $(items).each(function() {
            $(this).removeClass("stop-animation");
        });
    }
    
    function stopAnimation(items) {
        $(items).each(function() {
            $(this).addClass("stop-animation");
        });
    }
    // Функции END

    // Управление положением навигации
    function handleHeader() {
        $(window).scroll(function() {
            let scroll = getCurrentScroll();

            if (scroll >= navHeight) {
                $("nav").addClass("header_absolute");

                if (scroll >= section1Height) {
                    $("nav").removeClass("header_absolute header_dark").addClass("animate-down header_light");
                    $("svg#logo").addClass("light");

                    if (scroll >= sectionsHeight) {
                        $("nav").addClass("header_absolute header_dark").removeClass("header_light");
                        $("svg#logo").removeClass("light");
                    } else {
                        $("nav").removeClass("header_absolute header_dark").addClass("header_light");
                        $("svg#logo").addClass("light");
                    }
                } else {
                    $("nav").addClass("header_absolute header_dark").removeClass("animate-down header_light");
                    $("svg#logo").removeClass("light");
                }
            } else {
                $("nav").removeClass("header_absolute");
                $("svg #logo").removeClass("light");
            }
        });
    }

    // Aнимация текста на 2 скрине 
    function animateTextOnScroll() {
        let itemVisible = $(".section-2").find(".animated-text");
        let itemsToAnimate = $(".section-2").find(".animated-text__inner");
        
        $(itemsToAnimate).each(function() {
            $(this).addClass("animated-text__inner_animated").addClass("stop-animation");
        });

        $(window).scroll(function() {
            if (isInViewport(itemVisible)) {
                setTimeout(function() {
                    stopAnimation(itemsToAnimate);
                }.bind(startAnimation(itemsToAnimate)), 200);
            } else {
                stopAnimation(itemsToAnimate);
            }
        });
    }

    // Появление видео
    function animateVideoOnScroll() {
        let bikeVisible = $(".section-2").find(".block-with-button");
        $(bikeVisible).addClass("block-with-button_animated").addClass("stop-animation");

        $(window).scroll(function() {
            if (isInViewport(bikeVisible)) { 
                setTimeout(function() {
                    stopAnimation(bikeVisible);
                }.bind(startAnimation(bikeVisible)), 200);
            } else {
                stopAnimation(bikeVisible);
            }
        });
    }

    handleHeader();
    animateTextOnScroll();
    animateVideoOnScroll();
});
