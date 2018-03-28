var fs=require('fs');
var queryString=require('querystring');
var start=function(response,postData){
	response.writeHead(200, {"Content-Type": "text/html"});
	
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
		var fileReadStream = fs.createReadStream('./client/index.html',rOption);

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