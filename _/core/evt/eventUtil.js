/**
 * add or remove a node's event
 * @param {Node} el
 * @param {String} type
 * @param {String} handler
 * @author xinglong.feng
 * @example
 * STK.core.evt.eventUtil.addEvent($.E('id'),'click',function(e){alert(1)});
 */
STK.register('core.evt.eventUtil', function(){
	return {
		'addEvent':function(el, type, oFunc,sta) {
	        if (el.attachEvent) {
	            el.attachEvent('on' + type, oFunc);
	        }
	        else if (el.addEventListener) {
	            el.addEventListener(type, oFunc,sta || false);
	        }
	        else {
	            el['on' + type] = oFunc;
	        }
	    },
		'removeEvent':function(el, type, func, useCapture) {
	        if (el.removeEventListener) {
	            el.removeEventListener(type, func, useCapture);
	        } else if (el.detachEvent) {
	            el.detachEvent("on" + type, func);
	        } else {
	            el['on' + type] = null;
	        }
	    }
	};
});
