/**
 * 用作接口请求的管理工具
 * @param {Object} key
 * @param {Object} url
 */
$Import("core.io.mobileAjax");
STK.register('core.io.mobileInter',function(){
	var ajax=STK.core.io.mobileAjax;
	return function(){
		var that={};
		var list={};
		that.add=function(key,url){
			if(!key || !url){
				return false;
			}
			!list[key] &&(list[key]=url);
		};
		that.get=function(key){
			return list[key];
		};
		that.request=function(key,spec){
			return ajax(that.get(key),spec);
		
		};
		return that;
	};
});