$Import('core.obj.parseParam');
$Import('core.dom.buildDom');
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
