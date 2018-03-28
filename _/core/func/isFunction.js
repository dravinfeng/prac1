/**
 * Check Array
 * @id STK.core.arr.isFunction
 * @alias STK.core.arr.isFunction
 * @param {Function} o
 * @return {Boolean} TRUE/FALSE
 * @author xinglong.feng
 * @example
 * var li1 = function(){}
 * var bl2 = STK.core.arr.isArray(li1);
 * bl2 == TRUE
 */
STK.register('core.func.isFunction', function(){
	return function(o){
		return Object.prototype.toString.call(o) === '[object Function]';
	};
});
