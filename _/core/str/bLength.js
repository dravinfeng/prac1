/**
 * Get byte length
 * @id STK.core.str.bLength
 * @alias STK.core.str.bLength
 * @param {String} str
 * @return {Number} n
 * @author xinglong.feng
 */
STK.register('core.str.bLength', function(){
	return function(str){
		if (!str) {
			return 0;
		}
		var aMatch = str.match(/[^\x00-\xff]/g);
		return (str.length + (!aMatch ? 0 : aMatch.length));
	};
});
