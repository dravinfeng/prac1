
var $E=function(id){
	return document.getElementById(id);
}
var source=new EventSource("http://localhost:8888/server");
source.onmessage=function(event){
	var d=document.createElement('div');
	d.innerHTML=event.data+'<br>';
	
	
	$E('rs').inertBefore(d,$E('rs').firstChild);
}
source.onerror=function(event){
	console.log(event)
}