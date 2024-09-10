"use strict";

$(document).ready(function() {
    let svgLogo = $("svg#logo");
    let nav = $("nav");
    let navHeight = $(nav).outerHeight();
    let hafWindowHeight = $(window).height() / 2;
    let section2 = $(".section-2");
    let section3 = $(".section-3");
    let section1Height = $(".section-1").outerHeight();
    let section2Height = section1Height + $(section2).outerHeight();
    let animateTextScroll = true;
    let textToAnimate = $(".section-2-3").find(".animated-text__block");
    let itemsToAnimate = $(".section-2-3").find(".animated-text__inner");
    let scrollDown = false;
    let executed = false;

    // Узнать текущий скролл
    function getCurrentScroll() {  
        return $(document).scrollTop();
    }
    
    // Если элемент виден на экране
    function isInViewport(element) {  
        let elementTop = $(element).offset().top;
        let elementBottom = elementTop + $(element).outerHeight();
    
        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();
    
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    
    // Начать анимацию текста
    function startAnimation(items) { 
        $(items).each(function() {
            $(this).removeClass("stop-animation");
        });
    }
    
    // Поставить на паузу анимацию текста
    function stopAnimation(items) {
        $(items).each(function() {
            $(this).addClass("stop-animation");
        });
    }

    // Проверка направления скролла
    function checkScrollUpDown() {
        let lastScrollTop = $(document).scrollTop();
        window.addEventListener("scroll", function handleScroll() {
            const scrollTopPosition = $(document).scrollTop();
    
            if (scrollTopPosition > lastScrollTop) { //scrolling down
                scrollDown = true;
            } else if (scrollTopPosition < lastScrollTop) { //scrolling up
                scrollDown = false;
            }
            lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
        

            if(scrollDown) {
                return true;
            } else {
                return false;
            }
        });
    }

    checkScrollUpDown();

    // Управление положением навигации
    function handleHeader() {
        $(window).scroll(function() {
            let scroll = getCurrentScroll();

            if (scroll >= navHeight) {
                $(nav).addClass("header_absolute");

                if (scroll >= section1Height) {
                    $(nav).removeClass("header_absolute header_dark").addClass("animate-down header_light");
                    $(svgLogo).addClass("light");

                    if (scroll >= section2Height) {
                        $(nav).addClass("header_absolute header_dark").removeClass("header_light");
                        $(svgLogo).removeClass("light");
                    } else {
                        $(nav).removeClass("header_absolute header_dark").addClass("header_light");
                        $(svgLogo).addClass("light");
                    }
                } else {
                    $(nav).addClass("header_absolute header_dark").removeClass("animate-down header_light");
                    $(svgLogo).removeClass("light");
                }
            } else {
                $(nav).removeClass("header_absolute");
                $(svgLogo).removeClass("light");
            }
        });
    }

    // Aнимация текста на 2 скрине 
    function animateTextOnScroll() {
        let itemVisible = $(".section-2-3").find(".animated-text");
        
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

    // События на 2-3 скрине
    function animateVideoOnScroll() {
        let bikeVisible = $(".section-2").find(".block-with-button__image");
        $(bikeVisible).addClass("block-with-button__image_animated").addClass("stop-animation");
        let scrollSum = 0;

        $(window).scroll(function() {
            let scroll = getCurrentScroll();
            
            if (isInViewport(bikeVisible)) { 
                setTimeout(function() {
                    stopAnimation(bikeVisible);
                }.bind(startAnimation(bikeVisible)), 200);
            } else {
                stopAnimation(bikeVisible);
            }

            if(scroll >= section1Height - hafWindowHeight) {
                animateTextScroll = false;
                startAnimation(itemsToAnimate);
                animateTextSlow();
                appearButton(".section-2");

                if(scroll > section1Height + 10 && scroll < section2Height) {
                    if(scrollDown) {
                        showBikeImage();
                        scrollSum += 1;

                        let scrollToGetNextScreen = (function() {
                            return function() {
                                if (!executed) {
                                    executed = true;
                                    $('html, body').animate({ scrollTop: section2Height }, 0);
                                    
                                }
                            };
                        })();

                        if(scrollSum > 10) {
                            scrollToGetNextScreen();              
                        }
                    } else {
                        showBikeVideo();
                    }   
                } else if(scroll >= section2Height) {
                    showBikeImage();
                }
            } 
        });
    }

    // Показать картинку велосипеда 
    function showBikeImage() {
        $(section2).addClass("section-2_animated").removeClass("section-2_animated-reverse");
        $(section3).addClass("section-3_animated").removeClass("section-3_animated-reverse");
        disappearButton(".section-2");
        appearButton(".section-3");
        animateBikeImage();
        animateTextFast();
        changeText("велосипед");
    }

    // Показать видео велосипеда
    function showBikeVideo() {
        $(section2).removeClass("section-2_animated").addClass("section-2_animated-reverse");
        $(section3).removeClass("section-3_animated").addClass("section-3_animated-reverse");
        disappearButton(".section-3");
        appearButton(".section-2");
        animateBikeVideo();
        animateTextSlow();
        changeText("видео");
    }

    // Быстрая анимация текста
    function animateTextFast() {
        $(itemsToAnimate).each(function() {
            $(this).removeClass("animated-text__inner_animated_slow").addClass("animated-text__inner_animated_fast");
        });
    }

    // Медленная анимация текста
    function animateTextSlow() {
        $(itemsToAnimate).each(function() {
            $(this).addClass("animated-text__inner_animated_slow").removeClass("animated-text__inner_animated_fast");
        });
    }

    // Замена текста
    function changeText(text) {
        $(textToAnimate).each(function() {
            $(this).text(text);
        });
    }

    // Анимация видео на 2 скрине
    function animateBikeVideo() {
        let bikeVisible = $(".section-2").find(".block-with-button__image");
        $(bikeVisible).addClass("block-with-button__image_animated");
    }

    // Анимация картинки на 3 скрине
    function animateBikeImage() {
        let bikeVisible = $(".section-3").find(".block-with-button__image");
        $(bikeVisible).addClass("block-with-button__image_animated");
    }

    // Исчезание для кнопок на 2 и 3 скрине
    function disappearButton(section) {
        let buttonInBlock = $(section).find(".block-with-button").find(".block-with-button__link");
        $(buttonInBlock).removeClass("animated-appear").addClass("animated-disappear");
    }

    // Появление для кнопок на 2 и 3 скрине
    function appearButton(section) {
        let buttonInBlock = $(section).find(".block-with-button").find(".block-with-button__link");
        $(buttonInBlock).removeClass("animated-disappear").addClass("animated-appear");
    }

    // Aнимация текста на 3 скрине 
    function animateText() {
        let itemsToAnimate = $(".section-3").find(".animated-text__inner");
        
        $(itemsToAnimate).each(function() {
            $(this).addClass("animated-text__inner_animated_fast");
        });
    }

    // Анимация фона на 4 скрине
    function animateBackground() {
        let lastSection = $(".section-4");

        $(window).scroll(function() {
            let scroll = getCurrentScroll();

            if(scroll >= section2Height) {
                $(lastSection).addClass("animated-background");
            }
        });
    }

    // Если видео не видно на GitHub
    if(window.location.href.indexOf('github') > -1) {
        $(".video-text-github").show();
    }

    handleHeader();
    animateTextOnScroll();
    animateVideoOnScroll();
    animateText();
    animateBackground();
});
