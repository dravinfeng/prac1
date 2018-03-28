$Import('core.dom.getBoundingClientRect');
/**
 * @id STK.core.dom.isInView
 * @alias STK.core.dom.isInView
 * @param {Element} node
 * @return {Boolean} true/false
 * @author xinglong.feng
 * @example
 * STK.core.dom.isInView($.E('test')) == true;
 * STK.core.dom.isInView($.E('test'),20) == true;  //第二个参数 20 表示  到距离20px范围内即 返回 true
 */
STK.register('core.dom.isInView', function(){
	var getBd=STK.core.dom.getBoundingClientRect;
	return function(node,dim){

		var pos,t,l,h,w,idx,d;
		if(dim && (typeof dim=='string' || typeof dim=='number')){
			d = parseInt(dim,10);
			!d && (d=0);
		}else{
			d=0;
		}

		var wh=window.jQuery? window.jQuery(window).innerHeight():window.innerHeight;
		var ww=window.jQuery? window.jQuery(window).innerWidth():window.innerWidth;

		pos=getBd(node);
		t=pos.top-d,l=pos.left-d,h=pos.height+d+d,w=pos.width+d+d;
		
		if(node.style.display=='none' || (!w && !h)){
			return false;
		}
		if(((t>=0 && t<wh)||(t<0 && h+t>0))&&((l>=0 && l<ww)||(l<0 && w+l>0))){
			return true;
		}else{
			return false;
		}

	};
});
