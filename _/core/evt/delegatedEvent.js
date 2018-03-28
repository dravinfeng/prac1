/**
 * use for mobile web delegatedEvent
* @author xinglong.feng
 */
$Import('core.evt.eventUtil');
$Import('core.evt.fixEvent');
$Import('core.obj.isEmpty');
$Import('core.json.queryToJson');
$Import('core.arr.indexOf');
STK.register('core.evt.delegatedEvent', function(){
	var eventUtil=STK.core.evt.eventUtil;
	var indexOf=STK.core.arr.indexOf;
	var actEls=[],actElsEvtList=[];

	return function(actEl){
		var that={},evtList;
		if(!actEl){return};
		var idx=indexOf(actEl,actEls);
		if(idx==-1){
			actEls.push(actEl);
			idx=actEls.length-1;
			actElsEvtList[idx]={};
		}
		evtList=actElsEvtList[idx];
		
		var bindEvent = function(e){
			var evt = STK.core.evt.fixEvent(e);
			var el = evt.target;
			var type = e.type;

			var checkBuble = function(){
				if(evtList[type] && evtList[type][actionType]){
					return evtList[type][actionType]({
						'evt' : evt,
						'el' : el,
						'box' : actEl,
						'data' : STK.core.json.queryToJson(el.getAttribute('action-data') || '',1)
					});
				}else{
					return true;
				}
			};
			var actionType = null;
			while(el && el !== actEl){
				actionType = el.getAttribute('action-type');
				if(actionType && checkBuble() === false){
					break;
				}
				el = el.parentNode;
			}

		};
		that.add = function(funcName, evtType, process){
			if(!evtList[evtType]){
				evtList[evtType] = {};
				eventUtil.addEvent(actEl, evtType, bindEvent);
			}
			var ns = evtList[evtType];
			ns[funcName] = process;
		};
		that.remove = function(funcName, evtType){
			if(evtList[evtType]){
				delete evtList[evtType][funcName];
				if(STK.core.obj.isEmpty(evtList[evtType])){
					delete evtList[evtType];
					eventUtil.removeEvent(actEl, evtType, bindEvent);
				}
			}
		};
		that.destroy = function(){
			if(actEl){
				evtList=actElsEvtList[indexOf(actEl,actEls)];
				for(k in evtList){
					for(l in evtList[k]){
						delete evtList[k][l];
					}
					delete evtList[k];
					eventUtil.removeEvent(actEl, k, bindEvent);
				}
				return;
			}
			for(var i in actElsEvtList){
				evtList=actElsEvtList[i];
				for(k in evtList){
					for(l in evtList[k]){
						delete evtList[k][l];
					}
					delete evtList[k];
					eventUtil.removeEvent(actEl, k, bindEvent);
				}
			}
		};
		return that;
	}

});
