var http=require('http'),url=require('url');
var start=function(route,handle){
	var onRequest=function(request,response){
		var postData='';
		var pathname=url.parse(request.url).pathname;
		if(/favicon\.ico/.test(pathname)){
			return;
		}
		request.setEncoding('utf8');
		request.addListener('data',function(postDataChunk){
			postData+=postDataChunk;
			console.log(postDataChunk)
			console.log('Recevied POST data chunk'+postDataChunk+'.');
		});
		request.addListener('end',function(){
			route(pathname,handle, response, postData);
		});

	};
	http.createServer(onRequest).listen(8888);
	console.log('server has started')
}

exports.start=start;