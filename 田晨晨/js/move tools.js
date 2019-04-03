// 创建一个可以执行简单动画的move函数
/*参数：
*	obj：要执行动画的对象
*	attr:要执行动画的样式 比如 width height top left
*	target：执行动画的目标位置
*	speed：移动的速度
*	callback：回调函数，这个函数将会在动画执行完毕之后执行
*/
function move(obj,attr,target,speed,callback){
	// 关闭上一个定时器
	clearInterval(obj.timer);
	// 判断速度的正负值 确定向左还是向右移动
	// 获取box当前位置的left值
	var oldValue=parseInt(a(obj,attr));
	if(oldValue>target){
		speed= -speed;
	}

	// 开启一个定时器
	obj.timer=setInterval(function(){
		// 获取box当前位置的left值
		oldValue=parseInt(a(obj,attr));
		// 在旧值的基础上改变left值
		var newValue=oldValue+speed;
		// 判断是否到达目标位置
		if((newValue>target&&speed>0)||(newValue<target&&speed<0)){
			newValue=target;
		}
		obj.style[attr]=newValue+"px";
		// 到达目标位置关闭定时器
		if(newValue==target){
			clearInterval(obj.timer);
			// 判断有没有回调函数，有的话运行，没有就忽略
			callback&&callback();
		}
	},30);
}
// 获取任意元素的样式
function a(boxs,name){
// getComputedStyle()是window的方法，判断浏览器中是否有getComputedStyle()方法
	if(window.getComputedStyle){
		return getComputedStyle(boxs,null)[name];
	}else{
		return boxs.currentStyle[name];
	}
}


/* 定义一个函数，用来判断一个元素中是否含有指定的class属性值
*参数： obj  要检查class属性的元素
*		cn   要检查的class值
*/
function haveClass(obj,cn){
	var reg=new RegExp("\\b"+cn+"\\b");
	// return alert(reg);
	return reg.test(obj.className)
}
/* 定义一个函数，用来向一个元素中添加指定的class属性值
*参数： obj  要添加class属性的元素
*		cn   要添加的class值
*/
function addClass(obj,cn){
	if(!haveClass(obj,cn)){
		obj.className+=(" "+cn);
	}
}
/* 定义一个函数，用来删除一个元素中指定的class属性值
*参数： obj  要删除class属性的元素
*		cn   要删除的class值
*/
function removeClass(obj,cn){
	var reg=new RegExp("\\b"+cn+"\\b");
	obj.className=obj.className.replace(reg,"");
}
/* 定义一个toggleClass函数，可以用来切换一个类（如果有这个类则删除，没有则添加）
*参数： obj  要切换class属性的元素
*		cn   要切换的class值
*/
function toggleClass(obj,cn){
	if(haveClass(obj,cn)){
		// 有，则删除
		removeClass(obj,cn);
	}else{
		// 没有则添加
		addClass(obj,cn);
	}
}