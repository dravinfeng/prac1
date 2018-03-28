/**
 * is node
 * @id STK.core.dom.getBoundingClientRect
 * @alias STK.core.dom.isNode
 * @param {Element} node
 * @return {object} 
 * @author xinglong.feng
 * @example
 * STK.core.dom.getBoundingClientRect($.E('test')) == {width:,height:,left:,right:,top:,bottom:};
 */
STK.register('core.dom.getBoundingClientRect', function(){
	return function(node){
		var obj={};
		var t=node.getBoundingClientRect();
		obj.left=t.left,obj.right=t.right,obj.top=t.top,obj.bottom=t.bottom,obj.width=t.width,obj.height=t.height;
		if(typeof t.width=='undefined'){
			obj.width=t.right-t.left;
			obj.height=t.bottom-t.top;
		}
		t=null;
		return obj;
	};
});
