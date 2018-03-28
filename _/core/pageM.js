/**
 * 页面代码初始化开始执行
 * @param {Object} document
 */
$Import('core.evt.eventUtil');
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
