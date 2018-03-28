$Import('core.dom.buildDom');
$Import('core.kit.imgViewer');
$Import('core.ui.alert');
/**
 * 搜索结果模块
 */

STK.register('jobs.imgViewer',function(){
	return function(){
		var imgViewer=STK.core.kit.imgViewer;
		var buildDom=STK.core.dom.buildDom;
		
		var node; //外层节点
		var that={
			DOM:{}
		};
		
		var handle;
		var C={
			initDialog:function(){
				handle=imgViewer('aaaaaa',{});
				handle.open();
				STK.core.ui.alert('1234')
			}
		}

		
		//事件处理函数
		var bindDOMFuncs={
			'scroll':function(e){

			}
		}
		//绑定事件函数
		var bindDom=function(){
			
		};

		var parseDom=function(){
			that.DOM=buildDom(node);
		};
		
		var checkParent=function(){
			return node;
		}
		//数据销毁
		var destroy = function(){
			
		};
		
		//初始化
		var init=function(){
			node=STK.E('jobs_imgViewer'); //外层id
			if(!checkParent()){
				return;
			}
			parseDom();

			bindDom();
			C.initDialog();
			
		};
		
		that.destroy=destroy;
		
		init();
		return that;
	}
});
