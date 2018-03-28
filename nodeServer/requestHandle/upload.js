var queryString=require('querystring');
var upload=function(response,postData){
	console.log('request handler "upload" was called.');
	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent: " + queryString.parse(postData).text);
    
    response.end();
}
exports.upload=upload;