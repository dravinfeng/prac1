/**
 * @author xinglong.feng
 */
$Import('core.util.getUniqueKey');
$Import('core.obj.parseParam');
$Import('core.util.hideContainer');
$Import('core.util.easyTemplate');
STK.register('core.io.getIframeTrans', function(){
	var TEMP = '<#et tname param><iframe id="${param.id}" name="${param.id}" height="0" width="0" frameborder="no"></iframe></#et>';
	var hideContainer=STK.core.util.hideContainer;
	return function(spec){
		var box, conf, that;
		conf = STK.core.obj.parseParam({
			'id' : 'STK_iframe_' + STK.core.util.getUniqueKey()
		}, spec);
		that = {};
		
		box = STK.C('DIV');
		box.style.display="none";
		box.innerHTML = STK.core.util.easyTemplate(TEMP, conf);
		hideContainer.appendChild(box);
		
		that.getId = function(){
			return conf['id'];
		};
		
		that.destroy = function(){
			box.innerHTML = '';
			try{
				box.getElementsByTagName('iframe')[0].src = "about:blank";
			}catch(exp){
			
			}
			hideContainer.removeChild(box);
			box = null;
		};
		
		return that;
	};
});