/**
 * check whether Element A contains Element B;
 * @param {Element} parent
 * @param {Element} node
 * @return {Boolean} true/false
 * @author fengxinglong
 * @example
 * STK.core.dom.contains($.E('parent'),$.E('child')) === true;
 */
(function() {
	!window.STK && (window.STK={});
	
    window.STK.contains=function(parent, node,sta) {

        if (parent === node) {
            return false;

        } else if (parent.compareDocumentPosition) {
			return ((parent.compareDocumentPosition(node) & 16) === 16);

        } else if (parent.contains && node.nodeType === 1) {
			return   parent.contains(node);

        }else {
			while (node = node.parentNode) {
				if (parent === node){
					return true;
				}
			}
		}
        return false;
    };
})();
