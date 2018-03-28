$Import('core.arr.isArray');
$Import('core.dom.getElementsByAttr');
/**
 * @id STK.core.dom.buildDom
 * @alias STK.core.dom.isNode
 * @param {Element} node
 * @return {Boolean} true/false
 * @author xinglong.feng
 * @example
 * STK.core.dom.buldDom($.E('test')) == true;
 */
STK.register('core.dom.buildDom', function(){
	var getByAttr=STK.core.dom.getElementsByAttr;
	return function(node){
		var ls=getByAttr(node,'node-type');
		var d,DOM={};
		var len=ls.length;
		var item;
		for(var i=0;i<len;i++){
			item=ls[i];
			d=item.getAttribute('node-type');
			if(!DOM[d]){
				DOM[d]=item;
			}else if(STK.core.arr.isArray(DOM[d])){
				DOM[d].push(item);
			}else{
				DOM[d]=[DOM[d]];
				DOM[d].push(item);
			}
		}

		DOM['parentNode']=node;
		return DOM;
	};
});
