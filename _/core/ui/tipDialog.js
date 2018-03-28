$Import('core.obj.parseParam');
$Import('core.dom.buildDom');
/**
 * 
 * @param {Object} document
 */
STK.register('core.ui.tipDialog',function(){
	var parseParam=STK.core.obj.parseParam;
	var buildDom=STK.core.dom.buildDom;
	var TEMP='<div class="float-box-inner">'+
			'<div class="layer_bar">'+
            '<div class="box-arrow" node-type="tip_arrow" style="top: 17px;"></div>'+
            '<em><a node-type="tip_close" title="关闭" href="javascript:void(0)">X&nbsp;</a></em>'+
            '<div node-type="tip_content" class="tip-content">'+
            '</div></div>'+
		  '</div>';

	var binded=false;
	var createDialog = function(){
		var dia=$('[node-type="dl_tip"]',document.body)[0];
		if(dia){
			return dia;
		};
		
		dia=STK.C('div');
		dia.innerHTML=TEMP;
		$(dia).attr({
			'node-type':'dl_tip'
		});
		
		$(dia).addClass('float-box box-sms');
		$(dia).css({
			'z-index':'11',
			'display':'none'
		});
		document.body.appendChild(dia);
		return dia;
		
	};


	return function(spec){
		var that={};
		that.DOM={};
		var conf = parseParam({
			'width':'',
			'height':'',
			'content':'',
			'showX':true
		},spec);
		var dia= createDialog();

		that.setPos=function(pos){
			var wd=$(dia).width();
			
			$(dia).css({
				'left':(pos.left-wd)+'px',
				'top': pos.top+'px'
			});

		}
		that.setContent=function(inStr){
			conf['content']=inStr;
			that.DOM['tip_content'].innerHTML=conf['content'];
		}
		that.show=function(pos){
			
			initShow();
			
			$(dia).show();
			pos && that.setPos(pos);
			
		};
		that.hide=function(e){
			
			$(dia).hide()
		}

		var initShow=function(){
			that.DOM['tip_content'].innerHTML=conf['content'];
			$(dia).css({
				'width':conf['width']
			});
			
		}
		var bindEvent=function(){
			if(binded){return};
			var h=$(dia);
			$(that.DOM['tip_close']).bind('click',that.hide);
			h.bind('custShow',that.show);
			h.bind('custHide',that.hide);
			binded=true;
		}
		var initDOM=function(){
			that.DOM=buildDom(dia);
			that.DOM['outer']=dia;
		}
		var init=function(){
			initDOM();
			bindEvent();
		};
		
		that.destroy=function(){
			var h=$(dia);
			$(that.DOM['tip_close']).unbind('click',that.hide);
			h.unbind('custShow',that.show);
			h.unbind('custShow',that.hide);
			
		};
		init();
		return that;
	};
});
