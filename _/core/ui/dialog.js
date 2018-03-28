$Import('core.ui._dialog');
$Import('core.dom.buildDom');
$Import('core.evt.delegatedEvent');
$Import('core.evt.eventUtil');
$Import('core.obj.parseParam');
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
