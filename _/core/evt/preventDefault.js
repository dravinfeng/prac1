$Import('core.evt.getEvent');
/**
 * preventDefault
 * @id STK.core.evt.preventDefault
 * @return {Event} e 
 * @author fengxinglong
 * @demo
 * STK.core.evt.preventDefault();
 */
STK.register('core.evt.preventDefault', function(){
	return function(e){
		var ev = e ? e : STK.core.evt.getEvent();
		if (STK.IE) {
			ev.returnValue = false;
		}
		else {
			ev.preventDefault();
		}
	};
});