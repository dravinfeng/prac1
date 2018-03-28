var queryString=require('querystring');
var start=function(response,postData){
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '<style>'+
	'#rs{'+
	'	border:1px solid gray;'+
	'	height:300px;'+
	'	width:300px;'+
	'	overflow:auto;'+ 
	'}'+
	'</style>'+
    '</head>'+
    '<body>'+
    '<div id="rs"><em>&nbsp;</em></div>'+
    '<script>\
    var $E=function(id){return document.getElementById(id)};\n\
var source=new EventSource("http://localhost:8888/server");\n\
source.onmessage=function(event){\n\
	var d=document.createElement("div");\n\
	d.innerHTML=event.data+"<br>";\n\
	$E("rs").inertBefore(d,$E("rs").firstChild);\n\
};\n\
source.onerror=function(event){\n\
	console.log(event)\n\
};</script>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
var upload=function(response,postData){
	console.log('request handler "upload" was called.');
	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent: " + queryString.parse(postData).text);
    
    response.end();

}
var a=0;
var server=function(response,postData){
	console.log('request handler "server" was called.');
	response.writeHead(200, {"Content-Type": "text/event-stream"});
    response.write(''+(a++));
    response.end();

}
exports.start=start;
exports.upload=upload;
exports.server=server;