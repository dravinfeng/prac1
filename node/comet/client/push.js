window.onload=function(){
	var aa=$('#aa')[0];
	var text=$('#text')[0];
	var rsP=$('#rs')[0];
	
	var cbk=function(rs){
			$('<div>'+rs+'</div>').appendTo(rsP);
	};
	$(aa).bind('click',function(e){
		if(text.value){
			$.ajax('/upload',{
				'data':{text:text.value},
				'type':'POST',
				'success':cbk
			});
		}
	});
	
	
	
	//服务器端 推送信息 接收
	
	var chat=new EventSource('/upload');
	chat.onmessage=function(event){
		var msg=event.data;
		cbk(msg);
	}
	
}
