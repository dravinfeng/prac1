$Import('core.ui.dialog');
$Import('core.channel.logIn');
$Import('core.evt.delegatedEvent');
$Import('core.func.isFunction');
/**
 * 全局登录功能
 * @author xinglong.feng
 * 调用实例：
 * STK.core.channel.logIn.fire('logIn',{callback:function(sta,args){},args:data}); //触发登录功能   
 * 传入的第二个参数  包含两个字段 callback 以及  args字段，args 为回调时 回传的参数。
 * demo2 直接调用微博登录
 * STK.core.channel.logIn.fire('weiboLogin',{callback:function(sta,args){},args:data}); //触发登录功能
 * * demo3 直接调用qq登录                                                                               
 * * STK.core.channel.logIn.fire('qqLogin',{callback:function(sta,args){},args:data}); //触发登录功能
 */
STK.register('core.kit.logIn',function(){
	var dialog=STK.core.ui.dialog;
	var delegate=STK.core.evt.delegatedEvent;
	var channel=STK.core.channel.logIn;
	var isFunc=STK.core.func.isFunction;
	
	var that={
		dialog:'',
		rs:'',
		winHandle:''
	}
	var urls={
		weibo:'/sina-weibo-signin?from=window',
		qq:'/qq-weibo-signin?from=window'
	}
	var handle;

	var C={
		removeDlgEvt:function(){
			handle.destroy();
			handle=null;
			that.dialog.destroy();
			that.dialog=null;
		},
		bindDlgEvt:function(parent){
			handle=delegate(parent);
			handle.add('loginInter','click',bindDOMFuncs['loginInter']);
		}
	};

	var bindDOMFuncs={
		'winClose':function(){
			that.winHandle && that.winHandle.close();
		},
		'logInRefresh':function(evt,sta){
			if(that.opts && isFunc(that.opts.callback)){
				that.opts.callback.call(null,sta,that.opts?that.opts.args:null);
				that.opts=null;
			}else{
				sta && window.location.reload();
			}
		},
		'loginInter':function(args){
			if(!args||!args.data.key){return};
			that.winHandle && !that.winHandle.closed && that.winHandle.close();
			that.winHandle=null;
			that.winHandle=window.open(urls[args.data.key],'newwindow','height=500,width=680,top=50,left='+(window.screen.width-580)/2+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no, alwaysRaised=yes, z-look=yes,titlebar=no');
			if(that.dialog){
				that.dialog.destroy();
				that.dialog=null;
			} 
		},
		'weiboLogin':function(args,opts){
			that.opts=opts;
			bindDOMFuncs['loginInter']({data:{key:'weibo'}});
		},
		'qqLogin':function(args,opts){
			that.opts=opts;
			bindDOMFuncs['loginInter']({data:{key:'qq'}});
		},
		'pop':function(e,opts){
			that.opts=opts;
			//var inner='<em class="zq_logo">&nbsp;</em></div><div class="zq_loginCon"><a href="javascript:void(0)" action-type="logInDialog" class="zq_loginOpt"><em> </em>点击登录&gt;</a><p class="zq_description">暂仅支持新浪微博账户登录</p>';
			var inner = '<div class="zq_loginBox">' +
                    	'<div class="zq_boxTitle"><em class="zq_logo">&nbsp;</em></div>' +
                    	'<p class="zq_titText">请使用合作网站账号进行登录</p>' +
                    	'<div class="zq_use clearfix">' +
                        	'<a href="javascript:void(0)" action-type="loginInter" action-data="key=weibo" class="zq_useSina">' +
                        		'<em></em>' +
                        		'<span>新浪微博</span>' +
                        	'</a>' +
                        	'<a href="javascript:void(0)" action-type="loginInter" action-data="key=qq" class="zq_useQQ">' +
                        		'<em></em>' +
                        		'<span>腾讯QQ</span>' +
                        	'</a>' + 
                    	'</div>' +
                    '</div>'
			that.dialog = dialog(inner,{width:400,closeCallback:C.removeDlgEvt});
			that.dialog.open();
			that.dialog.DOM['parentNode'] && C.bindDlgEvt(that.dialog.DOM['parentNode']);
		}
	}
	var bindListener=function(){
		channel.register('logIn',bindDOMFuncs['pop']);
		channel.register('logInRefresh',bindDOMFuncs['logInRefresh']);
		channel.register('weiboLogin',bindDOMFuncs['weiboLogin']);
		channel.register('qqLogin',bindDOMFuncs['qqLogin']);
	};
	
	var bindDom=function(parent){
		$(window).bind('unload',bindDOMFuncs['winClose']);
	};
	var destroy=function(){
		channel.remove('logIn');
		channel.remove('logInRefresh');
	}
	var  init=function(){
		bindListener();
	}
	init();
	return  that;

});
