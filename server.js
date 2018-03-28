var PORT = 3100;

var http = require('http');
var url=require('url');
var fs=require('fs');
var conf=require('./conf').types;
var path=require('path');

var childProcess=require('child_process');

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join("./", pathname);
    console.log(realPath);

    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
        	if(realPath=="1234"){
        		response.writeHead(302,{
			    	"Content-Type":"text/html",
			    	"Location":'http://www.baidu.com'
			    })
			    
			    response.end();
			    return;
        	}
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = conf[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
childProcess.exec("open http://localhost:"+PORT+'/history.html');
console.log("Server runing at port: " + PORT + ".");