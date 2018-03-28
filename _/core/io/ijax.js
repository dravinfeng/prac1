/**
 * @author xinglong.feng
 */
$Import('core.io.getIframeTrans');
$Import('core.obj.parseParam');
$Import('core.util.getUniqueKey');

STK.register('core.io.ijax', function(){
	return function(spec){
		var conf,cbkEl, trans, uniqueID, timer, destroy, makeCallback,that;
		
		conf = STK.core.obj.parseParam({
			'url'			:'',
			'form'			: null,
			'timeout'		: 30 * 1000,
			'onComplete'	: function(){},
			'onTimeout'		: function(){},
			'onFail'		: function(){},
			'asynchronous'	: true,
			'responseName'	: null,
			'varkey'		: 'callback'
		}, spec);
		
		that = {};
		
		if(!conf.form){
			throw 'ijax need form in parameters object';
		}
		
		trans = STK.core.io.getIframeTrans();
		
		uniqueID = conf.responseName || ('STK_ijax_' + STK.core.util.getUniqueKey());

		makeCallback=function(){
			var el=$('input[ttt="_e_e"]',conf['form'])[0];
			if(el){
				$(el).remove();
			}
			cbkEl=$('<input ttt="_e_e" type="hidden" name="'+conf['varkey']+'" value="'+uniqueID+'">').appendTo(conf['form']);
		};
		
		destroy = function(){
			$(cbkEl).remove();
			cbkEl=null;
			window[uniqueID] = null;

			trans.destroy();
			trans = null;
			clearTimeout(timer);
		};
		
		timer = setTimeout(function(){

			conf.onTimeout('timeout');
			conf.onFail('fail');
			destroy();
		}, conf.timeout);
		
		
		window[uniqueID] = function(oResult, query) {
			conf.onComplete(oResult, query);
			destroy();
		};
		
		
		conf.url && (conf.form.action = conf.url);
		
		makeCallback();
		conf.form.target = trans.getId();
		conf.form.submit();
		
		that.abort = destroy;
		
		return that;
		
	};
});