"use strict";

$(document).ready(function() {
    function getCurrentScroll() {
        return $(document).scrollTop();
    }

    // Управление положением навигации
    function handleHeader() {
        let navHeight = $("nav").outerHeight();

        $(window).scroll(function() {
            let scroll = getCurrentScroll();

            if ( scroll >= navHeight ) {
                $("nav").addClass("header_absolute");
            }
            else {
                $("nav").removeClass("header_absolute");
            }
        });
    }

    handleHeader();
});
