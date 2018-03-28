$Import('core.util.scrollLength');
$Import('core.dom.getBoundingClientRect');
$Import('core.dom.isNode');
/**
 * get the position of the element
 * @id STK.core.dom.getXY
 * @param {Element} node
 * @author fengxinglong
 * @example
 * STK.core.dom.getXY(STK.E('aa'));
 * return {left:111,top:111}
 */
STK.register('core.dom.getXY', function(){
	var scrollLength=STK.core.util.scrollLength;
	var getBdRect=STK.core.dom.getBoundingClientRect;
	var isNode=STK.core.dom.isNode;
	return function(node){
		if(!node||!isNode(node)){
			return false;
		}
		var scLen=scrollLength();
		var rect=getBdRect(node);
		
		return {
			left:rect.left+scLen.scrollLeft,
			top:rect.top+scLen.scrollTop
		}
	};
});
