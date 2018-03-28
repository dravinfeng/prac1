$Import('core.obj.parseParam');
$Import('core.util.getUniqueKey');
$Import('core.util.URL');
/**
 * 加载js并监听结果
 * @id STK.core.io.scriptLoader
 * @alias STK.core.io.scriptLoader
 * @param {Object} oOpts 附加参数
 * @return {Element} scriptLoader的句柄对象
 * @author fengxinglong
 * @example
 * STK.core.io.scriptLoader({url:'http://js.wcdn.cn/t3/platform/_html/json.js',
 * 'onComplete': function(oData, sVarName){
 * console.dir(oData);
 * },
 * 'varname': 'json'
 * });
 */
STK.register('core.io.scriptLoader', function(){
	var entityList = {};
	var default_opts = {
		'url': '',
		'charset': 'UTF-8',
		'timeout': 30 * 1000,
		'args': {},
		'onComplete': function(){},
		'onTimeout': null,
		'isEncode' : false,
		'uniqueID': null
	};
	
	return function(oOpts){
		var js, requestTimeout;
		var opts = STK.core.obj.parseParam(default_opts, oOpts);
		
		if (opts.url == '') {
			throw 'scriptLoader: url is null';
		}
		
		
		var uniqueID = opts.uniqueID || STK.core.util.getUniqueKey();
		
		
		js = entityList[uniqueID];
		if (js != null && STK.IE != true) {
			js.parentNode.removeChild(js);
			js = null;
		}
		if (js == null) {
			js = entityList[uniqueID] = STK.C('script');
		}
		
		js.charset = opts.charset;
		js.id = 'scriptRequest_script_' + uniqueID;
		js.type = 'text/javascript';
		if (opts.onComplete != null) {
			if (STK.IE) {
				js['onreadystatechange'] = function(){
					if (js.readyState.toLowerCase() == 'loaded' || js.readyState.toLowerCase() == 'complete') {
						try{
							clearTimeout(requestTimeout);
							document.getElementsByTagName("head")[0].removeChild(js);
						}catch(exp){
							
						}
						opts.onComplete();
					}
				};
			}
			else {
				js['onload'] = function(){
					try{
						clearTimeout(requestTimeout);
						js.parentNode.removeChild(js);
					}catch(exp){}
					opts.onComplete();
				};
				
			}
			
		}
		
		js.src = STK.core.util.URL(opts.url,{
			'isEncodeQuery' : opts['isEncode']
		}).setParams(opts.args);
		
		document.getElementsByTagName("head")[0].appendChild(js);
		
		if (opts.timeout > 0 && opts.onTimeout != null) {
			requestTimeout = setTimeout(function(){
				try{
					document.getElementsByTagName("head")[0].removeChild(js);
				}catch(exp){
					
				}
				opts.onTimeout();
			}, opts.timeout);
		}
		return js;
	};
});
