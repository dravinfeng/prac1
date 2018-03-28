/**
 * 监测
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
	        } else if (_el.detachEvent) {
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
 * 
 */

STK.register('jobs.heroBar',function(){
	return function(){

		var handle,node; //外层节点
		var that={
			si:null,
			si1:null,
			st:null,
			idx:0
		};
		var url="";
		
		var opts={
			element: 'jobs_heroBar',
			data: [
			{device: '1', geekbench: 136},
			{device: '3G', geekbench: 137},
			{device: '3GS', geekbench: 275},
			{device: '4', geekbench: 380},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '4S', geekbench: 655},
			{device: '5', geekbench: 1571}
			],
			xkey: 'device',
			ykeys: ['geekbench'],
			labels: ['Geekbench'],
			barRatio: 0.4,
			xLabelMargin: 10,
			hideHover: 'auto'
		};
		
		
		var C={
			show:function(dt){
				handle.setData(dt);
				C.init();
			},
			loopDigit:function(){
				that.max=10;
				(that.idx>=that.max) && (that.idx=0);
				// handle.displayHoverForRow(C.idx);				var d=handle.hoverContentForRow(that.idx);
				
				handle.hover.html(d[0]).show();
				handle.hover.moveTo(d[1]);
				that.idx++;
			},
			request:function(){
				$.ajax(url,{
					data:'',
					dataType:'',
					type:'POST',
					timeout:10000,
					complete:function(xhr,ts){
						//TODO 
						// var dt=
						C.show(dt);
					}
				})
			},
			init:function(){
				that.destroy();
				// that.st=setTimeout(C.request,5000);
				that.si=setInterval(C.loopDigit,3000);
			}
		}
	
		var checkParent=function(){
			return node;
		}
		//数据销毁
		var destroy = function(){
			
			clearInterval(that.si);
			clearInterval(that.si1);
			clearTimeout(that.st);
		};
		
		//初始化
		var init=function(){
			node=STK.E('jobs_heroBar');
			if(!checkParent()){
				return;
			}
			opts.element=node;
			window.aa=handle=Morris.Bar(opts);
			C.init();
		};
		
		that.destroy=destroy;
		
		init();
		return that;
	}
});



STK.core.pageM.add('jobs.heroBar');

