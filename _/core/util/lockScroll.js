$Import('core.evt.eventUtil');
$Import('core.evt.fireEvent');
$Import('core.util.scrollLength');
/**
 * 锁定滚动
 * @id STK.core.util.lockScroll
 * @author xinglong.feng
 * @example
 * var a=STK.core.util.lockScroll(1/0);
 * 
 */


STK.register('core.util.lockScroll', function(){
	var scrollLength=STK.core.util.scrollLength;
	var eventUtil=STK.core.evt.eventUtil;
	var fireEvent=STK.core.evt.fireEvent;
	var pos,loc,st;
	var isMobile= /(iPad|iPhone|Android)/.test(navigator.userAgent);
	var move=function(e){

		e.preventDefault && e.preventDefault();
		e.returnValue=false;
		e.stopPropagation && e.stopPropagation();
		return false;
	}
	var start=function(e){
		pos.y = e.targetTouches[0].pageY;
        pos.x = e.targetTouches[0].pageX;
	}
	var end=function(e){
		//stop the zoom in event be motivated ,for the handle equipment's dobule click event.  
		move(e);
		y = e.targetTouches[0].pageY;
        x = e.targetTouches[0].pageX;
		if(Math.abs(pos.y-y)<3 ||Math.abs(pos.x-x)<3){
			setTimeout(function(){fireEvent(e.target,'click');},2);
		}
		pos=null;
		return false;
	}
	var keyFunc=function(e){
		if(37<=e.keyCode && e.keyCode<=40){
			return move(e);
		}
	}
	var scrollFunc=function(e){
		clearTimeout(st);
		st=setTimeout(function(){
			window.scrollTo(loc.scrollLeft,loc.scrollTop);
		},5);
		
	}
	return function(sta){
		loc=scrollLength();
		if(sta){
			document.documentElement.style.overflow='hidden';
			isMobile && (document.body.style.overflow='hidden');//mobile
			eventUtil.addEvent(window,'touchmove',move);
			// eventUtil.addEvent(document.body,'keydown',keyFunc);
			eventUtil.addEvent(document.body,'touchstart',start);
			eventUtil.addEvent(document.body,'touchend',end);
			
			if(STK.IE){
				eventUtil.addEvent(document.body,'scroll',scrollFunc);
			}else{
				eventUtil.addEvent(window,'scroll',scrollFunc);
			}
			
		}else{
			document.documentElement.style.overflow='';
			isMobile && (document.body.style.overflow=''); //mobile			eventUtil.removeEvent(window,'touchmove',move);
			// eventUtil.removeEvent(document.body,'keydown',keyFunc);
			eventUtil.removeEvent(document.body,'touchstart',start);
			eventUtil.removeEvent(document.body,'touchend',end);			if(STK.IE){
				eventUtil.removeEvent(document.body,'scroll',scrollFunc);
			}else{
				eventUtil.removeEvent(window,'scroll',scrollFunc);
			}
		}
	}

});
