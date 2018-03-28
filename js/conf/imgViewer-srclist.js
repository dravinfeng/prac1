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
 * 合并参数，不影响源
 * @id STK.core.obj.parseParam
 * @alias STK.core.obj.parseParam
 * @param {Object} oSource 需要被赋值参数的对象
 * @param {Object} oParams 传入的参数对象
 * @param {Boolean} isown 是否仅复制自身成员，不复制prototype，默认为false，会复制prototype
 * @author xinglong.feng
 * @example
 * var cfg = {
 * 	name: '123',
 *  value: 'aaa'
 * };
 * cfg2 = STK.core.obj.parseParam(cfg, {name: '456'});
 * //cfg2 == {name:'456',value:'aaa'}
 * //cfg == {name:'123',value:'aaa'}
 */
STK.register('core.obj.parseParam', function(){
	return function(oSource, oParams, isown){
		var key, obj = {};
		oParams = oParams || {};
		for (key in oSource) {
			obj[key] = oSource[key];
			if (oParams[key] != null) {
				if (isown) {// 仅复制自己
					if (oSource.hasOwnProperty[key]) {
						obj[key] = oParams[key];
					}
				}
				else {
					obj[key] = oParams[key];
				}
			}
		}
		return obj;
	};
});

/**
 * 页面代码初始化开始执行
 * @param {Object} document
 */
STK.register('core.ui._dialog',function(){
	var parseParam=STK.core.obj.parseParam;
	var buildDom=STK.core.dom.buildDom;
/*	var TEMP='<div class="dl_title"><span node-type="dl_title" class="title">提示：</span><a class="dl_close" node-type="dl_close" title="关闭" href="javascript:void(0);">x</a></div>'+
		'<div node-type="dl_content" class="dl_content"></div>'+
		'<div class="dl_foot" node-type="dl_foot"><input node-type="ok" type="button" value="确定" class="dl_btn"><input type="button" node-type="cancel" value="取消" class="dl_btn"></div>';
	*/
	var TEMP=['<div class="DX_bg">',
		'<table border="0" cellspacing="0" cellpadding="0">',
				'<tbody><tr><td><div class="DX_content"><div class="DX_title" node-type="dl_title">提示：</div>',
							'<a node-type="dl_close" title="关闭" href="javascript:void(0);" class="DX_close"></a>',
							'<div class="DX_detail">',
                                '<div node-type="dl_content"></div>',
                                '<div node-type="dl_foot" class="DX_submit"><a href="javascript:void(0)" node-type="ok" class="DX_btn"><span>确定</span></a><a node-type="cancel" href="javascript:void(0)" class="DX_btn_yet"><span>取消</span></a></div>',
							'</div></div></td></tr></tbody></table></div>'].join('');
	
	
	
	
	
	
	
	var binded=false;
	var createDialog = function(){
		var dia=$('[node-type="dl_outer"]',document.body)[0];
		if(dia){
			return dia;
		};
		
		dia=STK.C('div');
		dia.innerHTML=TEMP;
		$(dia).attr({
			'node-type':'dl_outer',
			'class':'DX_layer'
			//'class':'dl_outer'
		});

		$(dia).css({
			'z-index':'10001',
			'position':'absolute',
			'display':'none'
		});
		document.body.appendChild(dia);
		return dia;
		
	};
	var createMask=function(){
		var mask=$('[node-type="__dialogMask"]',document.body)[0];
		if(mask){
			return mask;
		};
		
		mask=STK.C('div');
		$(mask).attr({
			'node-type':'__dialogMask'
		});
		$(mask).css({
			'z-index':'10000',
			'background-color':'#CCCCCC',
			'opacity':0.6,
			'display':'none',
			'position':'absolute',
			'left':0,
			'top':0
		});
		document.body.appendChild(mask);
		return mask;
	};

	
	return function(spec){
		var that={};
		that.DOM={};
		for(var i in spec){
			(spec[i]==="") && (delete spec[i]);
		}
		var conf = parseParam({
			'width':'',
			'height':'',
			'title':'提示',
			'content':'',
			'showMask':true,
			'okText':'确定',
			'cancelText':'取消',
			'showBtn':true,
			'showBtnOk':true,
			'showBtnCancel':true,
			'showX':true
			
		},spec);
		var dia= createDialog();
		var mask;
		if (conf['showMask']) {
			mask= createMask();
		}

		that.setMiddle=function(){
			$(dia).css({
				'left':($(window).outerWidth()-$(dia).width())/2+$(document).scrollLeft()+'px',
				'top':($(window).outerHeight()-$(dia).height())/3+$(document).scrollTop()+'px'
			});
			if(conf['showMask']){
				$(mask).css({
					'height':$(document).outerHeight()+'px',
					'width':$(document).outerWidth()+'px'
				});
			};

		}
		that.setTitle = function(title){
			conf['title']=title;
			that.DOM['dl_title'].innerHTML=conf['title'];
			that.setMiddle();
		}
		that.setContent=function(inStr){
			conf['content']=inStr;
			that.DOM['dl_content'].innerHTML=conf['content'];
			that.setMiddle();
		}
		that.show=function(){
			
			initShow();
			that.setMiddle();
			mask && $(mask).show();
			$(dia).show();
		};
		that.hide=function(e){
			mask && $(mask).hide();
			$(dia).hide()
		}

		var initShow=function(){
			that.DOM['dl_title'].innerHTML=conf['title'];
			that.DOM['dl_content'].innerHTML=conf['content'];
			$(that.DOM['dl_content']).css({
				'width':conf['width']
			});
			
			var c=0;
			if(conf['showBtnOk']){
				$(that.DOM['ok']).css({'display':''});
			}else{
				$(that.DOM['ok']).css({'display':'none'});
				c++;
			}
			if(conf['showBtnCancel']){
				$(that.DOM['cancel']).css({'display':''});
			}else{
				$(that.DOM['cancel']).css({'display':'none'});
				c++;
			}
			
			if(c==2||!conf['showBtn']){
				 $(that.DOM['dl_foot']).css({'display':'none'});
			}
			else{
				$(that.DOM['dl_foot']).css({'display':''});
			}
			if(conf['showX']){
				$(that.DOM['dl_close']).show();
			}else{
				$(that.DOM['dl_close']).hide();
			}
			conf['okText'] &&(that.DOM['ok'].innerHTML='<span>'+conf['okText']+'</span>');
			conf['cancelText'] &&(that.DOM['cancel'].innerHTML='<span>'+conf['cancelText']+'</span>');
		}
		var bindEvent=function(){
			if(binded){return};
			var h=$(dia);
			$(that.DOM['dl_close']).bind('click',that.hide);
			h.bind('custShow',that.show);
			h.bind('custHide',that.hide);
			binded=true;
		}
		var initDOM=function(){
			that.DOM=buildDom(dia);
		}
		var init=function(){
			initDOM();
			bindEvent();
		};
		
		that.destroy=function(){
			var h=$(dia);
			$(that.DOM['dl_close']).unbind('click',that.hide);
			h.unbind('custShow',that.show);
			h.unbind('custHide',that.hide);
			
		};
		init();
		return that;
	};
});

