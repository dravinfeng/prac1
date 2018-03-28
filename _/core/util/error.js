
/**
 * @author xinglong.feng
 * 流氓的东西，慎用（内部可以，外部不要用）
 */
STK.register('core.util.error', function(){
	
	$(window).error(function(msg,url,i){
		alert('信息：'+msg+'，url:'+url+'，行数：'+i);
		return true;
	});
});
