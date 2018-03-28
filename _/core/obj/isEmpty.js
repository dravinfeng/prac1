/**
 * 合并参数
 * @id STK.core.obj.isEmpty
 * @alias STK.core.obj.isEmpty
 * @param {Object} o
 * @param {Object} isprototype
 * @return {Boolean} ret
 * @author xinglong.feng
 * @example
 * STK.core.obj.isEmpty({}) === true;
 * STK.core.obj.isEmpty({'test':'test'}) === false;
 */
STK.register('core.obj.isEmpty',function(){
	return function(o,isprototype){
		var ret = true;
		for(var k in o){
			if(isprototype){
				ret = false;
				break;
			}else{
				if(o.hasOwnProperty(k)){
					ret = false;
					break;
				}
			}
		}
		return ret;
	};
});