/**
 * use for mobile web delegatedEvent
* @author xinglong.feng
 */
/**
 * @author xinglong.feng
 * @param {Object} e
 */
/**
 * Get event object
 * @id STK.core.evt.getEvent
 * @alias STK.core.evt.getEvent
 * @return {Event} e
 * @author xinglong.feng
 * @example
 * var ev = STK.core.evt.getEvent();
 */
STK.register('core.evt.getEvent', function(){
	return function(){
		if (STK.IE) {
			return window.event;
		}
		else {
			if (window.event){
				return window.event;
			}
			var o = arguments.callee.caller;
			var e;
			var n = 0;
			while (o != null && n < 40) {
				e = o.arguments[0];
				if (e && (e.constructor == Event || e.constructor == MouseEvent || e.constructor == KeyboardEvent)) {
					return e;
				}
				n++;
				o = o.caller;
			}
			return e;
		}
	};
});

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

/**
 * 合并参数
 * @id STK.core.obj.isEmpty
 * @alias STK.core.obj.isEmpty
 * @param {Object} o
 * @param {Object} isprototype
 * @return {Boolean} ret
 * @author xinglong.feng
 * @example
 * STK.core.obj.isEmpty({}) === true;
 * STK.core.obj.isEmpty({'test':'test'}) === false;
 */
