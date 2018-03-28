var server=require('./server');
var router=require('./router');
var requestHandlers = require("./requestHandlers1");
var handle={};
handle['/']=requestHandlers.start;
handle['/start']=requestHandlers.start;
handle['/server']=requestHandlers.server;
server.start(router.route,handle);