var route =function(pathname,handle,response,postData){
	console.log('about to route a request for '+pathname);
	if(typeof handle[pathname]!='function'){
		console.log('no request handler found for'+pathname);
		response.writeHead(404,{'Content-Type':'text/plain'});
		response.write('404 not found,^V^');
		response.end();
		return;
	}
	handle[pathname](response,postData);
};
exports.route=route;