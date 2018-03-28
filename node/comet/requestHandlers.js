var fs=require('fs');
var queryString=require('querystring');
var start=function(response,postData){
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '<script src="http://fe.zhuqu.com/fe-comm/js/jquery-20130419-150243.js" type="text/javascript"></script>'+
    '</head>'+
    '<body>'+
    '<textarea id="text" name="text" rows="4" cols="40"></textarea>'+
    '<input type="button" id="aa" value="Submit text" />'+
	'<div id="rs"></div>'+
    '<script src="/client/push.js" type="text/javascript"></script>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
var upload=function(response,postData){
	console.log('request handler "upload" was called.');
	//response.writeHead(200, {"Content-Type": "text/plain"});
    //response.write("" + queryString.parse(postData).text);
    //response.end();
    
    
    //单独为推送信息 开发
    response.writeHead(200);
    response.end();
    
    
    clients.forEach(function(client){
    	client.write(""+queryString.parse(postData).text);
    })
    

}
var pushJs=function(response,postData){
	console.log('request handler "upload" was called.');
	response.writeHead(200, {"Content-Type": "application/x-javascript"});
	
	var rOption = {
	  flags : 'r',
	  encoding : 'utf8',
	  mode : 0666
	}

	var wOption = {
	  flags: 'a',
	  encoding: 'utf8',
	  mode: 0666   
	}
	var temp=[],tfile;
	
	try{
		fs.existsSync(tfile) && fs.unlink(tfile);
		var fileReadStream = fs.createReadStream('./client/push.js',rOption);

		fileReadStream.on('data',function(data){
		  temp.push(data);
		});
		fileReadStream.on('end',function(){
		  temp=temp.join('');
		  response.write("" + temp);
		   response.end();
		  temp=null;
		});
		
	}catch(e){
		console.log(e)
	}

}
exports.start=start;
exports.upload=upload;
exports.pushJs=pushJs;