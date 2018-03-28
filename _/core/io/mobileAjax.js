/**
 * mobile请求ajax
 * @author xinglong.feng
 */
$Import('core.obj.parseParam');
$Import('core.json.jsonToQuery');
$Import('core.func.isFunction');
STK.register('core.io.mobileAjax', function(){

	var jsonToQuery=STK.core.json.jsonToQuery;
	var parseParam=STK.core.obj.parseParam;
	var isFunction=STK.core.func.isFunction;
	var queryToJson=function(str){
		return window.eval('('+str+')');
	};
	return function(url,conf){
        var xmlhttp,tm;
		var param=parseParam({
			'data':{},
			'args':{},
			'type':'POST',
			'dataType':'json',
			'timeout':30000
		},conf);
		var method=param.type;
		var cbk;
		if(isFunction(conf.callback)){
			cbk= {
			'success':conf['callback'],
			'error':conf['callback'],
			'fail':conf['callback']
			}
		}else{
			cbk=conf['callback'];
		}
		var C=parseParam({
			'success':function(){},
			'error':function(){},
			'fail':function(){}
		},cbk);
		
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function(){
			clearTimeout(tm);

			if (xmlhttp.readyState == 4){
				var data=queryToJson(xmlhttp.responseText||"");
				if(xmlhttp.status==200){
					if(data.status=='100'){
						C.success(data,conf.args);
					}else if(data.status=='1004'){
						if(confirm("您尚未登录，请登录后操作。是否马上登录？")){
							window.location.href="/sina-weibo-signin";
						};
						C.error(data,conf.args);
					}else{
						C.error(data,conf.args);
					}
				}else if(xmlhttp.status==0){
					C.fail('timeout');
				}else{
					C.fail(data);
				}
			}
        };

		var _param=jsonToQuery(param.data,1);
        
        if(method=="POST"){
			xmlhttp.open(method, url, true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        	xmlhttp.send(_param);
		}else{

			if(url.indexOf('?')!=-1){
				url+='&'+_param;
			}else{
				url+='?'+_param;
			}
			xmlhttp.open(method, url, true);
			xmlhttp.send();
		}
		
		tm=setTimeout(function(){
			try {
				xmlhttp.abort();
			} 
			catch (exp) {}
			C.fail('timeout');
		},20*1000);
		return xmlhttp;
	}

});
