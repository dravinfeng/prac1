var http=require('http');

/**
 * @param id  goods id,
 * @param cbk 异步回调方法 
 * @param cookie 表示 传入的 head 头中的  Cookie值
 * cbk 有三个参数 分别为  status(200为成功，标准http请求状态码，302为未登录) , id 表示当前对应的 商品id, rs表示  淘宝商品 地址
 */
var getData=function(id,cookie,cbk){
	

var options = {
  hostname: 'u.alimama.com',
  port: 80,
  path: '/union/spread/common/allCode.htm?specialType=item&auction_id='+id,
  method: 'GET'
};

var reg=/var\s+clickUrl\s+\=\s+['|"][^'|^"]+['|"'"]/;

options['headers']={
	"User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)", 
	"Cookie":cookie
}
var req = http.request(options, function(res) {
  status=res.statusCode;
  
  res.setEncoding('utf8');
  var postData='';
  res.on('data', function (chunk) {
  	postData+=chunk;
  });
  res.on('end', function () {
  	var rs=reg.exec(postData);
    if(rs && rs.length){
    	rs=rs[0];
    	rs=rs.replace(/var\s+clickUrl\s+\=\s+['|"]/,"").replace(/['|"]/,"");
    }else{
    	rs="";
    }
    
    cbk(status,id,rs);
  	
  });
});



req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
  cbk("",id,e.message);
});


req.end();

}
exports.getData=getData;