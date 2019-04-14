var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var value;
var bgImg = document.getElementById('imgBox');
var body = document.getElementsByTagName('body')[0];

for (var i = 65; i <= 122; i++) {
    if (i > 90 && i < 97) {
        continue;
    }
    // 将Unicode ---> 英文字母 再push进arr
    arr.push(String.fromCharCode(i));
}
// console.log(arr);

function createCanvas() {
    var canvasStr = '';

    // 画布
    var myCanvas = document.getElementById('myCanvas');
    // 画笔
    var content = myCanvas.getContext('2d');

    myCanvas.height = myCanvas.height;

    for (var i = 0; i < 6; i++) {
        // 通过随机获取数组的索引 得到数组里的某个值
        var a = arr[Math.floor(Math.random() * arr.length)];
        canvasStr += a;
    }
    // console.log(canvasStr);
    value = canvasStr;
    // console.log(value);

    // 字体水平居中
    content.textAlign = 'center';
    // 字体填充颜色
    content.fillStyle = 'red';
    // 字体属性
    content.font = 'bold 50px Arial';
    // 设置倾斜
    content.setTransform(1, 0.12, 0.2, 1, 0, 0);

    // 创建渐变
    var gradient = content.createLinearGradient(0, 0, myCanvas.width, 0);
    gradient.addColorStop("0", "yellow");
    gradient.addColorStop("0.25", "pink");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("0.75", "lawngreen");
    gradient.addColorStop("1.0", "black");
    // 用渐变填色
    content.fillStyle = gradient;
    // 填充文字
    content.fillText(canvasStr, 150, 40);

}

createCanvas();
bindEvent();

function bindEvent() {
    var myInput = document.getElementsByClassName('myInput')[0];
    var refresh = document.getElementsByClassName('refresh')[0];
    var submit = document.getElementsByClassName('submit')[0];
    var input = document.getElementsByTagName('input')[0];

    input.addEventListener('click', function() {
        input.style.border = "2px solid skyblue";
    });

    refresh.addEventListener('click', function() {
        createCanvas();
        myInput.value = null;
        // input.style.border = null;

        // 设置背景
        var num = Math.floor(Math.random() * 5 + 1);
        // console.log(a);
        bgImg.style.background = "url(img/" + num + ".jpg)";
    });

    submit.addEventListener('click', function(e) {
        e.preventDefault();
        showResult();
        // input.style.border = null;
    });

    // 绑定回车按键
    body.onkeydown = function () {
        if (event.keyCode == 13) {
            showResult();   
        }
    }

    // 绑定input框 失去焦点事件
    myInput.onblur = function () {
        myInput.style.border = '2px solid gray';
    }

}

function showResult() {
    var myInput = document.getElementsByClassName('myInput')[0];
    var errorText = document.getElementsByClassName('errorText')[0];
    var successText = document.getElementsByClassName('successText')[0];
    var test = document.getElementsByClassName('test')[0];
    var inputValue = myInput.value;
    // console.log(inputValue);
    // console.log(value);

    // 匹配大小写
    value = value.toLowerCase();
    inputValue = inputValue.toLowerCase();

    // 判断输入的内容是否正确，并显示结果
    if (inputValue == value) {
        errorText.style.display = 'none';
        successText.style.display = 'block';
        inputValue = null;
    } else {
        successText.style.display = 'none';
        errorText.style.display = 'block';
        inputValue = null;
    }
}
