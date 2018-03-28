$Import('core.dom.buildDom');
$Import('core.evt.delegatedEvent');
$Import('core.util.URL');
$Import('core.obj.parseParam');

/**
 * 分享到QQ空间
 * author fengxinglong
 * demo
 * STK.core.kit.shareToQzone({pics:"http://。。。。。。aa.jpg",title:'aaaaa123124',desc:'',url:'标题的链接地址'})
 */

STK.register('core.kit.shareToQzone',function(){
	
	var parseParam=STK.core.obj.parseParam;
	var URL=STK.core.util.URL;
	return function(options){
				
		var handle;
		var that={
		};

		var _url='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey';
		var opts=parseParam({
			url:"http://www.zhuqu.com",
			desc:'',/*默认分享理由(可选)*/
			summary:'',/*分享摘要(可选)*/
			title:'',/*分享标题(可选)*/
			site:'',/*分享来源 如：腾讯网(可选)*/
			pics:'' /*分享图片的路径(可选)*/
		},options);
		
		
		//数据销毁
		var destroy = function(){
			handle.close();
			handle=null;
		};
		
		//初始化
		var init=function(){
			var url=URL(_url).setParams(opts).toString();
			handle=window.open(url,'newwindow','height=500,width=680,top=50,left='+(window.screen.width-580)/2+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no, alwaysRaised=yes, z-look=yes,titlebar=no');
		};
		
		that.destroy=destroy;
		
		init();
		return that;
	}
});
