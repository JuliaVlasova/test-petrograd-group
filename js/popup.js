"use strict";

let showModalOverlay = function () {
	$(".popup-overlay").fadeIn(200);
	$("body").addClass("body-noscroll");
};

let hideModalOverlay = function () {
	$("body").removeClass("body-noscroll");
	$(".popup-overlay").fadeOut(200);
};

let hideResults = function () {
	$("#results").fadeOut(500);
};

$(document).ready(function() {
    $(".popup-opener").click(function() {
        showModalOverlay();
    });

    $(".popup-window__close").click(function() {
        hideModalOverlay();
    });

    $(".results__close").click(function() {
        hideResults();
    });

});