(function(){
	var that={};
	var cbk=function(request, sender, sendResponse){
		window['_selfTaobaoData']=request;
		if(that.handle&& !that.handle.closed){
			that.handle.close();
		}
		that.handle=window.open(chrome.extension.getURL("html/index.html"),'newwindow','height=600,width=450,top=50,left='+(window.screen.width-580)/2+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no, alwaysRaised=yes, z-look=yes,titlebar=no');
	}
	
	chrome.extension.onRequest.addListener(cbk);

})();
