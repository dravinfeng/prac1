// var cbk=function(request, sender, sendResponse){
	// console.log(arguments)
// }
// chrome.extension.onRequest.addListener(cbk);


(function(){
	var data="";
	chrome.runtime.connect();
	chrome.runtime.getBackgroundPage(function(wd){
		data=wd['_selfTaobaoData'];
		var dt;
		data &&(dt=data.msg);
		if(!dt){return};
	
		str=['<form id="form">',
			'<div class="item">',
			dt.shopNick? '店铺名称：'+dt.shopNick:'商品标题：'+dt.title,
			'</div>',
			'<div class="item">',
			dt.shopUrl?'店铺链接：'+dt.shopUrl:'商品链接：'+dt.itemUrl,
			'</div>',
			'<div class="item">',
				'分&nbsp;&nbsp;类：<textarea class="label" id="cls" placeholder=""></textarea>',
			'</div>',
			'<div class="item">',
				'标&nbsp;&nbsp;签：<textarea class="label" id="labels" placeholder="多个标签之间以逗号分隔"></textarea>',
			'</div>',
		'</form>'].join('');
		$("#content").html(str);
	});

	var trans={
		post:function(){
			var param={};
			
			var dt=data.msg,sta;
			if(dt.shopNick){
				sta="saveShop";
				param['shopNick']=dt.shopNick;
				param['shopUrl']=dt.shopUrl;
				param['shopTags']=$("#cls").val();
				param['shopClass']=$("#labels").val();
			}else{
				sta="saveItem";
				param['itemId']=dt.itemId;
				param['itemUrl']=dt.itemUrl;
				param['itemTags']=$("#cls").val();
				param['itemClass']=$("#labels").val();
			};

			$.ajax(window.STK.trans.shopAndItem[sta],{
				"data":param,
				"type":"POST",
				'success':function(data,sta,jqXHR){
					var data=$.parseJSON(jqXHR.responseText||'');
					if(data.status!="100"){
						alert(data.msg);
					}else{
						// window.close();
					}
					console.log(arguments);
				},
				'error':function(jqXHR,sta,errorThrown){
					alert('status:'+jqXHR.status+'info:'+sta);
					window.close();
				}
			});
			// setTimeout(function(){
				// window.close();
			// },2000);
		}
	}
	
	var bindFuncs={
		"save":function(e){
			trans.post();
		},
		"cancel":function(e){
			window.close();
		}
	};
	
	$(document).ready(function(){
		
		$("#save").bind("click",bindFuncs['save']);
		$("#cancel").bind("click",bindFuncs['cancel']);
	});
	
})()
