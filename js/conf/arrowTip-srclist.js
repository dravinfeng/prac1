/**
 * 
 */

﻿var STK = (function() {
	var that = {};
	var errorList = [];

    that.inc = function (key) {
		return true;
	};

    that.register = function (ns, maker) {
		if(!ns || !maker){return false};
		var NSList = ns.split('.');
		var step = that;
		var k = null;
		while(k = NSList.shift()){
			if(NSList.length){
				if(step[k] === undefined){
					step[k] = {};
				}
				step = step[k];
			}else{
				if(step[k] === undefined){
					try{
						step[k] = maker(that);
					}catch(exp){
						
					}
				}
			}
		}
	};

	//STK.IE
	that.IE = /msie/i.test(navigator.userAgent);
	that.IE6= /msie 6/i.test(navigator.userAgent);

	//STK.E
	that.E = function(id) {
		if (typeof id === 'string') {
			return document.getElementById(id);
		} else {
			return id;
		}
	};
	//STK.C
	that.C = function(tagName) {
		var dom;
		tagName = tagName.toUpperCase();
		if (tagName == 'TEXT') {
			dom = document.createTextNode('');
		} else if (tagName == 'BUFFER') {
			dom = document.createDocumentFragment();
		} else {
			dom = document.createElement(tagName);
		}
		return dom;
	};
	
	that.log = function(str){
		errorList.push('[' + (new Date()).toString() + ']: ' + str);
	};
	
	that.getLogs = function(){
		return errorList;
	};
	return that;
})();
$Import = STK.inc;
﻿/**
 * 页面代码初始化开始执行
 * @param {Object} document
 */
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

STK.register('core.pageM',function(){
	var evt=STK.core.evt.eventUtil;
	var that={};
	var nsCache={};
	var nsList=[];
	that.add=function(ns){
		if (!nsCache[ns]) {
			var t=ns.split('.');
			var fn=STK,i=0;
			do{
				fn=fn[t[i]];
				i++;
			}while(i<t.length);
			nsList.push(ns);
            nsCache[ns] = fn;
        }
	};

	that.start=function(){
		var d;
		for(var i=0;i<nsList.length;i++){
			try {
				d=nsList[i];
				if(d){
					nsCache[d] = nsCache[d]();
				}else{
					STK.log("start:ns=" + i + " ,have not been registed");
				}
            } 
            catch (e) {
                STK.log(e);
            }
		}
	};
	
	that.destroy=function() {
		var d;
		while(nsList.length){
			try{
				d=nsList.shift();
				nsCache[d].destroy();
				nsCache[d]=null;
			}catch(e){}
		};

	};
	
	if(!window.jQuery){
		document.addEventListener && evt.addEvent(document,"DOMContentLoaded",that.start);
		document.attachEvent && evt.addEvent(document,"onreadystatechange",that.start);
		evt.addEvent(window,"unload",that.destroy);

	}else{
		jQuery(document).ready(that.start);
		jQuery(window).unload(that.destroy);
	};
	
	return that;
});


/**
 * Check Array
 * @id STK.core.arr.isArray
 * @alias STK.core.arr.isArray
 * @param {Array} o
 * @return {Boolean} TRUE/FALSE
 * @author xinglong.feng
 * @example
 * var li1 = [1,2,3]
 * var bl2 = STK.core.arr.isArray(li1);
 * bl2 == TRUE
 */
STK.register('core.arr.isArray', function(){
	return function(o){
		return Object.prototype.toString.call(o) === '[object Array]';
	};
});

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

/**
 * 获得 滚动条 滚动距离
 * @id STK.core.util.listener
 * @author xinglong.feng
 * @example
 * var a=STK.core.util.scrollLength();
 * a=={'scrollLeft':100,'scrollTop':100};
 */


STK.register('core.util.scrollLength', function(){
	return function(){
		//TODO top的值 在 页面尚未onload之前调用，值可能为 window
		var top=window.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
		var left=window.scrollLeft || document.documentElement.scrollLeft || document.body.scrollLeft;
		return {'scrollLeft':left,'scrollTop':top};
	}

});

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

/**
 * is node
 * @id STK.core.dom.isNode
 * @alias STK.core.dom.isNode
 * @param {Element} node
 * @return {Boolean} true/false
 * @author xinglong.feng
 * @example
 * STK.core.dom.isNode($.E('test')) == true;
 */
STK.register('core.dom.isNode', function(){
	return function(node){
		return (node != undefined) && Boolean(node.nodeName) && Boolean(node.nodeType);
	};
});

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

/**
 * 依据元素进行定位的弹出层
 * @author fengxinglong
 * @param {String} info
 * @param {Object} DOM Element or attributes map
 * @example
 * STK.cor.ui.arrowTip("aaaa",{el:STK.E("a"),css:{},noClose:0/1,isBlack:0/1}); //第二个参数 可以包含 要依据进行定位的 节点 以及  要特殊表现的 样式,css可有可无
 * //如果 不提供 el属性，那么 必须不能缺少 css里面的 left,top值
 */
