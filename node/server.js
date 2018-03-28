/**
 *@author xl.feng
 * 代理入口
 */
var http=require("http");
var url=require("url");
var server=http.createServer(function(request,response){
    response.writeHead(200,{
    	"Content-Type":"text/png"
    })
    response.write("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAeCAIAAAA0IQ7mAAABXklEQVRYhe2WsWoCQRCGf8XGyuewPpu8RTrBIo1C6oCWqVIasA4kjYWQztYXMAim9jms7CTFcsMxzqx7e6s59vbrHM7D7z53uNZus0WTaP/3D7g3STh2Ot7fPM1W4rw7H3nf8w6EL6w9iJrgX5iVPM1WZlJz4WCFu/NRzVUNjV9a+683AIPxq2UiEjzv+ftFnLeHiyq3Dbmlw+7nSzHtEZS7LftsSpqqcM6L3JZWV21pie/SJAw3W8bPxzuAh+epNll/HgA8Tvp0weWEYfKy7MenXwC9ZWaZMOSlRZIetsjFjCQk/7KItsjFjCQcbKEVRpk/swYJQ7ItJrXn1WwJEsY1W2iF2Rn2gyRv0bYISV61hVi42LZKZ3th5GENYl4XW1QszAzZ0naHzi07z+6Usu0tM3aeNW7ypsW2lOZMVS3L2Q7bUi7O6tKKlca9Syfh2EnCsZOEYycJx07jhP8A+4+vZEWMxcwAAAAASUVORK5CYII=");
    response.end();
});
server.listen(8080,'127.0.0.1', function () {
    console.log("start:"+server.address().port);
});
