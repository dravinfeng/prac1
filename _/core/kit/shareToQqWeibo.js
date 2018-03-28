$Import('core.dom.buildDom');
$Import('core.evt.delegatedEvent');
$Import('core.util.URL');
$Import('core.obj.parseParam');

/**
 * 分享到新浪微博
 * author fengxinglong
 * demo
 * STK.core.kit.shareToQqWeibo({pic:"http://。。。。。。aa.jpg",title:'aaaaa123124'})
 */

STK.register('core.kit.shareToQqWeibo',function(){
	
	var parseParam=STK.core.obj.parseParam;
	var URL=STK.core.util.URL;
	return function(options){
				
		var handle;
		var that={
		};
		var _url='http://share.v.t.qq.com/index.php';
		var opts=parseParam({
			c:'share',
			a:'index',
			url:'http://www.zhuqu.com',
			appkey:'801354344',
			title:'',
			pic:''
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