STK.register('core.ui.arrowTip',function(){
	var dialog=STK.core.ui.dialog;
	var setStyle=STK.core.dom.setStyle;
	var getXY=STK.core.dom.getXY;
	var isNode=STK.core.dom.isNode;
	var eventUtil=STK.core.evt.eventUtil;
	var getBdRect=STK.core.dom.getBoundingClientRect;
	var TEMP=['<table class="zq_arrowTipsContent">'+
	        		'<tbody>'+
	        			'<tr><td class="arrTipsInner">',
	        			
	        			'</td></tr>'+
	        		'</tbody>'+
	        	'</table>'];
	        	/*
	        	'<div class="zq_arrowTop">&nbsp;</div>'+
	        	'<div class="zq_arrowRight">&nbsp;</div>'+
	        	'<div class="zq_arrowBottom">&nbsp;</div>'+
	        	'<div class="zq_arrowLeft">&nbsp;</div>
	        	
	        	*/

	
	return function(info,spec){
		!spec && (spec={});
		if(!spec.el && !(spec.css && spec.css.left && spec.css.top)){
			return false
		}
		
		var that={parent:''};
		
		var left,top,dim,_close;
		var winDim=getBdRect(document.documentElement);
		var d=STK.C('div');
		var innerDiv=STK.C('div');
		d.className="zq_arrowTipBox";
		innerDiv.className= !spec.isBlack ? "zq_arrowtips" : "zq_arrowtips zq_arrowtips1";
		
		if(isNode(spec.el)){
			left=getXY(spec.el);
			top=left.top;
			left=left.left;
			dim=getBdRect(spec.el);
		}else{
			left=parseInt(spec.css.left,10);
			top=parseInt(spec.css.top,10);
			dim={'left':left,'top':top,'width':0,'height':0,'bottom':top,'right':left}
		}
		

		if(spec.css){
			for(var i in spec.css){
				if(i!='left' && i!='top'){
					setStyle(innerDiv,i,spec.css[i]);
				}
			}
		}
		innerDiv.innerHTML=[TEMP[0],info,TEMP[1]].join('');
		d.appendChild(innerDiv);
		
		var bindDomFuncs={
			'close':function(e){
				that.destroy();
			}
		}
		
		
		if(!spec.noClose){
			_close=STK.C('a');
			_close.className="zq_arrowClose";
			_close.innerHTML="x";
			_close.setAttribute('href','javascript:void(0)');
			eventUtil.addEvent(_close,'click',bindDomFuncs['close']);
			innerDiv.appendChild(_close);
		}
		
		that.parent=d;
		document.body.appendChild(d);
		
		
		
		
		setTimeout(function(){
			var _dim=getBdRect(d);
			var arrowTo="left";
			if((top-10)>_dim.height){
				if(_dim.width<(winDim.width-dim.left)){
					arrowTo="bottom";
				}else{
					arrowTo="right";
				}
			}else{
				if(_dim.width>(winDim.width-dim.left)){
					arrowTo="right";
				}else{
					arrowTo="left";
				}
			}
			var t=STK.C('div');
			innerDiv.appendChild(t);
			switch(arrowTo){
				case 'left':
					d.style.left=(left+dim.width+3)+'px',d.style.top=(top-9)+'px';
					t.className="zq_arrowLeft";
					break;
				case 'bottom':
					d.style.left=(left-9)+'px',d.style.top=(top-_dim.height-3)+'px';
					t.className="zq_arrowBottom";
					break;
				case 'top':
					d.style.left=(left-9)+'px',d.style.top=(top+dim.height+3)+'px';
					t.className="zq_arrowTop";
					break;
				case 'right':
					d.style.left=(left-_dim.width-3)+'px',d.style.top=(top-9)+'px';
					t.className="zq_arrowRight";
					break;
			}
		},2);
		

		that.destroy=function(){
			_close && eventUtil.removeEvent(_close,'click',bindDomFuncs['close']);
			d && document.body.removeChild(d);
			that.d=d=null;
		}
		return that;
	};
});

/**
 * 
 */

STK.register('jobs.arrowTip',function(){
	return function(){
		var arrowTip=STK.core.ui.arrowTip;
		var buildDom=STK.core.dom.buildDom;
		
		var node=document.body; //外层节点
		var that={
			DOM:{}
		};
		
		var handle;
		var C={
			initDialog:function(){
				
				arrowTip("测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",{el:STK.E('aa'),css:{width:'50px'}});
				
				
			}
		}

		
		//事件处理函数
		var bindDOMFuncs={
			'scroll':function(e){

			}
		}
		//绑定事件函数
		var bindDom=function(){
			
		};

		var parseDom=function(){
			that.DOM=buildDom(node);
		};
		
		var checkParent=function(){
			return node;
		}
		//数据销毁
		var destroy = function(){
			
		};
		
		//初始化
		var init=function(){
			if(!checkParent()){
				return;
			}
			parseDom();

			bindDom();
			C.initDialog();
			
		};
		
		that.destroy=destroy;
		
		init();
		return that;
	}
});

STK.core.pageM.add('jobs.arrowTip');
