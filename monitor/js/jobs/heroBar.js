/**
 * 
 */

STK.register('jobs.heroBar',function(){
	return function(){

		var handle,node; //外层节点
		var that={};
	
		var opts={
			element: 'jobs_heroBar',
			data: [
			{device: '1', geekbench: 136},
			{device: '3G', geekbench: 137},
			{device: '3GS', geekbench: 275},
			{device: '4', geekbench: 380},
			{device: '4S', geekbench: 655},
			{device: '5', geekbench: 1571}
			],
			xkey: 'device',
			ykeys: ['geekbench'],
			labels: ['Geekbench'],
			barRatio: 0.4,
			xLabelMargin: 10,
			hideHover: 'auto'
		};
		
	
		var checkParent=function(){
			return node;
		}
		//数据销毁
		var destroy = function(){

		};
		
		//初始化
		var init=function(){
			node=STK.E('jobs_heroBar');
			if(!checkParent()){
				return;
			}
			Morris.Bar(opts);
		};
		
		that.destroy=destroy;
		
		init();
		return that;
	}
});
