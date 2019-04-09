
// ---------------渐入渐出轮播图---------------
$(function () {
    var i = 0;
    function large_banner() {
        // 显示和隐藏前进后退按钮
        $('#large_banner').hover(function () {
            $('.btn1,.btn2').fadeIn();
        }, function () {
            $('.btn1,.btn2').fadeOut();
        });


        init();

        $('.index>li').hover(function () {
            i = $(this).index();    // 获取当前标签的索引值
            change();
            clearInterval(timer);   // 清除定时器
        }, function () {
            init();
        });

        clickBtn1();
        clickBtn2();
        change();

    }

    // 图片切换和改变下方标签颜色
    function change() {
        $('#imgs>li').eq(i).fadeIn(500).siblings().fadeOut(500);
        $('.index>li').eq(i).addClass('current').siblings().removeClass('current');
    }

    // 初始化
    function init() {
        timer = setInterval(function () {
            i++;
            if (i == 7) {
                i = 0;
            }
            change();
        }, 3000);

    }

    function clickBtn1() {
        $('.btn1').click(function () {
            clearInterval(timer);   // 清除定时器
            if (i == 0) {
                i = 7;
            }
            i--;
            change();
            init();
        });
    }

    function clickBtn2() {
        $('.btn2').click(function () {
            clearInterval(timer);   // 清除定时器
            if (i == 6) {
                i = -1;
            }
            i++;
            change();
            init();
        });
    }

    large_banner();

});


// --------------弹出菜单------------------
function popups(button, selector) {
    $(button).hover(function () {

        $(selector).show();
        $(button).css("backgroundColor", "white");

    }, function () {
        $(button).css("backgroundColor", "#e3e4e5");
        $(selector).hide();
    });

    $(selector).hover(function () {
        $(selector).show();
        $(button).css("backgroundColor", "white");
    }, function () {
        $(selector).hide();
        $(button).css("backgroundColor", "#e3e4e5");
    });
}



// 调用弹出菜单函数
popups("#position", ".position_selector");

popups("#myJD", ".myJD_selector");

popups("#purchase", ".purchase_selector");

popups("#serve", ".serve_selector");

popups("#web_nav", ".web_selector");

// 购物车弹出
popups("#shopping_cart", ".shopping_selector");


// -----------左侧导航弹出菜单----------
function left_popups(button, selector) {
    $(button).hover(function () {

        $(selector).show();
        $(button).css("backgroundColor", "#dbdbdb");

    }, function () {
        $(button).css("backgroundColor", "white");
        $(selector).hide();
    });

    $(selector).hover(function () {
        $(selector).show();
        $(button).css("backgroundColor", "#dbdbdb");
    }, function () {
        $(selector).hide();
        $(button).css("backgroundColor", "#dbdbdb");
        $(button).css("backgroundColor", "white");
    });
}

// 左侧栏弹出选单
left_popups("#left_nav>li:nth-child(1)", ".no1");

left_popups("#left_nav>li:nth-child(2)", ".no2");

left_popups("#left_nav>li:nth-child(3)", ".no3");

left_popups("#left_nav>li:nth-child(4)", ".no4");

left_popups("#left_nav>li:nth-child(5)", ".no5");

left_popups("#left_nav>li:nth-child(6)", ".no6");

left_popups("#left_nav>li:nth-child(7)", ".no7");

left_popups("#left_nav>li:nth-child(8)", ".no8");

left_popups("#left_nav>li:nth-child(9)", ".no9");

left_popups("#left_nav>li:nth-child(10)", ".no10");

left_popups("#left_nav>li:nth-child(11)", ".no11");

left_popups("#left_nav>li:nth-child(12)", ".no12");

left_popups("#left_nav>li:nth-child(13)", ".no13");

left_popups("#left_nav>li:nth-child(14)", ".no14");

left_popups("#left_nav>li:nth-child(15)", ".no15");

left_popups("#left_nav>li:nth-child(16)", ".no16");

left_popups("#left_nav>li:nth-child(17)", ".no17");

left_popups("#left_nav>li:nth-child(18)", ".no18");

// --------------倒计时秒表--------------
watch();
function watch() {
    var hourNode = document.getElementById("hour"),
        minuteNode = document.getElementById("minute"),
        secondNode = document.getElementById("second");

    var hour = 11,
        minute = 59,
        second = 59;

    setInterval(function () {
        second --;
        if (second == 0) {
            second = 60;
            minute --;
        }

        hourNode.innerText = hour;
        minuteNode.innerText = minute;
        secondNode.innerText = second;

        console.log(hour,minute,second);
        
    }, 1000);
}

// ---------回到顶部按钮--------
var return_top = document.getElementById('return_top');
return_top.onclick = function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;    
}