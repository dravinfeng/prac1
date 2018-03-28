/**
 * 请求ajax
 * @author xinglong.feng
 * that.request(key,cbk,param); 典型调用
 */
$Import('core.obj.parseParam');
STK.register('core.io.ajax', function(){
	var parseParam=STK.core.obj.parseParam;
	return function(url,conf){
		!conf && (conf={});
		//jsonp后续再支持
		var _jqXHR={};
		var param=parseParam({
			'data':{},
			'args':{},
			'type':'POST',
			'dataType':'json',
			'timeout':30000
		},conf);

		param['success']=function(data,sta,jqXHR){
			if(param.dataType=='jsonp'){
				C.success(data,conf.args);
				return;
			}
			
			try{
				
				if(jqXHR.readyState==4){
					if(param['dataType']=='jsonp'){
						
					}else if(param['dataType']=='script'){
						if (jqXHR.status == 200) {
							data = {'status': '100'};
						}
						else {
							data = {'status': '101','msg':'fail'};
						}
					}else if (jqXHR['responseType'] === 'xml') { //未经过调试
						data = $.parseXML(jqXHR.responseXML);
					}
					else 
						if (jqXHR['responseType'] === 'text') { //未经过调试
							data = jqXHR.responseText;
						}
						else {
							data=$.parseJSON(jqXHR.responseText||'');
						}
					
					if(jqXHR.status==200){
						if(data.status=='100'){
							C.success(data,conf.args);
						}else if(data.status=='1004'){
							try{
								STK.core.channel.logIn.fire('logIn'); //触发登录功能
								C.error(data,conf.args);
							}catch(e){}
						}else{
							C.error(data,conf.args);
						}
					}else if(jqXHR.status==0){
						//abort
						C.fail('timeout',conf.args);
					}else{
						C.fail(data,conf.args);
					}
					
				}
			}catch(e){
				throw(e);
			}
		};
		param['error']=function(jqXHR,sta,errorThrown){
			alert('status:'+jqXHR.status+'info:'+sta);
			C.fail('timeout',conf.args);		
		};

		var _conf;
		if($.isFunction(conf['callback'])){
			_conf= {
			'success':conf['callback'],
			'error':conf['callback'],
			'fail':conf['callback']
			}
		}else{
			_conf=conf['callback'];
		}
		var C=parseParam({
			'success':function(){},
			'error':function(){},
			'fail':function(){}
		},_conf);
		
		
		
		
		_jqXHR=$.ajax(url,param);
		return _jqXHR;
	}
});