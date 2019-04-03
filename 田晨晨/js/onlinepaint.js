var canvas=document.getElementById("canvas");
var cxt=canvas.getContext("2d");
// 获取工具按钮的标签
	// 获取画笔标签
	var pen=document.getElementById("tls_pen");
	// 获取橡皮擦标签
	var eraser=document.getElementById("tls_eraser");
	// 获取油漆桶标签
	var paint=document.getElementById("tls_paint");
	// 获取吸管标签
	var atraw=document.getElementById("tls_atraw");
	// 获取文本标签
	var text=document.getElementById("tls_text");
	// 获取放大镜标签
	var magnifier=document.getElementById("tls_magnifier");
// 获取形状按钮
	var line=document.getElementById("shape_line");
	var circle1=document.getElementById("shape_circle1");
	var square1=document.getElementById("shape_square1");
	var triangle=document.getElementById("shape_triangle");
	var circle2=document.getElementById("shape_circle2");
	var square2=document.getElementById("shape_square2");	
//把12个工具和形状标签放到一个数组中
	var actions=[pen,eraser,paint,atraw,text,magnifier,line,circle1,square1,triangle,circle2,square2];
// 获取线宽按钮
	var w1=document.getElementById("cx_1px");
	var w3=document.getElementById("cx_3px");
	var w5=document.getElementById("cx_5px");
	var w8=document.getElementById("cx_8px");
//把所有线宽放入一个数组
	var widths=[w1,w3,w5,w8];
// 获取颜色按钮
	var red=document.getElementById("red");	
	var green=document.getElementById("green");	
	var blue=document.getElementById("blue");	
	var yellow=document.getElementById("yellow");	
	var white=document.getElementById("white");	
	var black=document.getElementById("black");	
	var pink=document.getElementById("pink");	
	var purple=document.getElementById("purple");	
	var cyan=document.getElementById("cyan");	
	var orange=document.getElementById("orange");
// 把所有颜色放入一个数组
	var colors=[red,green,blue,yellow,white,black,pink,purple,cyan,orange];

// 设置初始值 默认选中画笔工具、线宽、颜色
	drawPen(0);
	setWidth(0);
	setColor(red,0);
// 设置状态函数
function setStatus(Arr,num,type){
	for(var i=0;i<Arr.length;i++){
		if(i==num){
			if(type==1){
				Arr[i].style.background="yellow";
			}else{
				Arr[i].style.border="1px solid #fff";
			}
		}else{
			if(type==1){
				Arr[i].style.background="#ccc";
			}else{
				Arr[i].style.border="";
			}
		}
	}
}
//设置图像功能函数 保存图片 清空画布
	function saveimg(){
//这个功能目前不会写
		var imgdata=canvas.toDataURL();
		var b64=imgdata.substring(22);
	}
	function clearimg(){
		cxt.clearRect(0,0,784,400);
	}
