$Import('core.ui.dialog');
$Import('core.obj.parseParam');
/**
 *  
 * @author fengxinglong
 * @param {Object} info str,spec={buttons[text:"ok",callback:function(e){}]}
 */
STK.register('core.ui.confirm',function(){
	var dialog = STK.core.ui.dialog;
	var parse = STK.core.obj.parseParam;
	return function(info,spec){
		!spec && (spec={});
		var that={};
		var opts=parse({
			modal: true,
			width:300,
			close:false,
			buttons:[{"text":"确定"},
					 {"text":"取消"}]
		},spec,true);
		
		for(var i=0;i<spec.buttons.length;i++){
			spec.buttons[i].text && (opts.buttons[i].text=spec.buttons[i].text);
			(function(k){
				opts.buttons[i].callback=function(e){
					try{
						spec.buttons[k].callback(e,spec.data);
					}catch(e){}
					that.dialog.destroy();
				}
			})(i);
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
