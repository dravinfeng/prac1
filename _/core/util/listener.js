$Import('core.arr.inArray');
/**
 * 事件广播类
 * @id STK.core.util.listener
 * @author xinglong.feng
 * @example
 * var a=STK.core.util.listener.define('aa',['a','b','c']);
 * a.register('a',function(a,b){console.log(a,b)});
 * a.fire('a',[1, 2]);// print 1, 2
 * a.remove('a',callbk); //如果需要的话 callbk为移除之后的回调，一般不用
 */


STK.register('core.util.listener', function(){
	var listenerList={};
	var that={};
	
	that.define = function(sChannel, aEventList){
		if (listenerList[sChannel] != null) {
			throw 'listener.define: 频道已被占用';
		}
		listenerList[sChannel] = {
			'ls': aEventList
		};

		var ret = {};
		ret.register = function(sEventType, fCallBack){
			if (listenerList[sChannel] == null) {
				throw 'listener.define: 频道未定义';
			}
			if(!STK.core.arr.inArray(sEventType,listenerList[sChannel].ls)){
				throw 'listener.define: 事件列表中缺少该事件';
			}

			$(listenerList[sChannel]).bind(sEventType,fCallBack);
		};
		ret.fire = function(sEventType,oData){
			if (listenerList[sChannel] == null) {
				throw 'commonlistener.define: 频道未定义';
			}

			$(listenerList[sChannel]).trigger(sEventType, oData);
		};
		ret.remove = function(sEventType, callBack){

			$(listenerList[sChannel]).unbind(sEventType,callBack);
		};

		return ret;
	};
		return that;

});
