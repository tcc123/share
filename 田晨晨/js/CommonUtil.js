/*
* 命名空间 TCC  namespace
*/
var TCC={};
// 一：接口类 Class Interface ==>实例化N多个接口
/*
*接口类需要2个参数：
*	参数1：接口的名字(srting)
*	参数2：接受方法名称的集合(数组) (array)
*/
TCC.Interface=function(name,mtds){
	// 判断接口的参数个数
	if(arguments.length!=2){
		throw new Error("this instance interface constructor argument must be 2 length!");
	}
	this.name=name;
	// 定义一个内置的空数组对象，等待接收mtds里的元素(方法名字)
	this.methods=[];
	for(var i=0;i<mtds.length;i++){
		if(typeof mtds[i] !=="string"){
			throw new Error("the Interface method name is error!");
		}
		this.methods.push(mtds[i]);
	}
}
//二：检验接口里的方法
// 如果检验通过，不做任何操作；不通过则抛出错误
// 这个方法的目的 就是检测方法的
TCC.Interface.ensureImplements=function(object){
	// 如果检测方法接受的参数小于2个 则参数传递失败！
	if(arguments.length<2){
		throw new Error("Interface.ensureImplements method constructor arguments must be >=2 !");
	}
	// 获得接口实例对象
	for(var i=1;i<arguments.length;i++){
		var instanceInterface=arguments[i];
		// 判断参数是否是接口的类型
		if(instanceInterface.constructor !==TCC.Interface){
			throw new Error("the arguments constructor not be Interface Class");
		}
		// 循环接口实例对象里面的每一个方法
		for(var j=0;j<instanceInterface.methods.length;j++){
			// 用一个临时变量 接受每一个方法的名字(注意是字符串)
			var methodName=instanceInterface.methods[j];
			// object[key] 调用方法
			if(!object[methodName]||typeof object[methodName] !=="function"){
				throw new Error("the mathod name'"+methodName+"'is not found!")
			}
		}
	}
}

// 继承的方法 extend method
// 参数： sub  子类
//	      sup  父类
TCC.extend=function(sub,sup){
	// 目的： 实现只继承父类的原型对象
	// 创建一个空函数  目的：空函数进行中转
	var F=function(){};
	// 实现空函数是原型对象和父类原型对象的转换
	F.prototype=sup.prototype;
	// 原型继承
	sub.prototype=new F();
	// 还原子类构造器
	sub.prototype.constructor=sub;
	// 保存一下父类的原型对象：一方面方便解耦，另一方面方便获得父类的原型对象
	// 自定义一个子类的静态属性 接受父类的原型对象
	sub.superClass=sup.prototype; 
	// 判断父类的原型对象的构造器
	if(sup.prototype.constructor==Object.prototype.constructor ){
		// 手动还原父类原型对象的构造器
		sup.prototype.constructor=sup;
	}
}


//单体模式  实现一个兼容各浏览器的事件绑定和取消
TCC.EventUtil={
	eventStr:function(obj,eventStr,callback){
				if(obj.addEventListener){
					obj.addEventListener(eventStr,callback,false);
				}else{  //IE
					obj.attachEvent("on"+eventStr,function(){
						callback.call(obj);
					});
				}
			},
	removeStr:function(obj,eventStr,callback){
				if(obj.removeEventListener){
					obj.removeEventListener(eventStr,callback,false);
				}else{   //IE
					obj.detachEvent("on"+eventStr,function(){
						callback.call(obj);
					});
				}
			},
};

//遍历多维数组
Array.prototype.each=function(fn){
			try{
				this.i||(this.i=0);// 计数器
				// 当数组长度大于零&&传递的参数必须是函数
				if(this.length>0&&fn.constructor==Function){
					while(this.i<this.length){
						var e=this[this.i];
						// 如果当前元素获取到了 并且当前元素是一个数组
						if(e&&e.constructor==Array){
							e.each(fn);// 直接做递归操作
						}else{
							// 这里的目的就是为了把数组的当前元素传递给fn函数 并让函数执行
							fn.call(e,e);
						}
						this.i++;
					}
					this.i=null;//垃圾回收释放内存
				}
			}catch(ex){
				// do something
			}
			return this;
		}