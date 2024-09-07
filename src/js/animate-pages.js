"use strict";

$(document).ready(function() {
    function getCurrentScroll() {
        return $(document).scrollTop();
    }

    // Управление положением навигации
    function handleHeader() {
        let navHeight = $("nav").outerHeight();
        let section1Height = $(".section-1").outerHeight();
        let sectionsHeight = section1Height + $(".section-2").outerHeight() + $(".section-3").outerHeight();

        $(window).scroll(function() {
            let scroll = getCurrentScroll();

            if (scroll >= navHeight) {
                $("nav").addClass("header_absolute");

                if (scroll >= section1Height) {
                    $("nav").removeClass("header_absolute header_dark").addClass("animate-down header_light");
                    $("svg #logo").addClass("light");

                    if (scroll >= sectionsHeight) {
                        $("nav").addClass("header_absolute header_dark").removeClass("header_light");
                        $("svg #logo").removeClass("light");
                    } else {
                        $("nav").removeClass("header_absolute header_dark").addClass("header_light");
                        $("svg #logo").addClass("light");
                    }
                } else {
                    $("nav").addClass("header_absolute header_dark").removeClass("animate-down header_light");
                    $("svg #logo").removeClass("light");
                }
            } else {
                $("nav").removeClass("header_absolute");
                $("svg #logo").removeClass("light");
            }
        });
    }

    handleHeader();
});
