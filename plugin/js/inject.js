(function(){
	
	var tempHdl="",iframeContainer;
	var that={
		curTarget:''
	}
	var C={
		makeTemp:function(){
			if(!tempHdl){
				tempHdl=$('<div style="position:absolute;width:70px;height:60px;background:#cccccc;border-radius:3px;text-align:center;z-index:10000;display:none;">'+
				'<input style="width:70px;height:30px;" type="button" value="商品" /><br><input style="width:70px;height:30px;" type="button" value="店铺" /></div>')[0];
				$(tempHdl).appendTo(document.body);
				
			}
		},
		changePos:function(pos){
			C.makeTemp();
			$(tempHdl).css(pos).show();
		},
		makeData:function(sta){
			var el=that.curTarget;
			if(!el){return};
			var obj={},t;
			t=$(el).parents('li[class="item"]');
			if(t.length<1){
				return false;
			}
			t=t[0];
			if(sta==1){
				obj['itemId']=$(t).attr('data-itemid');
				t=$(t).find('li.title>a.J_AtpLog')[0];
				if(t){
					obj['title']=t.title;
					obj['itemUrl']=t.href;
				}
			}else{
				el=$(t).find('li.wangwang>a[class="nick J_NickPopup"]');
				if(el.length<1){
					return false;
				}
				el=el[0];
				obj['shopNick']=el.innerHTML;
				obj['shopUrl']=el.href;
				if(!obj['shopNick'] ||!obj['shopUrl']){
					return false;
				}
			}
			that.curTarget=null;
			return obj;
		}
	};
	
	var bindFuncs={
		"cMenu":function(evt){
			var el=evt.target;
			// if(el.tagName.toLowerCase()!="a" || el.tagName.toLowerCase()!="img"){
				// return;
			// }
			that.curTarget=el;
			C.changePos({left:evt.pageX,top:evt.pageY});
			return false;
		},
		"choose":function(evt){
			var el=evt.target;
			if(STK.contains(tempHdl,el)||tempHdl==el){
				
				var dt;
				if(el.value=="商品"){
					dt=C.makeData(1);
				}else if(el.value=="店铺"){
					dt=C.makeData(2);
				}
				if(dt){
					chrome.extension.sendRequest({"msg":dt});
				}else{
					alert("本插件适用于商品列表页.对商品采集时，在商品的图片或者商品名称上右键；对店铺采集时，在店铺名称上右键。");
				}
				$(tempHdl).hide();
				return false;
			}else if(tempHdl.style.display!="none"){
				$(tempHdl).hide();
				return false;
			}
			
		}
	}
	
	
	
	
	
	
	
	
	that.start=function(){
		if(location.href.indexOf("http://list.taobao.com/itemlist/")==-1){
			return;
		}
		C.makeTemp();
		$(document.body).bind('contextmenu',bindFuncs['cMenu']);
		$(document.body).bind('click',bindFuncs['choose']);
	}
	that.start();
})();
