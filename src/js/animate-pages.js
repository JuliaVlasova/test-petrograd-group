"use strict";

$(document).ready(function() {
    let navHeight = $("nav").outerHeight();
    let hafWindowHeight = $(window).height() / 2;
    let section1Height = $(".section-1").outerHeight();
    let section2Height = section1Height + $(".section-2").outerHeight();
    let section3Height = section1Height + $(".section-2").outerHeight() + $(".section-3").outerHeight();
    let animateTextScroll = true;

    // Функции
    function getCurrentScroll() {  // Узнать текущий скролл
        return $(document).scrollTop();
    }
    
    function isInViewport(element) {  // Если элемент виден на экране
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

                    if (scroll >= section3Height) {
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
            if (isInViewport(itemVisible) && animateTextScroll) {
                setTimeout(function() {
                    stopAnimation(itemsToAnimate);
                }.bind(startAnimation(itemsToAnimate)), 200);
            } else if (animateTextScroll == false) {
                startAnimation(itemsToAnimate);
            } else {
                stopAnimation(itemsToAnimate);
            }
        });
    }

    // Появление видео 
    function animateVideoOnScroll() {
        let bikeVisible = $(".section-2").find(".block-with-button__image");
        let itemsToAnimate = $(".section-2").find(".animated-text__inner");
        $(bikeVisible).addClass("block-with-button__image_animated").addClass("stop-animation");

        $(window).scroll(function() {
            let scroll = getCurrentScroll();

            if (isInViewport(bikeVisible)) { 
                setTimeout(function() {
                    stopAnimation(bikeVisible);
                }.bind(startAnimation(bikeVisible)), 200);
            } else {
                stopAnimation(bikeVisible);
            }

            if(scroll > section1Height - navHeight) {
                animateTextScroll = false;
                startAnimation(itemsToAnimate);
                $(itemsToAnimate).each(function() {
                    $(this).addClass("animated-text__inner_animated_slow");
                });

                animateButton(".section-2");
            }
        });
    }

    // Появление картинки 
    function animateBikeImageOnScroll() {
        let bikeVisible = $(".section-3").find(".block-with-button__image");
        $(bikeVisible).addClass("block-with-button__image_animated").addClass("stop-animation");

        $(window).scroll(function() {
            let scroll = getCurrentScroll();

            if (isInViewport(bikeVisible)) { 
                setTimeout(function() {
                    stopAnimation(bikeVisible);
                }.bind(startAnimation(bikeVisible)), 200);
            } else {
                stopAnimation(bikeVisible);
            }

            if(scroll > section2Height - navHeight) {

                animateButton(".section-3");
            }
        });
    }

    // Opacity для кнопок на 2 и 3 скрине
    function animateButton(section) {
        let buttonInBlock = $(section).find(".block-with-button").find(".block-with-button__link");
        $(buttonInBlock).addClass("animated-opacity");
    }

    // Анимация фона на 4 скрине
    function animateBackground() {
        let lastSection = $(".section-4");

        $(window).scroll(function() {
            let scroll = getCurrentScroll();

            if(scroll > section3Height) {
                $(lastSection).addClass("animated-background");
            }
        });
    }

    handleHeader();
    animateTextOnScroll();
    animateVideoOnScroll();
    animateBikeImageOnScroll();
    animateBackground();
});
