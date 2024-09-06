"use strict";

window.onload = function () {
    let canvas = document.getElementById("canv-watch-1");
    let context = canvas.getContext("2d");

    context.font = "50px 'tt_commons_trialregular'";
    context.fillStyle = "#192632";

    let string = "Смотреть видео";
    let angle = Math.PI * 0.6; // in radians
    let radius = 200;

    context.translate(300, 300);
    context.rotate(-1 * angle / 2);

    for (let i = 0; i < string.length; i++) {
        context.rotate(angle / string.length);
        context.save();
        context.translate(0, -1 * radius);
        context.fillText(string[i], 0, 0);
        context.restore();
    }
};