STK.register('core.obj.isEmpty',function(){
	return function(o,isprototype){
		var ret = true;
		for(var k in o){
			if(isprototype){
				ret = false;
				break;
			}else{
				if(o.hasOwnProperty(k)){
					ret = false;
					break;
				}
			}
		}
		return ret;
	};
});
/**
 * query to json
 * @id STK.core.json.queryToJson
 * @alias STK.core.json.queryToJson
 * @param {Json} JSON
 * @param {Boolean} isEncode
 * @return {String} querystring
 * @author xinglong.feng
 * @example
 * var q1 = 'a=1&b=2&c=3';
 * STK.core.json.queryToJson(q1) === {'a':1,'b':2,'c':3};
 */
/**
 * Check if in Array
 * @id STK.core.arr.inArray
 * @alias STK.core.arr.inArray
 * @param {String | Number} oElement 需要查找的对象
 * @param {Array} aSource 源数组
 * @return {Boolean} 是否在数组中
 * @author xinglong.feng
 * @example
 * var a = 2,b=[3,2,1]
 * alert(STK.core.arr.inArray(a,b));// true
 */
/**
 * 返回在数组中的索引
 * @id STK.core.arr.indexOf
 * @alias STK.core.arr.indexOf
 * @param {String | Number} oElement 需要查找的对象
 * @param {Array} aSource 源数组
 * @return {Number} 在数组中的索引,-1为未找到
 * @author xinglong.feng
 * @example
 * var a = 2, b=[3,2,1];
 * alert(STK.core.arr.indexOf(a,b));// 1
 */
STK.register('core.arr.indexOf', function(){
	return function(oElement, aSource){
		if (aSource.indexOf) {
			return aSource.indexOf(oElement);
		}
		for (var i = 0, len = aSource.length; i < len; i++) {
			if (aSource[i] === oElement) {
				return i;
			}
		}
		return -1;
	};
});

STK.register('core.arr.inArray', function(){
	return function(oElement, aSource){
		return STK.core.arr.indexOf(oElement, aSource) > -1;
	};
});

/**
 * 解决jquery不足
 * @id STK.core.util.listener
 * @author xinglong.feng
 * @example
 *@param loc  'left' or 'right' or null
 */


STK.register('core.str.trim', function(){
	return function(_str,loc){
	var str=_str||'';
	var rnotwhite = /\S/,
	// Used for trimming whitespace
	l = /^\s+/,
	r = /\s+$/;
	
	if (rnotwhite.test( "\xA0" ) ) {
		l = /^[\s\xA0]+/;
		r = /[\s\xA0]+$/;
	}
	
	str=str.toString();

	return loc=='left'? str.replace( l, "" ):(loc=='right'? str.replace( r, "" ) : str.replace( l, "" ).replace( r, "" ));

	}
});

STK.register('core.json.queryToJson',function(){
	return function(QS, isDecode){
		var _Qlist = STK.core.str.trim(QS).split("&");
		var _json  = {};
		var _fData = function(data){
			if(isDecode){
				return decodeURIComponent(data);
			}else{
				return data;
			}
		};
		for(var i = 0, len = _Qlist.length; i < len; i++){
			if(_Qlist[i]){
				var _hsh = _Qlist[i].split("=");
				var _key = _hsh[0];
				var _value = _hsh[1];
				
				// 如果只有key没有value, 那么将全部丢入一个$nullName数组中
				if(_hsh.length < 2){
					_value = _key;
					_key = '$nullName';
				}
				// 如果缓存堆栈中没有这个数据
				if(!_json[_key]) {
					_json[_key] = _fData(_value);
				}
				// 如果堆栈中已经存在这个数据，则转换成数组存储
				else {
					if(STK.core.arr.isArray(_json[_key]) != true) {
						_json[_key] = [_json[_key]];
					}
					_json[_key].push(_fData(_value));
				}
			}
		}
		return _json;
	};
});
STK.register('core.evt.delegatedEvent', function(){
	var eventUtil=STK.core.evt.eventUtil;
	var indexOf=STK.core.arr.indexOf;
	var actEls=[],actElsEvtList=[];

	return function(actEl){
		var that={},evtList;
		if(!actEl){return};
		var idx=indexOf(actEl,actEls);
		if(idx==-1){
			actEls.push(actEl);
			idx=actEls.length-1;
			actElsEvtList[idx]={};
		}
		evtList=actElsEvtList[idx];
		
		var bindEvent = function(e){
			var evt = STK.core.evt.fixEvent(e);
			var el = evt.target;
			var type = e.type;

			var checkBuble = function(){
				if(evtList[type] && evtList[type][actionType]){
					return evtList[type][actionType]({
						'evt' : evt,
						'el' : el,
						'box' : actEl,
						'data' : STK.core.json.queryToJson(el.getAttribute('action-data') || '',1)
					});
				}else{
					return true;
				}
			};
			var actionType = null;
			while(el && el !== actEl){
				actionType = el.getAttribute('action-type');
				if(actionType && checkBuble() === false){
					break;
				}
				el = el.parentNode;
			}

		};
		that.add = function(funcName, evtType, process){
			if(!evtList[evtType]){
				evtList[evtType] = {};
				eventUtil.addEvent(actEl, evtType, bindEvent);
			}
			var ns = evtList[evtType];
			ns[funcName] = process;
		};
		that.remove = function(funcName, evtType){
			if(evtList[evtType]){
				delete evtList[evtType][funcName];
				if(STK.core.obj.isEmpty(evtList[evtType])){
					delete evtList[evtType];
					eventUtil.removeEvent(actEl, evtType, bindEvent);
				}
			}
		};
		that.destroy = function(){
			if(actEl){
				evtList=actElsEvtList[indexOf(actEl,actEls)];
				for(k in evtList){
					for(l in evtList[k]){
						delete evtList[k][l];
					}
					delete evtList[k];
					eventUtil.removeEvent(actEl, k, bindEvent);
				}
				return;
			}
			for(var i in actElsEvtList){
				evtList=actElsEvtList[i];
				for(k in evtList){
					for(l in evtList[k]){
						delete evtList[k][l];
					}
					delete evtList[k];
					eventUtil.removeEvent(actEl, k, bindEvent);
				}
			}
		};
		return that;
	}

});

