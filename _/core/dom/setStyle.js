/**
 * set Elements style
 * @id STK.core.dom.setStyle
 * @param {Element} node
 * @param {String} property
 * @param {String} val
 * @author fengxinglong
 * @example
 * STK.core.dom.setStyle(STK.E('aa'),'display','none');
 */
STK.register('core.dom.setStyle', function(){
	return function(node, property, val){
		if (STK.IE) {
			switch (property) {
				case "opacity":
					node.style.filter = "alpha(opacity=" + (val * 100) + ")";
					if (!node.currentStyle || !node.currentStyle.hasLayout) {
						node.style.zoom = 1;
					}
					break;
				case "float":
					property = "styleFloat";
				default:
					node.style[property] = val;
			}
		}
		else {
			if (property == "float") {
				property = "cssFloat";
			}
			node.style[property] = val;
		}
	};
});
