var copy = $("#content").clone();
var contentBlurred = $("<div></div>");
$(contentBlurred).append(copy);
$(contentBlurred).addClass('content-blurred');
$("#navbar").append(contentBlurred);

var translation;
$(window).bind("scroll", function () {
    var top = $(this).scrollTop(); // 当前窗口的滚动距离
    translation = 'translate3d(0,' + (-top + 'px') + ',0)';
    $(copy).css({
        "-webkit-transform": translation,
        "-moz-transform": translation,
        "transform": translation
    });
});


