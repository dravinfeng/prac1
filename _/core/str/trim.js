$Import('core.arr.inArray');
/**
 * 解决jquery不足
 * @id STK.core.util.listener
 * @author xinglong.feng
 * @example
 *@param loc  'left' or 'right' or null
 */


STK.register('core.str.trim', function(){
	return function(_str,loc){
	var str=_str||'';
	var rnotwhite = /\S/,
	// Used for trimming whitespace
	l = /^\s+/,
	r = /\s+$/;
	
	if (rnotwhite.test( "\xA0" ) ) {
		l = /^[\s\xA0]+/;
		r = /[\s\xA0]+$/;
	}
	
	str=str.toString();

	return loc=='left'? str.replace( l, "" ):(loc=='right'? str.replace( r, "" ) : str.replace( l, "" ).replace( r, "" ));

	}
});
