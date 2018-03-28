/**
 * 获得 滚动条 滚动距离
 * @id STK.core.util.listener
 * @author xinglong.feng
 * @example
 * var a=STK.core.util.scrollLength();
 * a=={'scrollLeft':100,'scrollTop':100};
 */


STK.register('core.util.scrollLength', function(){
	return function(){
		//TODO top的值 在 页面尚未onload之前调用，值可能为 window
		var top=window.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
		var left=window.scrollLeft || document.documentElement.scrollLeft || document.body.scrollLeft;
		return {'scrollLeft':left,'scrollTop':top};
	}

});
