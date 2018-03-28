/**
 * 页面统一隐藏容器工具
 * @id STK.core.util.hideContainer
 * @author xinglong.feng
 * @example 
 */
$Import('core.dom.isNode');
STK.register('core.util.hideContainer', function() {
	 var hideDiv;
	 
	 var initDiv = function() {
	 	if(hideDiv) return;
		hideDiv = STK.C("div");
		hideDiv.style.cssText = "position:absolute;top:-9999px;left:-9999px;";
		document.getElementsByTagName("head")[0].appendChild(hideDiv);
	 };
	 
	 var that = {
	 	appendChild: function(node) {
			if(STK.core.dom.isNode(node)) {
				initDiv();
				hideDiv.appendChild(node);
			}
		},
	 	removeChild: function(node) {
			if(STK.core.dom.isNode(node)) {
				hideDiv && hideDiv.removeChild(node);
			}
		}
	 };
	 
	 return that;
	 
});
