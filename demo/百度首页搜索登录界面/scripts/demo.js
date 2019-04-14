var wrapper = document.getElementById('wrapper');
var logInBox = document.getElementById('logInBox');
var closeBtn = document.getElementsByClassName('close')[0];
var bg = document.getElementById('bg');
function logIn() {
    // var input0 = document.getElementsByTagName('tagName')[0];

    $('.logIn').click(function () {

        wrapper.style.display = 'block';
        logInBox.style.display = 'block';
        closeBtn.style.display = 'block';
    });

    $('.close').click(function () {
        wrapper.style.display = 'none';
        logInBox.style.display = 'none';
        closeBtn.style.display = 'none';
    });
}

// $(".search").css({ "border-color": "red" });


function input() {
    $('.search').click(function () {
        clearColor();
        $('.search').css({'border':'solid 1px #317ef3'});
    });

    $('.input1').click(function () {
        clearColor();
        $('.input1').css({'border':'solid 1px #317ef3'});
    });

    $('.input2').click(function () {
        clearColor();
        $('.input2').css({'border':'solid 1px #317ef3'});
    });
}

function clearColor() {

        $('.search').css({'border':'solid 1px gray'});
        $('.input1').css({'border':'solid 1px gray'});
        $('.input2').css({'border':'solid 1px gray'});
}

$(document).not('#bg').onclick = function () {
    clearColor();
    console.log(1111);
}

logIn();
input();
