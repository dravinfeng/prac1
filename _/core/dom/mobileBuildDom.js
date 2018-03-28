$Import('core.arr.isArray');
/**
 * @id STK.core.dom.buildDom
 * @alias STK.core.dom.isNode
 * @param {Element} node
 * @return {Boolean} true/false
 * @author xinglong.feng
 * @example
 * STK.core.dom.buldDom($.E('test')) == true;
 */
STK.register('core.dom.mobileBuildDom', function(){
	return function(node){
		if(!node){return};
		var d,DOM={};
		var iterator=document.createNodeIterator(node,NodeFilter.SHOW_ELEMENT,null,false);
		var nd=iterator.nextNode();
		while(nd!=null){
			if(nd.hasAttribute('node-type')){
				d=nd.getAttribute('node-type');
				if(!DOM[d]){
					DOM[d]=nd;
				}else if(STK.core.arr.isArray(DOM[d])){
					DOM[d].push(nd);
				}else{
					DOM[d]=[DOM[d]];
					DOM[d].push(nd);
				}
			}
			
			nd=iterator.nextNode();
		}

		DOM['parentNode']=node;
		return DOM;
	};
});
