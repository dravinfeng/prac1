/**
 * Get unique key
 * @id STK.core.util.getUniqueKey
 * @alias STK.core.util.getUniqueKey
 * @return {Number} n
 * @author xinglong.feng
 * @example
 * STK.core.util.getUniqueKey('') === '141281425000671';
 */
STK.register('core.util.getUniqueKey', function() {
	var _loadTime = (new Date()).getTime().toString(), _i = 1;
	return function() {
		return _loadTime + (_i++);
	};
});