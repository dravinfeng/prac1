/**
 *验证url
 @author xinglong.feng
 */

STK.register('core.reg.url', function(){
	return function(url){
		var regexp=/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
		return regexp.test(url);
	}
});
