"use strict";

let showMobileMenu = function () {
	$(".nav-buttons").addClass("nav-buttons_opened");
    $(".nav-mobile-menu-close").addClass("nav-mobile-menu-close_opened");
};

let hideMobileMenu = function () {
	$(".nav-buttons").removeClass("nav-buttons_opened");
    $(".nav-mobile-menu-close").removeClass("nav-mobile-menu-close_opened");
};

$(document).ready(function() {
    $(".nav-mobile-burger").click(function() {
        showMobileMenu();
    });

    $(".nav-mobile-menu-close").click(function() {
        hideMobileMenu();
    });
});