$Import('core.ui.dialog');
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
