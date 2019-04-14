var img = $('img');
var wrapper = $('.wrapper');
// 图片个数
var len = img.length;

var currentDisplay = 0;

var timer;
// 当前被点击图片的索引值
var nowIndex = 0;
// 开关
var flag = true;

function init() {
    bindEvent();
    imgShow();
}

// 铺开3D展示图
function imgShow() {
    var myLen = Math.floor(len / 2);
    // 左边图片索引
    var lNum,
    // 右边图片索引
        rNum;

    for (var i = 0; i < myLen; i++) {
        lNum = currentDisplay - i - 1;
        img.eq(lNum).css({
            transform:'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (100 - i * 100) + 'px) rotateY(30deg)'
        });

        rNum = currentDisplay + i + 1;
        // 到达最后一张跳回
        if(rNum == len) {
            rNum = 0;
        } else if(rNum > len) {
            rNum = 1;    
        }

        img.eq(rNum).css({
            transform:'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (100 - i * 100) + 'px) rotateY(-30deg)'
        });
    }
    // 移除其它img的current
    img.siblings(currentDisplay).removeClass('current');
    // 设置当前显示图片的样式
    img.eq(currentDisplay).css({
        transform: 'translateZ(250px)'
    }).addClass('current');

}

// 绑定事件
function bindEvent() {
    // 使用定时器
    interval();
    // 点击切换（即改变当前显示的索引）
    img.on('click',function () {

        if(!(flag = false && $(this).hasClass('current'))) {
            flag = false;
            nowIndex = $(this).index();
            move(nowIndex);            
        }
    }).mouseover(function () {
        // 清除定时器
        clearInterval(timer);
    }).mouseout(function () {
        // 重新设置定时器
        interval();
    });
}

// 设置定时器
function interval() {
    timer = setInterval(function () {
        play();
    },2000);
}

// 播放
function play() {

    if(nowIndex == len - 1) {
        nowIndex = 0;
    } else {
        nowIndex ++;
    }

    move(nowIndex);
}

// 图片滚动
function move(index) {
    currentDisplay = index;
    imgShow();
}

init();

