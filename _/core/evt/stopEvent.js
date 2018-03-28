$Import('core.evt.getEvent');
/**
 * stop event
 * @id STK.core.evt.stopEvent
 * @alias STK.core.evt.stopEvent
 * @return false
 * @author fengxinglong
 * @example
 * STK.core.evt.stopEvent();
 */
STK.register('core.evt.stopEvent', function(){
	return function(e){
		var ev = e ? e : STK.core.evt.getEvent();
		if (STK.IE) {
			ev.cancelBubble = true;
			ev.returnValue = false;
		}
		else {
			ev.preventDefault();
			ev.stopPropagation();
		}
		return false;
	};
});
