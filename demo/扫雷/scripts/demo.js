// 1.点击开始游戏，开始游戏按钮消失，游戏区域出现，游戏计数出现

// 2.动态生成100个小格子 --> 100*div

// 3.leftclick 左键点击
    // 没有地雷 --> 显示数字（以点击小格子为中心，周围8个格子的地雷总和）
    // 有地雷 --> gameOver
    // 扩散 --> 周围8个格子没有地雷

// 4.rightclick 右键点击
    // 没有标记并且没有数字 --> 进行标记
    // 有标记 --> 取消标记
    // 已经出现数字 --> 没有效果
    // 判断标记是否正确：
        // 10个地雷都标记成功 --> victory提示成功

var startBtn = document.getElementsByClassName('startBtn')[0];
var box = document.getElementsByClassName('box')[0];
var tip = document.getElementsByClassName('tip')[0];

var gameOverAlert = document.getElementsByClassName('gameOverAlert')[0];
var victory = document.getElementsByClassName('victory')[0];
var defeat = document.getElementsByClassName('defeat')[0];
var closeBtn = document.getElementById('close');
var remainNumber = document.getElementById('remainNumber');

var bombsNumber,   // 炸弹总数
    remainBombsNumber;    // 未被标记的炸弹数

var cell;   // 小格子
var bombMap = [];   //创建bomb空数组（用0和1来标记炸弹）

bindEvent();

//绑定事件
function bindEvent() {
    // 点击开始按钮
    startBtn.addEventListener('click',function () {
        startBtn.style.display = 'none';
        box.style.display = 'block';
        tip.style.display = 'block';
        // 初始化
        init();
    },false);

    // 取消右键菜单默认事件
    box.oncontextmenu = function () {
        return false;
    }

    box.onmousedown = function (e) {  // 事件委托
        var event = e.target;      // 获取事件源对象
        if (e.which == 1) {     // 左键
            leftClick(event);
        } else if (e.which == 3) {      //右键
            rightClick(event);
        }
    }

    // 点击关闭按钮
    closeBtn.onclick = function () {
        gameOverAlert.style.display = 'none';
        tip.style.display = 'none';
        box.style.display = 'none';
        startBtn.style.display = 'block';
        box.innerHTML = '';     // 将box置空

    }
}

//初始化
function init() {
    this.bombsNumber = 40;
    this.remainBombsNumber = 40;
    tip.innerHTML = '当前剩余雷数：' + remainBombsNumber;

    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            // 生成10行*20列单元格
            var cell = document.createElement('div');
            cell.classList.add('cell');     // 给每个单元格添加类名：cell
            cell.setAttribute('id',i + "-" + j);    // 给每个单元格设置id 用（行-列）形式表示
            box.appendChild(cell);      // 将cell 插入到 box中

            bombMap.push({bomb : 0});   // 插入对象属性 bomb：0    即数组里每一位都是0
        }
    }

    cell = document.getElementsByClassName('cell');
    while (bombsNumber > 0) {

        var bombIndex = Math.floor(Math.random() * 400);     // 随机生成炸弹的序号
        if (bombMap[bombIndex].bomb === 0) {    // 判断随机数是否重复

            bombMap[bombIndex] = 1;     //关闭入口

            cell[bombIndex].classList.add('isBomb');    // 给炸弹cell添加类名isBomb

            bombsNumber --;
        }
    }

}

function leftClick(elem) {
    var isBomb = document.getElementsByClassName('isBomb');

    if (elem.classList.contains('flag')) {
        return;
    }

    if (elem && elem.classList.contains('isBomb')) {
        for (var i = 0; i < isBomb.length; i++) {
            isBomb[i].classList.add('show');
        }
        setTimeout(function () {        //延时
            gameOverAlert.style.display = 'block';
            victory.style.display = 'none';
            defeat.style.display = 'block';
        },300);

    } else {
        var aroundBombNumber = 0;   // 周围8个格子炸弹数目
        // 拆分表示id的 X坐标和Y坐标
        var positionArr = elem && elem.getAttribute('id').split('-');
        var positionX = positionArr && + positionArr[0],    // 隐式类型转换+
            positionY = positionArr && + positionArr[1];    // 字符串转换成数字

        elem && elem.classList.add('number');
        // 判断周围8个格子是否有炸弹
        for (var i = positionX - 1; i <= positionX + 1; i++) {
            for (var j = positionY - 1; j <= positionY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isBomb')) {
                    aroundBombNumber ++;
                }
            }
        }
        // 插入炸弹数
        elem && (elem.innerHTML = aroundBombNumber);
        // 扩散
        if ( !elem.classList.contains('flag')) {

            if (aroundBombNumber == 0) {
                for (var i = positionX - 1; i <= positionX + 1; i++) {
                    for (var j = positionY - 1; j <= positionY + 1; j++) {

                        var nearBox = document.getElementById(i + '-' + j);
                        if (nearBox && nearBox.length != 0) {
                            if (!nearBox.classList.contains('checked')) {
                                nearBox.classList.add('checked');   // 添加标记
                                leftClick(nearBox);
                            }

                        }
                    }
                }
            }
        }

    }
}

function rightClick(elem) {

        if (elem.classList.contains('number')) {
            return;
        }

        if (!elem.classList.contains('flag')) {
            elem.classList.add('flag');
        } else {
            elem.classList.remove('flag');
        }
        // 或者使用 toggle方法切换
        // elem.classList.toggle('flag');

        if (elem.classList.contains('flag') && elem.classList.contains('isBomb')) {
            remainBombsNumber --;
        } else if (!elem.classList.contains('flag') && elem.classList.contains('isBomb')) {
            remainBombsNumber ++    ;
        }
        tip.innerHTML = '当前剩余雷数：' + remainBombsNumber;
        if (remainBombsNumber == 0) {
            setTimeout(function () {        //延时
                gameOverAlert.style.display = 'block';
                victory.style.display = 'block';
                defeat.style.display = 'none';
            },300);
        }

}
