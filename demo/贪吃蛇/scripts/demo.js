var content = document.getElementById('content');
var scoreDisplay = document.getElementById('score');
var defeat = document.getElementById('defeat');
var startBtn = document.getElementById('startBtn');
var againBtn = document.getElementById('againBtn');
var snakeMove;
var lock = false;

init();

function init() {   // 初始函数
    //分数
    this.score = 0;
    // 地图
    this.mapWidth = parseInt(window.getComputedStyle(content).width);
    this.mapHeight = parseInt(window.getComputedStyle(content).height);
    // console.log(this.mapWidth + " " + this.mapHeight);
    this.map = content;
    // 食物
    this.foodWidth = 20;
    this.foodHeight = 20;
    this.foodX = 0;
    this.foodY = 0;
    // 蛇
    this.snakeWidth = 20;
    this.snakeHeight = 20;
    this.snakeBody = [[3,8,'snakeHead'],[2,8,'snakeBody'],[1,8,'snakeBody']];
    // 初始方向
    this.direct = 'right';

    this.left = false;  //设置初始方向锁
    this.right = false;
    this.up = true;
    this.down = true;

    this.span = 100; // 初始速度

    //绑定事件
    bindEvents();
    // startGame();
}

function bindEvents() {     // 绑定事件
    //绑定按下键盘事件
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setDirection(code);     // 设置方向
    }
    //绑定开始游戏按钮事件
    startBtn.addEventListener('click',function () {
        start();
    },false);
}

function start() {    // 开始和暂停
        if (lock == false) {
            startGame();
            lock = true;
        }
}

//开始游戏
function startGame() {
    food();
    snake();

    this.snakeMove = setInterval(function() {
        move();
    },span);
}

function food() {
    var food = document.createElement('div');   // 新建一个div元素

    food.style.width = this.foodWidth + 'px';
    food.style.height = this.foodHeight + 'px';
    food.style.position = 'absolute';
    // 取随机坐标（网格宽高为20）
    this.foodX = Math.floor(Math.random() * (this.mapWidth/20));
    this.foodY = Math.floor(Math.random() * (this.mapHeight/20));   // Math.floor是向下取整方法
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    // console.log(food.style.left + " " + food.style.top);

    this.map.appendChild(food).classList.add('food');    // 在map中插入子元素food，并设置类名
}   // 食物

function snake() {      //蛇
    // 根据蛇的长度，循环添加元素
    for (var i = 0; i < this.snakeBody.length; i ++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeWidth + 'px';
        snake.style.height = this.snakeHeight + 'px';
        snake.style.position = 'absolute';

        snake.style.left = this.snakeBody[i][0] * 20 + 'px';    // 蛇的左边距由三维数组 第0位决定
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';    // 蛇的上边距由三维数组 第1位决定

        snake.classList.add(this.snakeBody[i][2]);  // 添加三维数组 第2位 为snake的类名
        this.map.appendChild(snake).classList.add('snake'); // map中插入子元素，添加共同类名'snake'

        // 改变方向需要旋转图像
        switch (this.direct) {
            case 'down' :
                break;
            case 'right' : snake.style.transform = 'rotate(270deg)';
                break;
            case 'up' : snake.style.transform = 'rotate(180deg)';
                break;
            case 'left' : snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }

        eat();

        death();
    }
}

function move() {   // 运动一次
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }

    switch (this.direct) {
        //改变运动方向只需改变蛇头位置
        case 'right' : this.snakeBody[0][0] += 1;   //往右，上下不动，X轴位置+1
            break;
        case 'left' : this.snakeBody[0][0] -= 1;    //往右，上下不动，X轴位置-1
            break;
        case 'up' : this.snakeBody[0][1] -= 1;      //往上，左右不动，Y轴位置-1
            break;
        case 'down' : this.snakeBody[0][1] += 1;    //往下，左右不动，Y轴位置+1
            break;
        default:
            break;
    }

    removeClass('snake');   //删除之前的蛇
    snake();    //重新生成一条蛇
}

// 封装移除class类函数
function removeClass(className) {
    var elem = document.getElementsByClassName(className);
    while (elem.length > 0) {
        elem[0].parentNode.removeChild(elem[0]);    //找到父节点，然后删除它的子节点，相当于自我销毁
    }
}

function eat() {
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        //蛇身长变化
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];   //蛇最后一段的X轴坐标
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];   //蛇最后一段的Y轴坐标
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX + 1,snakeEndY,'snakeBody']);//添加值
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1,snakeEndY,'snakeBody']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX,snakeEndY - 1,'snakeBody']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX,snakeEndY + 1,'snakeBody']);
                break;
            default:
                break;
        }
        //分数变化
        this.score += 1;
        scoreDisplay.innerHTML = this.score;
        //食物变化
        removeClass('food');
        food();
    }
}   // 吃

function setDirection(code) {   // 设置键盘方向
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                //设置方向锁
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                //设置方向锁
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                //设置方向锁
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                //设置方向锁
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

function death() {  //蛇死亡
    // 判断蛇头的 X坐标和 Y坐标是否超出map边界，死亡
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapWidth/20 || this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapHeight/20) {
        gameOver();
    }
    // 判断蛇头碰到蛇身体，死亡
    // var snakeHeadX = this.snakeBody[0][0];  //蛇头X坐标
    // var snakeHeadY = this.snakeBody[0][1];  //蛇头Y坐标
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (this.snakeBody[0][0] == this.snakeBody[i][0] && this.snakeBody[0][1] == this.snakeBody[i][1]) {
            gameOver();
        }
    }
}

function gameOver() {   //游戏结束
    defeat.style.display = 'block';
    startBtn.style.display = 'none';
    removeClass('food');
    clearInterval(snakeMove);
    reloadGame();
}

function reloadGame() {
    //绑定重新开始游戏事件
    againBtn.onclick = function() {
        defeat.style.display = 'none';
        init();
        startGame();
    }
}
