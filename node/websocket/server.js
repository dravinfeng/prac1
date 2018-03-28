var http=require('http'),url=require('url');
var ws=require('websocket-server');
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
			console.log(pathname)
			if(/upload/.test(pathname)){
				console.log(1234)
				return;
			}
			route(pathname,handle, response, postData);
		});
		// route(pathname,handle);
		// response.writeHead(200,{'Content-Type':"text/plain"});
// 
		// response.write("../demo");
// 
		// response.end();
	};
	
	var httpserver=new http.Server();
	httpserver.on('request',onRequest);
	// http.createServer(onRequest);

	console.log('server has started');
	
	var wsserver=ws.createServer({server:httpserver});
	wsserver.on('connection',function(socket){
		socket.send('wlcome to the that room.');
		socket.on('message',function(msg){
			wsserver.broadcast(msg);
		});
	});
	
	wsserver.listen(8888);
}

exports.start=start;