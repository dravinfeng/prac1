$Import('core.arr.isArray');
/**
 * @id STK.core.dom.getElementsByAttr
 * @alias STK.core.dom.isNode
 * @param {Element} node
 * @return {Boolean} true/false
 * @author xinglong.feng
 * @example
 * STK.core.dom.buldDom($.E('test')) == true;
 */
STK.register('core.dom.getElementsByAttr', function(){
	return function(node,attrK,attrV){
		if(!node){return};
		var DOM=[];
		if(document.createNodeIterator){
			var iterator=document.createNodeIterator(node,NodeFilter.SHOW_ELEMENT,null,false);
			var nd=iterator.nextNode();
			while(nd!=null){
				if(nd.hasAttribute(attrK)){
					if(attrV ){
						nd.getAttribute(attrK)==attrV && DOM.push(nd);
					}else{
						DOM.push(nd);
					}
				}
				
				nd=iterator.nextNode();
			}
		}else{
			for(var i = 0, l = node.childNodes.length; i < l; i ++){
				if(node.childNodes[i].nodeType == 1){
					if(typeof node.childNodes[i].getAttribute(attrK)=='string'){
						if(attrV ){
							node.childNodes[i].getAttribute(attrK)==attrV && DOM.push(node.childNodes[i]);
						}else{
							DOM.push(node.childNodes[i]);
						}
					}
					if(node.childNodes[i].childNodes.length > 0){
						DOM = DOM.concat(arguments.callee.call(null, node.childNodes[i], attrK, attrV));
					}
					
				}
			}	
		}

		return DOM;
		
		
	};
});