/**
 * 页面代码初始化开始执行
 * 使用中注意，如果不需要了，那麼及時的destroy掉
 * @param {Object} document
 * @author honglei.li
 * opts={buttons:[{"text":"确定",callback:function(){}},{"text":"取消",callback:function(){}}]}
 */
STK.register('core.ui.dialog',function(){
	var buildDom = STK.core.dom.buildDom,
		delegate = STK.core.evt.delegatedEvent,
		eventUtil=STK.core.evt.eventUtil,
		parse    = STK.core.obj.parseParam;

	var makeBtns=function(ls){
		var actKey=['ok','cancel'];
		var inHtml=[];
		for(var i=0;i<Math.min(ls.length,2);i++){
			inHtml.push('<button class="zq_boxBtn_common zq_boxBtn_confirm" action-type="'+actKey[i]+'" node-type="ok">'+ls[i].text+'</button>');
		}
		
		if(!ls.length){
			return "";
		}
		return ['<div class="zq_boxBtn">',inHtml.join(''),'</div>'].join(''); 
	}
	return function(inHtml,opts){
		var opts   = opts || {};
		var option = {
			width    : 400,
			height   : 300,
			autoOpen : false,
			autoClose:false,
			modal    : true,
			buttons:[],
			close    : true,
			closeCallback : function(){}
		}
		option  = parse(option , opts);

		var handle,that,newOut,mask= null,st,
			temp = {
				'btnHtml' : makeBtns(option.buttons),
				'closeHtml' : '<a class="zq_boxClose" title="关闭" href="javascript:void(0)" action-type="close" node-type="close">&nbsp;</a>'
			},
			outerHtml  = '<table border="0" cellspacing="0" cellpadding="0">'+
							'<tbody>'+
								'<tr>'+
									'<td>'+
										'<div class="zq_boxContent">'+
										(!option.close ?'' : temp.closeHtml)+
											'<div class="zq_BoxDetail">'+
												inHtml +
											'</div>'+
											temp.btnHtml+
										'</div>'+
									'</td>'+
								'</tr>'+
							'</tbody>'+
						'</table>';
		
		var _self={
			'close' : function(args){
				option.closeCallback(args);
				$(newOut).hide();
				$(mask).hide();
			},
			'ok' : function(args){
				option.buttons[0] && option.buttons[0].callback(args);
			},
			'cancel' : function(args){
				option.buttons[1] && option.buttons[1].callback(args);
			},
			'setMask' : function(){
				mask.style.height = $(document).height() + "px";
			},
			'scroll':function(e){
				clearTimeout(st);
	    		st = setTimeout(_self.setMask,50);
			}
		}
		//自定义函数
		that = {
			
			'open' : function(){
				that.middle();
				$(newOut).show();
				option.modal && $(mask).show();
				STK.IE6 && _self.scroll();
			},
			'close' : function(args){
				_self.close(args);
			},
			'middle' : function(){
				newOut.style.top  = $(window).scrollTop()  + ($(window).height() - $(newOut).height())/3 + "px";
				newOut.style.left = $(window).scrollLeft() + ($(window).width()  - $(newOut).width())/2  + "px";
			},
			'getChilds' : function(o){
				that.DOM = buildDom(o);
				return that.DOM;
			},
			'destroy' : function(){
				STK.IE6 && $(window).unbind('scroll',_self.scroll);
				if(handle){
					handle.remove('close', 'click', that.close);
					handle.remove('ok', 'click', that.ok);
					handle.remove('cancel', 'click', that.cancel);
				}
				option.autoClose && eventUtil.removeEvent(mask,'click',_self.close);
				newOut && $(newOut).remove();
				mask && $(mask).remove();
				that.DOM = null;
				handle=null;
			}
		}
    	
    	
    	// 节点初始化 
    	var readyDom = function(){
			mask = STK.C("div");
			mask.innerHTML="&nbsp;";
			mask.className = "zq_overlay";
			mask.style.display = "none";
			document.body.appendChild( mask );
			
    		newOut = STK.C("div");
	    	newOut.className = "zq_box";
	    	newOut.id = "zq_box_" + new Date().getTime();
			newOut.style.position = 'absolute';
			newOut.style.width = option.width + 'px';
			newOut.style.display = 'none';
			newOut.innerHTML = outerHtml;
			document.body.appendChild( newOut );

    	}
    	
    	var parseDom=function(){
    		that.DOM = buildDom( newOut );
    	}
    	
    	//事件绑定
    	var bindDom = function(){

    		STK.IE6 && $(window).bind('scroll',_self.scroll);
    		
    		handle = delegate( newOut );
			handle.add('close', 'click', _self.close);
			handle.add('ok', 'click', _self.ok);
			handle.add('cancel', 'click', _self.cancel);
			option.autoClose && eventUtil.addEvent(mask,'click',_self.close);
    	};
		
		//函数初始化
		var init = function(){
			readyDom();
			parseDom();
			bindDom();
		}
		
		//数据销毁
		handle && that.destroy();
		
		init();
		return that;
	};
});

