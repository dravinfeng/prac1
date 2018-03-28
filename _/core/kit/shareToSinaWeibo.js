$Import('core.dom.buildDom');
$Import('core.evt.delegatedEvent');
$Import('core.util.URL');
$Import('core.obj.parseParam');

/**
 * 分享到新浪微博
 * author fengxinglong
 * demo
 * STK.core.kit.shareToSinaWeibo({pic:"http://。。。。。。aa.jpg",title:'aaaaa123124'})
 */

STK.register('core.kit.shareToSinaWeibo',function(){
	
	var parseParam=STK.core.obj.parseParam;
	var URL=STK.core.util.URL;
	return function(options){
				
		var handle;
		var that={
		};
		var _url='http://service.weibo.com/share/share.php';
		var opts=parseParam({
			url:'http://www.zhuqu.com',
			appkey:'',
			title:'',
			pic:'',
			ralateUid:'3229251653',
			language:'zh_cn',
			searchPic:false
		},options);
		
		if(opts.pic){
			opts.pic=opts.pic.replace(/\|+/g,"||");
		}
		//数据销毁
		var destroy = function(){
			handle.close();
			handle=null;
		};
		
		//初始化
		var init=function(){
			var url=URL(_url).setParams(opts,{isEncodeQuery:true});
			handle=window.open(url.toString(),'newwindow','height=500,width=680,top=50,left='+(window.screen.width-580)/2+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no, alwaysRaised=yes, z-look=yes,titlebar=no');
		};
		
		that.destroy=destroy;
		
		init();
		return that;
	}
});
