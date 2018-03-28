$Import('core.dom.isNode');
$Import('core.json.queryToJson');
$Import('core.evt.fixEvent');
/**
 * 通过冒泡的方式做的事件代理对象
 * @id STK.core.evt.delegatedEvent
 * @author xinglong.feng
 * @version 1.0
 * @import STK.core.dom.isNode
 * @import STK.core.dom.contains
 * @import STK.evt.addEvent
 * @import STK.evt.fixEvent
 * @param {Element} actEl
 * @param {Array} expEls
 * @return {delegatedEvent Object}
 * 	{
 * 		add : function,
 * 		remove : function
 * 		destory : function
 * 	}
 */

STK.register('core.evt.delegatedEvent',function(){

	var queryToJson=STK.core.json.queryToJson;
	return function(actEl){
		var that={},evtList = {};
		if(typeof(eventData)!='undefined'){
			var temp=handler;
			handler=eventData;
			eventData=temp;
			temp=null;
			delete temp;
		}
		if(!STK.core.dom.isNode(actEl)){
			throw 'core.evt.delegatedEvent need an Element as first Parameter';
		}
		
		that.add = function(funcName, evtType, handler){
			!evtList[evtType]&&(evtList[evtType]=[]);
			evtList[evtType].push(funcName);
			$(actEl).delegate('[action-type="'+funcName+'"]',evtType,function(evt){
				var sta;
				evt = STK.core.evt.fixEvent(evt);
				var D={
					'el':this,
					'evt':evt,
					'data':queryToJson($(this).attr('action-data')||'',1)
				};
				sta =handler && handler(D);
				if(sta===false){
					return false;
				}
			});
		};
		that.remove = function(funcName, evtType,callbk){
			!$.isArray(evtType) &&(evtType=[evtType]);
			$(actEl).undelegate('[action-type="'+funcName+'"]',evtType,callbk);
		};

		that.destroy = function(){
			for(var i in evtList){
				$.each(evtList[i],function(item,key){
					that.remove(item,key)
				});
			}
		};
		
		return that;
	};
	
});