/**
 * 图片查看器
 * @author xinglong.feng
 */
STK.register('core.kit.imgViewer',function(){
	var dialog=STK.core.ui.dialog;
	return function(inHtml,opts){
		!opts &&(opts={});
		!opts.overLayCss && (opts.overLayCss={'opacity':1,'background-color':'#000000'});
		opts.haveTitle=false;
		opts.draggable=false;
		opts.resizable=false;
		return dialog(inHtml,opts);
	}
});

/**
 *  
 * 页面代码初始化开始执行
 * @param {Object} document
 */
STK.register('core.ui.alert',function(){
	var dialog=STK.core.ui.dialog;
	return function(info,spec){
		!spec && (spec={});
		var that={};
		var C={
			closeCbk:function(e){
				that.dialog && that.dialog.destroy();
				spec.callback && spec.callback(e);
			}
		}
		var opts={
			modal: spec.modal||true,
			autoClose:true || spec.autoClose,
			width:spec.width||300,
			closeCallback:C.closeCbk,
			buttons:[{"text":"确定",callback:C.closeCbk}]
			
		}
		
		var inner='<div style="margin:20px 20px 0">'+info+'</div>';
		that.dialog=dialog(inner,opts);
		that.dialog.open();
		
	
		that.destroy=function(){
			that.dialog && that.dialog.destroy();
		}
		return that;
	};
});

/**
 * 搜索结果模块
 */

STK.register('jobs.imgViewer',function(){
	return function(){
		var imgViewer=STK.core.kit.imgViewer;
		var buildDom=STK.core.dom.buildDom;
		
		var node; //外层节点
		var that={
			DOM:{}
		};
		
		var handle;
		var C={
			initDialog:function(){
				handle=imgViewer('aaaaaa',{});
				handle.open();
				STK.core.ui.alert('1234')
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
			node=STK.E('jobs_imgViewer'); //外层id
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

STK.core.pageM.add('jobs.imgViewer');
