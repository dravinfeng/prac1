/**
 * @author xinglong.feng
 * @example
	var suggestHandle=suggest({
		'url':'/url',
		'el':that.DOM['searchI'],
		'callback':function(data){
			C.goSearch(data);
		}
	})
	上行参数 'queryKey' 输入框的值
	下行参数 {"code":"100000","data":[{"screen_name":"下拉列表中要显示的名称","value":"对应的id值"}]}
 */
$Import('core.obj.parseParam');
$Import('core.io.ajax');
$Import('core.util.easyTemplate');
$Import('core.evt.delegatedEvent');
$Import('core.json.queryToJson');
$Import('core.arr.indexOf');
$Import('core.json.jsonToQuery');
STK.register("core.util.suggest", function (){
	/*
	var CONTAINER = '<div style="position: absolute; top: -2000px; left: -2000px;'
		+' z-index: 10; display:none;background-color:white;border:solid 1px #999999;white-space:nowrap; overflow:hidden;" node-type="___followListSuggest___"></div>';

	var TEMPLATE = ''
	+ '<#et suggest rs>'
	+ '<ul style="padding:2px;">'
		+ '<#list rs.data as list>'
			+ '<li action-type="suggestItem" style="list-style: none outside none;" action-data="${list.value}">${list.screen_name}</li>'
		+ '</#list>'
	+ '</ul>';
	*/
	
	var CONTAINER ='<div class="dx_layer_search" style="position: absolute; top: -2000px; left: -2000px;z-index: 10; display:none;" node-type="___followListSuggest___"></div>';
	
	var TEMPLATE = ''
	+ '<#et suggest rs>'
	+ '<ul class="search_menu">'
	+ '<#list rs.data as list>'
    + '<li action-type="suggestItem" action-data="${list.value}"><a href="javascript:void(0)"><span class="menu_name">${list.screen_name}</span><span class="menu_num"></span></a></li>'
	+ '</#list>'
    + '</ul>';

	
	
	
	
	
	
	
	
	var parseParam=STK.core.obj.parseParam;
	var ajax=STK.core.io.ajax;
	var easyTemplate=STK.core.util.easyTemplate;
	var delegate=STK.core.evt.delegatedEvent;
	var queryToJson=STK.core.json.queryToJson;
	var jsonToQuery=STK.core.json.jsonToQuery;
	var indexOf=STK.core.arr.indexOf;
	var handle;
	var state=false;
	return function (opts) {
		var that={
			DOM:{
				box:null			
			},
			st:null,
			dataList:{},
			list:[],
			current:-1
		};
		var cacheList={};
		
		
		
		
		var conf=parseParam({
			'callback':function(rs){},
			'el':'',
			'url':''
		},opts);
		
		var makeDom=function(){
			if(!that.DOM.box){
				if($('div[node-type="___followListSuggest___"]',document.body)[0]){
					that.DOM.box=$('div[node-type="___followListSuggest___"]',document.body)[0];
				}else{
					that.DOM.box=$(document.body).append(CONTAINER);
					that.DOM.box=$('div[node-type="___followListSuggest___"]',document.body)[0];
				}
			};
		}
		var makeList=function(rs){
			$(rs.data).each(function(i,d){
				d.value=jsonToQuery(d);
			});
			var str=easyTemplate(TEMPLATE,rs);
			that.DOM.box && (that.DOM.box.innerHTML=str);
			that.list=$('li[action-type="suggestItem"]',that.DOM.box);
		}
		
		var select=function(){
			if(that.current==-1){
				return;
			}
			//造数据并返回
			var rs=queryToJson($(that.list[that.current]).attr('action-data')||'');
			conf.el.value=rs.screen_name;
			hide();
			clear();
			conf.callback(rs);
		}
		var C={
			addClass:function(el,cls){
				$(el).addClass(cls);
				return el;
			},
			removeClass:function(el,cls){
				var c=el.className;
				c=$.trim(c.replace(cls,''));
				el.className=c;
				return el;
			}
		}
		var up=function(){
			var el=that.list[that.list.length-1];
			var cls=el.className;
			
			if(that.current==-1){
				C.addClass(el,'current');
				that.current=that.list.length-1;
			}else if(that.current==0){
				C.removeClass(that.list[0],'current');
				C.addClass(el,'current');
				that.current=that.list.length-1;
			}else{
				C.removeClass(that.list[that.current],'current');
				that.current--;
				C.addClass(that.list[that.current],'current');
			}
		}
		var down=function(){
			if(that.current==-1){
				C.addClass(that.list[0],'current');
				that.current=0;
			}else if(that.current==that.list.length-1){
				C.removeClass(that.list[that.current],'current');
				C.addClass(that.list[0],'current');
				that.current=0;
			}else{
				C.removeClass(that.list[that.current],'current');
				that.current++;
				C.addClass(that.list[that.current],'current');
			}
		}
	
		var hover=function(el){
			
			$(that.list).each(function(i,d){
				if(d==el){
					(that.current>=0) && C.removeClass(that.list[that.current],'current');
					C.addClass(d,'current');
					that.current=i;
					return false;
				}
			});
		};
		var callback={
			'success':function(rs){
				clear();
				var vl=$.trim(conf.el.value);
				if(rs.data && rs.data.length){
					makeList(rs);
					show();
					down(); //默认选中第一项
				}else{
					hide();
				};
				//去掉缓存 跟切换url抵触
				//!that.dataList[vl] &&(that.dataList[vl]=rs.data||[]);
			},
			'error':function(rs){
				hide();
				clear();

			},
			'fail':function(rs){
				hide();
				clear();

			}
		};
		var suggest=function(){
			//搜索
			if(!conf.url){
				return false;
			};
			var vl=$.trim(conf.el.value);
			/*
			if(that.dataList[vl]){
				callback.success({'data':that.dataList[vl]});
				return;
			}
			*/
			var param={
				'queryKey':vl
			};
			ajax(conf.url,{
				'data':param,
				'callback':callback
			});
		}
		
		var clear=function(){
			that.DOM.box.innerHTML="";
			that.current=-1;
		};
		var show=function(){
			var wt=$(conf.el).outerWidth();
			var ht=$(conf.el).outerHeight();
			$(that.DOM.box).css('width',(wt-1)+'px')
			
			var pos=$(conf.el).offset();
			$(that.DOM.box).css('left',pos.left+'px');
			$(that.DOM.box).css('top',(pos.top+ht-1)+'px');
			$(that.DOM.box).show();
			
			$(document.body).bind('click',bindDOMFuns['bodyClick']);
		}
		
		var hide=function(){
			$(that.DOM.box).hide();
			
			$(document.body).unbind('click',bindDOMFuns['bodyClick']);
		};
		
		//为特殊搜索提供 临时改变url
		var setUrl=function(url){
			conf.url=url;
		}
		var fireSuggest=function(){
			suggest();
		}
		var bindDOMFuns={
			'listClick':function(args){
				that.current=indexOf(args.el,that.list);
				select();
				return false;
			},
			'keyFunc':function(event){
				
				if (event.keyCode == 13){
					select();
				}else if(event.keyCode == 38){ //up
					up();
				}else if(event.keyCode == 40){ //down
					down();
				}else{
					//联想处理
					clearTimeout(that.st);
					that.st=setTimeout(suggest,300);
				}
				return false;
			},
			'hover':function(args){
				args.el && hover(args.el);
			},
			'bodyClick':function(e){
				hide();
				//$(document.body).unbind('click',bindDOMFuns['bodyClick']);
			},
			'inputClick':function(e){
				var vl=$.trim(conf.el.value);
				if(!vl){return};
				show();
				suggest();
				
				return false;
			},
			'elClick':function(){
				return false;
			}
		}
		
		var bindEvent=function(){
			if(state){
				return;
			}
			if(!conf.el){
				throw('need the element of input');
				return;
			}
			$(conf.el).bind('keyup',bindDOMFuns['keyFunc']);
			handle=delegate(that.DOM.box);
			handle.add('suggestItem','click',bindDOMFuns['listClick']);
			handle.add('suggestItem','hover',bindDOMFuns['hover']);
			
			$(conf.el).bind('click',bindDOMFuns['elClick']);
			$(conf.el).bind('focus',bindDOMFuns['inputClick']);
			state=true;
		};
		var destroy=function(){
			$(conf.el).unbind('keyup',bindDOMFuns['keyFunc']);
			handle.remove('suggestItem','click');
			handle.remove('suggestItem','hover');
			$(conf.el).unbind('click',bindDOMFuns['elClick']);
			$(conf.el).unbind('focus',bindDOMFuns['inputClick']);
		};
		
		var init=function(){
			if(state){
				return;
			}
			makeDom();
			bindEvent();
		};
		init();
		that.show = show;
		that.hide = hide;
		
		that.setUrl=setUrl;
		that.fireSuggest=fireSuggest;
		
		that.destroy = destroy;
		
		return that;
	};
});