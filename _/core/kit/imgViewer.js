$Import('core.ui.dialog');
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