//列出所有的按钮对应的函数
	// 铅笔工具函数
	function drawPen(num){
		setStatus(actions,num,1);
		var flag=0;  //设置标志位置->检测鼠标是否按下
		canvas.onmousedown=function(event){
			event=event||window.event;
			var startX=event.pageX-this.offsetLeft;
			var startY=event.pageY-this.offsetTop;
			// alert(startX+"--"+startY);
			cxt.beginPath();
			cxt.moveTo(startX,startY);
			flag=1;
		}
		canvas.onmousemove=function(event){
			event=event||window.event;
			var endX=event.pageX-this.offsetLeft;
			var endY=event.pageY-this.offsetTop;
			// alert(endX+"--"+endY);
			//判断一下鼠标是否按下
			if(flag){
				//移动的时候设置路径并且画出来
				cxt.lineTo(endX,endY);
				cxt.stroke();
			}
		}
		canvas.onmouseup=function(){
			flag=0;
		};
		canvas.onmouseout=function(){
			flag=0;
		};
	}
	var eraserFlag=0;
	// 橡皮工具函数
	function drawEraser(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(event){
			event=event||window.event;
			var eraserX=event.pageX-this.offsetLeft;
			var eraserY=event.pageY-this.offsetTop;
			cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
			eraserFlag=1;
		}
		canvas.onmousemove=function(event){
			event=event||window.event;
			var eraserX=event.pageX-this.offsetLeft;
			var eraserY=event.pageY-this.offsetTop;
			if(eraserFlag){
				cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
			}
		}
		canvas.onmouseup=function(){
			eraserFlag=0;
		};
		canvas.onmouseout=function(){
			eraserFlag=0;
		};
	}
	// 油漆桶工具函数
	function drawPaint(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(event){
			event=event||window.event;
			cxt.fillRect(0,0,784,400);
		}
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;
	}
	// 吸管工具函数
	function drawAtraw(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(event){
			event=event||window.event;
			var atrawX=event.pageX-this.offsetLeft;
			var atrawY=event.pageY-this.offsetTop;
			var obj=cxt.getImageData(atrawX,atrawY,1,1);
			var color="rgb("+obj.data[0]+","+obj.data[1]+","+obj.data[2]+")";
			// alert(color);
			cxt.strokeStyle=color;
			cxt.fillStyle=color;
			drawPen(0);
		}
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;
	}
	// 文本工具函数
	function drawText(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(event){
			event=event||window.event;
			var textX=event.pageX-this.offsetLeft;
			var textY=event.pageY-this.offsetTop;
			var userVal=prompt("请在这里输入文字");
			if(userVal!==null){
				cxt.fillText(userVal,textX,textY);
			}
		}
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;
	}
	// 放大镜工具函数
	function drawMagnifier(num){
		setStatus(actions,num,1);
		//用户输入的放大倍数
		var scale=parseInt(prompt("请在这里输入缩放倍数[只能是整型]"));
		//把数据转换成对应的canvas画布大小
		var scaleW=784*scale/100;
		var scaleH=400*scale/100;
		//将数据设置到对应的HTML标签
		canvas.style.width=scaleW+"px";
		canvas.style.height=scaleH+"px";
	}
	// 线形状函数
	function drawLine(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(event){
			event=event||window.event;
			var startX=event.pageX-this.offsetLeft;
			var startY=event.pageY-this.offsetTop;
			cxt.beginPath();
			cxt.moveTo(startX,startY);
		}
		canvas.onmousemove=null;
		canvas.onmouseup=function(){
			event=event||window.event;
			var endX=event.pageX-this.offsetLeft;
			var endY=event.pageY-this.offsetTop;
			cxt.lineTo(endX,endY);
			cxt.closePath();
			cxt.stroke();
			
		};
		canvas.onmouseout=null;
	}
	//将变量设置为全局变量（如果的局部变量在其他函数中是没法调用的）
	var arcX=0;
	var arcY=0;
	// 圆形形状函数
	function drawCircle1(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(event){
			event=event||window.event;
			//获取圆心坐标
			arcX=event.pageX-this.offsetLeft;
			arcY=event.pageY-this.offsetTop;
		}
		canvas.onmousemove=null;
		canvas.onmouseup=function(){
			event=event||window.event;
			//获取半径
			//实际上获取的是一个坐标
			var endX=event.pageX-this.offsetLeft;
			var endY=event.pageY-this.offsetTop;
			//计算半径的距离
			var a=endX-arcX;
			var b=endY-arcY;
			var c=Math.sqrt(a*a+b*b);
			cxt.beginPath();
			cxt.arc(arcX,arcY,c,0,360,false);
			cxt.closePath();
			cxt.stroke();
			
		};
		canvas.onmouseout=null;
	}
	// 矩形形状函数
	function drawSquare1(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(event){
			event=event||window.event;
			//获取圆心坐标
			rectX=event.pageX-this.offsetLeft;
			rectY=event.pageY-this.offsetTop;
		}
		canvas.onmousemove=null;
		canvas.onmouseup=function(){
			event=event||window.event;
			//获取半径
			//实际上获取的是一个坐标
			var endX=event.pageX-this.offsetLeft;
			var endY=event.pageY-this.offsetTop;
			//计算宽高
			var a=endX-rectX;
			var b=endY-rectY;
			cxt.strokeRect(rectX,rectY,a,b);
		};
		canvas.onmouseout=null;
	}
	var triangleX=0;
	var triangleY=0;
	// 三角形形状函数
	function drawTriangle(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(event){
			event=event||window.event;
			triangleX=event.pageX-this.offsetLeft;
			triangleY=event.pageY-this.offsetTop;
			cxt.beginPath();
			cxt.moveTo(triangleX,triangleY);
		}
		canvas.onmousemove=function(){
			event=event||window.event;
			var endX=event.pageX-this.offsetLeft;
			var endY=event.pageY-this.offsetTop;
			cxt.lineTo(triangleX,endY);
			cxt.lineTo(endX,endY);
		};
		canvas.onmouseup=function(){
			cxt.closePath();
			cxt.stroke();
		}
		canvas.onmouseout=null;
	}
	// 圆形填充形状函数
	function drawCircle2(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(event){
			event=event||window.event;
			//获取圆心坐标
			arcX=event.pageX-this.offsetLeft;
			arcY=event.pageY-this.offsetTop;
		}
		canvas.onmousemove=null;
		canvas.onmouseup=function(){
			event=event||window.event;
			//获取半径
			//实际上获取的是一个坐标
			var endX=event.pageX-this.offsetLeft;
			var endY=event.pageY-this.offsetTop;
			//计算半径的距离
			var a=endX-arcX;
			var b=endY-arcY;
			var c=Math.sqrt(a*a+b*b);
			cxt.beginPath();
			cxt.arc(arcX,arcY,c,0,360,false);
			cxt.closePath();
			cxt.fill();
			
		};
		canvas.onmouseout=null;
	}
	var rectX=0;
	var rectY=0;
	// 矩形填充形状函数
	function drawSquare2(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(event){
			event=event||window.event;
			//获取圆心坐标
			rectX=event.pageX-this.offsetLeft;
			rectY=event.pageY-this.offsetTop;
		}
		canvas.onmousemove=null;
		canvas.onmouseup=function(){
			event=event||window.event;
			//获取半径
			//实际上获取的是一个坐标
			var endX=event.pageX-this.offsetLeft;
			var endY=event.pageY-this.offsetTop;
			//计算宽高
			var a=endX-rectX;
			var b=endY-rectY;
			cxt.fillRect(rectX,rectY,a,b);
		};
		canvas.onmouseout=null;
	}
	// 设置线宽函数
	function setWidth(num){
		setStatus(widths,num,1);
		switch(num){
			case 0:
			cxt.lineWidth=1;
			break;
			case 1:
			cxt.lineWidth=3;
			break;
			case 2:
			cxt.lineWidth=5;
			break;
			case 3:
			cxt.lineWidth=8;
			break;
			default:
			cxt.lineWidth=1;
		}
	}
	// 设置颜色函数
	function setColor(obj,num){
		setStatus(colors,num,0);
		//设置画笔颜色和填充颜色
		cxt.strokeStyle=obj.id;
		cxt.fillStyle=obj.id;
	}