"use strict";

$(document).ready(function() {
    const formTel = $("#register-form-tel");
    const formSite = $("#register-form-site");
    const formName = $("#register-form-name");

    const noName = "Надо заполнить имя";
    const noSite = "Надо ввести сайт";
    const wrongSite = "Введен неверный сайт";
    const noTel = "Надо ввести номер телефона";
    const wrongTel = "Номер введен неверно";

    const digitsOnlyPattern = /^\d+$/; // /^\+7 (\d\d\d) \d\d\d-\d\d-\d\d/;
    const urlPattern = new RegExp('^(https?:\\/\\/)?'   + // проверка протокола
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'  + // проверка имени домена
        '((\\d{1,3}\\.){3}\\d{1,3}))'                       + // проверка ip адреса 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'                   + // проверка порта и пути
        '(\\?[;&a-z\\d%_.~+=-]*)?'                          + // проверка параметров запроса
        '(\\#[-a-z\\d_]*)?$','i');                            // проверка хэша


    let validateForm = function() {
        let verify = "";
        function validateName() { // Проверка имени
            if ($(formName).val() == "") {
                $(formName).parents(".register-form__group").find(".hidden").show();
                $(formName).parents(".register-form__group").find(".register-form__help-block").text(noName);
                verify = false;
                return false;
            } else {
                $(formName).parents(".register-form__group").find(".hidden").hide();
                $(formName).parents(".register-form__group").find(".register-form__help-block").text();
                verify = true;
                return true;
            }
        }

        
        function validateSite() { // Проверка сайта
            let formSiteValue = $(formSite).val();
            if (formSiteValue == "") {
                $(formSite).parents(".register-form__group").find(".hidden").show();
                $(formSite).parents(".register-form__group").find(".register-form__help-block").text(noSite);
                verify = false;
                return false;
            } else if(!urlPattern.test(formSiteValue)) {
                $(formSite).parents(".register-form__group").find(".register-form__help-block").text(wrongSite);
                verify = false;
                return false;
            } else {
                $(formSite).parents(".register-form__group").find(".hidden").hide();
                $(formSite).parents(".register-form__group").find(".register-form__help-block").text();
                verify = true;
                return true;
            }
        }

        function validateTel() {  // Проверка телефона
            let formTelValue = $(formTel).val();
            if (formTelValue == "") {
                $(formTel).parents(".register-form__group").find(".hidden").show();
                $(formTel).parents(".register-form__group").find(".register-form__help-block").text(noTel);
                verify = false;
                return false;
            }  else if(!digitsOnlyPattern.test(formTelValue)) {
                $(formTel).parents(".register-form__group").find(".register-form__help-block").text(wrongTel);
                verify = false;
                return false;
            } else {
                $(formTel).parents(".register-form__group").find(".hidden").hide();
                $(formTel).parents(".register-form__group").find(".register-form__help-block").text();
                verify = true;
                return true;
            }
        }

        function validateCheckbox() {  // Проверка чекбокса и подсветка текста при ошибке
            if (!$('.register-form-agree__checkbox').is(":checked")) {
                $(".register-form-agree__text").each(function() {
                    $(this).addClass("register-form-agree__text_animated");
                    setTimeout (function() {
                        $(this).removeClass('register-form-agree__text_animated');
                    }.bind(this), 2000);
                });

                verify = false;
                return false;
            } else {
                $(".register-form-agree__text").removeClass("register-form-agree__text_animated");
                verify = true;
                return true;
            }
        }

        validateName();
        validateSite();
        validateTel();
        validateCheckbox();

        if ($(".register-form__help-block").is(":visible") || $('.register-form-agree__checkbox').is(":checked") == false) {
            $(".register-form__button").addClass("register-form__button_disabled");
        } else {
            $(".register-form__button").removeClass("register-form__button_disabled");
        }
    }

    $(".register-form__field").on("input", function() {
        validateForm();
    });

    $(".register-form-agree").click(function() {
        if ($(".register-form__help-block").is(":visible") || $(formName).val() == "" || $('.register-form-agree__checkbox').is(":checked") == false) {
            $(".register-form__button").addClass("register-form__button_disabled");
        } else {
            $(".register-form__button").removeClass("register-form__button_disabled");
        }
    });
});
