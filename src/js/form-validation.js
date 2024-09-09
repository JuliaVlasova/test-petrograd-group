"use strict";

$(document).ready(function() {
    const formName = $("#register-form-name");
    const formTel = $("#register-form-tel");
    const noName = "Поле обязательно к заполнению";
    const noTel = "Поле обязательно к заполнению";
    const wrongTel = "Номер введен неверно";
    const digitsOnlyPattern = /^\+7 \d\d\d \d\d\d-\d\d-\d\d/;

    let validateForm = function() {
        let verify = "";
        function validateName() { // Проверка имени
            if ($(formName).val() == "") {
                $(formName).parents(".register-form__group").find(".hidden").show();
                $(formName).parents(".register-form__group").find(".register-form__help-block").text(noName);
                $(formName).addClass("register-form__field_error").removeClass("register-form__field_success");
                verify = false;
                return false;
            } else {
                $(formName).parents(".register-form__group").find(".hidden").hide();
                $(formName).parents(".register-form__group").find(".register-form__help-block").text();
                $(formName).removeClass("register-form__field_error").addClass("register-form__field_success");
                verify = true;
                return true;
            }
        }

        function validateTel() {  // Проверка телефона
            let formTelValue = $(formTel).val();
            if (formTelValue == "") {
                $(formTel).parents(".register-form__group").find(".hidden").show();
                $(formTel).parents(".register-form__group").find(".register-form__help-block").text(noTel);
                $(formTel).addClass("register-form__field_error").removeClass("register-form__field_success");
                verify = false;
                return false;
            }  else if(!digitsOnlyPattern.test(formTelValue)) {
                $(formTel).parents(".register-form__group").find(".register-form__help-block").text(wrongTel);
                $(formTel).addClass("register-form__field_error").removeClass("register-form__field_success");
                verify = false;
                return false;
            } else {
                $(formTel).parents(".register-form__group").find(".hidden").hide();
                $(formTel).parents(".register-form__group").find(".register-form__help-block").text();
                $(formTel).removeClass("register-form__field_error").addClass("register-form__field_success");
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
        validateTel();
        validateCheckbox();

        // Показать сообщение об успехе
        if ($(".register-form__help-block").is(":visible") || $(".register-form-agree__checkbox").is(":checked") == false) {
           $(".success-message").removeClass("success-message_visible");
        } else {
            $(".success-message").addClass("success-message_visible");
            $(formName).val("").removeClass("register-form__field_success");
            $(formTel).val("").removeClass("register-form__field_success");
            $(".register-form-agree__checkbox").prop('checked', false);
        }
    }

    $(".register-form__field").on("input", function() {
        validateForm();
    });

    $(".register-form__button").on("click", function() {
        validateForm();
    });
});
