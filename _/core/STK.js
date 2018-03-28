var STK = (function() {
	var that = {};
	var errorList = [];

    that.inc = function (key) {
		return true;
	};

    that.register = function (ns, maker) {
		if(!ns || !maker){return false};
		var NSList = ns.split('.');
		var step = that;
		var k = null;
		while(k = NSList.shift()){
			if(NSList.length){
				if(step[k] === undefined){
					step[k] = {};
				}
				step = step[k];
			}else{
				if(step[k] === undefined){
					try{
						step[k] = maker(that);
					}catch(exp){
						
					}
				}
			}
		}
	};

	//STK.IE
	that.IE = /msie/i.test(navigator.userAgent);
	that.IE6= /msie 6/i.test(navigator.userAgent);

	//STK.E
	that.E = function(id) {
		if (typeof id === 'string') {
			return document.getElementById(id);
		} else {
			return id;
		}
	};
	//STK.C
	that.C = function(tagName) {
		var dom;
		tagName = tagName.toUpperCase();
		if (tagName == 'TEXT') {
			dom = document.createTextNode('');
		} else if (tagName == 'BUFFER') {
			dom = document.createDocumentFragment();
		} else {
			dom = document.createElement(tagName);
		}
		return dom;
	};
	
	that.log = function(str){
		errorList.push('[' + (new Date()).toString() + ']: ' + str);
	};
	
	that.getLogs = function(){
		return errorList;
	};
	return that;
})();
$Import = STK.inc;
$Import('core.pageM');
$Import('config.host');