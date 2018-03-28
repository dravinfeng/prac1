$Import('core.dom.setStyle');
/**
 * 轻弹出层
 * @param {Object} document
 */
STK.register('core.ui.tipAlert',function(){
	var dialog=STK.core.ui.dialog;
	var setStyle=STK.core.dom.setStyle;
	return function(info,spec){
		!spec && (spec={});
		var that={parent:''};
		var opts={
			width:spec.width,
			height:spec.height,
			time:spec.time,
			css:spec.css||{} //自己设置样式
		}
		var st;
		var d=STK.C('div');
		d.className="zq_tips";
		d.style.left=spec.left+'px',d.style.top=spec.top+'px';
		opts.width && (d.style.width=opts.width+'px');
		opts.height && (d.style.height=opts.height+'px');
		
		for(var i in opts.css){
			setStyle(d,i,opts.css[i]);
		}
		
		that.parent=d;

		d.innerHTML=info;
		document.body.appendChild(d);
		
		that.destroy=function(){
			clearTimeout(st);
			st=null;
			d && document.body.removeChild(d);
			that.d=d=null;
		}
		opts.time && (st=setTimeout(that.destroy,opts.time));
		return that;
	};
});
