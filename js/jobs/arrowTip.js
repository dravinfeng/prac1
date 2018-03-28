$Import('core.dom.buildDom');
$Import('core.ui.arrowTip');
/**
 * 
 */

STK.register('jobs.arrowTip',function(){
	return function(){
		var arrowTip=STK.core.ui.arrowTip;
		var buildDom=STK.core.dom.buildDom;
		
		var node=document.body; //外层节点
		var that={
			DOM:{}
		};
		
		var handle;
		var C={
			initDialog:function(){
				
				arrowTip("测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",{el:STK.E('aa'),css:{width:'50px'}});
				
				
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
