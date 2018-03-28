/**
 * @author xinglong.feng
 * @param {Object} e
 */
$Import('core.evt.getEvent');
STK.register('core.evt.fixEvent', function(){
	return function(e){
		e = e || STK.core.evt.getEvent();
		if (!e.target) {
			e.target = e.srcElement;
			e.pageX = e.x;
			e.pageY = e.y;
		}
		
		if(/mouseover/.test(e.type) && !e.relatedTarget){
			e.relatedTarget=e.fromElement;
		}else if(/mouseout/.test(e.type) && !e.relatedTarget){
			e.relatedTarget=e.toElement;
		}
		
		if (typeof e.layerX == 'undefined') 
			e.layerX = e.offsetX;
		if (typeof e.layerY == 'undefined') 
			e.layerY = e.offsetY;
		return e;
	};
});
