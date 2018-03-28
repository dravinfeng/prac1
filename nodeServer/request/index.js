var server=require('./server');
var router=require('./router');
var handle={};
handle['/']=require("../requestHandle/start").start;
handle['/upload']=require("../requestHandle/upload").upload;

server.start(router.route,handle);
