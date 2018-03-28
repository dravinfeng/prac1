/**
 * Get event object
 * @id STK.core.evt.getEvent
 * @alias STK.core.evt.getEvent
 * @return {Event} e
 * @author xinglong.feng
 * @example
 * var ev = STK.core.evt.getEvent();
 */
STK.register('core.evt.getEvent', function(){
	return function(){
		if (STK.IE) {
			return window.event;
		}
		else {
			if (window.event){
				return window.event;
			}
			var o = arguments.callee.caller;
			var e;
			var n = 0;
			while (o != null && n < 40) {
				e = o.arguments[0];
				if (e && (e.constructor == Event || e.constructor == MouseEvent || e.constructor == KeyboardEvent)) {
					return e;
				}
				n++;
				o = o.caller;
			}
			return e;
		}
	};
});
