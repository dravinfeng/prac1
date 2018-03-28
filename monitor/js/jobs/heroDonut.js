/**
 * 
 */

STK.register('jobs.heroDonut',function(){
	return function(){

		var handle,node; //外层节点
		var that={};
		
		var opts={
		element: 'jobs_heroDonut',
		data: [
		{label: 'Jam', value: 25 },
		{label: 'Frosted', value: 40 },
		{label: 'Custard', value: 25 },
		{label: 'Sugar', value: 10 }
		],
		formatter: function (y) { return y + "%" }
		}
		
		
		
		var checkParent=function(){
			return node;
		}
		//数据销毁
		var destroy = function(){

		};
		
		//初始化
		var init=function(){
			node=STK.E('jobs_heroDonut');
			if(!checkParent()){
				return;
			}
				Morris.Donut(opts);
		};
		
		that.destroy=destroy;
		
		init();
		return that;
	}
});
