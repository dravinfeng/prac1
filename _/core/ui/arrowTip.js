$Import('core.dom.setStyle');
$Import('core.dom.getXY');
$Import('core.dom.isNode');
$Import('core.dom.getBoundingClientRect');
$Import('core.evt.eventUtil');
/**
 * 依据元素进行定位的弹出层
 * @author fengxinglong
 * @param {String} info
 * @param {Object} DOM Element or attributes map
 * @example
 * STK.cor.ui.arrowTip("aaaa",{el:STK.E("a"),css:{},noClose:0/1,isBlack:0/1}); //第二个参数 可以包含 要依据进行定位的 节点 以及  要特殊表现的 样式,css可有可无
 * //如果 不提供 el属性，那么 必须不能缺少 css里面的 left,top值
 */
STK.register('core.ui.arrowTip',function(){
	var dialog=STK.core.ui.dialog;
	var setStyle=STK.core.dom.setStyle;
	var getXY=STK.core.dom.getXY;
	var isNode=STK.core.dom.isNode;
	var eventUtil=STK.core.evt.eventUtil;
	var getBdRect=STK.core.dom.getBoundingClientRect;
	var TEMP=['<table class="zq_arrowTipsContent">'+
	        		'<tbody>'+
	        			'<tr><td class="arrTipsInner">',
	        			
	        			'</td></tr>'+
	        		'</tbody>'+
	        	'</table>'];
	        	/*
	        	'<div class="zq_arrowTop">&nbsp;</div>'+
	        	'<div class="zq_arrowRight">&nbsp;</div>'+
	        	'<div class="zq_arrowBottom">&nbsp;</div>'+
	        	'<div class="zq_arrowLeft">&nbsp;</div>
	        	
	        	*/

	
	return function(info,spec){
		!spec && (spec={});
		if(!spec.el && !(spec.css && spec.css.left && spec.css.top)){
			return false
		}
		
		var that={parent:''};
		
		var left,top,dim,_close;
		var winDim=getBdRect(document.documentElement);
		var d=STK.C('div');
		var innerDiv=STK.C('div');
		d.className="zq_arrowTipBox";
		innerDiv.className= !spec.isBlack ? "zq_arrowtips" : "zq_arrowtips zq_arrowtips1";
		
		if(isNode(spec.el)){
			left=getXY(spec.el);
			top=left.top;
			left=left.left;
			dim=getBdRect(spec.el);
		}else{
			left=parseInt(spec.css.left,10);
			top=parseInt(spec.css.top,10);
			dim={'left':left,'top':top,'width':0,'height':0,'bottom':top,'right':left}
		}
		

		if(spec.css){
			for(var i in spec.css){
				if(i!='left' && i!='top'){
					setStyle(innerDiv,i,spec.css[i]);
				}
			}
		}
		innerDiv.innerHTML=[TEMP[0],info,TEMP[1]].join('');
		d.appendChild(innerDiv);
		
		var bindDomFuncs={
			'close':function(e){
				that.destroy();
			}
		}
		
		
		if(!spec.noClose){
			_close=STK.C('a');
			_close.className="zq_arrowClose";
			_close.innerHTML="x";
			_close.setAttribute('href','javascript:void(0)');
			eventUtil.addEvent(_close,'click',bindDomFuncs['close']);
			innerDiv.appendChild(_close);
		}
		
		that.parent=d;
		document.body.appendChild(d);
		
		
		
		
		setTimeout(function(){
			var _dim=getBdRect(d);
			var arrowTo="left";
			if((top-10)>_dim.height){
				if(_dim.width<(winDim.width-dim.left)){
					arrowTo="bottom";
				}else{
					arrowTo="right";
				}
			}else{
				if(_dim.width>(winDim.width-dim.left)){
					arrowTo="right";
				}else{
					arrowTo="left";
				}
			}
			var t=STK.C('div');
			innerDiv.appendChild(t);
			switch(arrowTo){
				case 'left':
					d.style.left=(left+dim.width+1)+'px',d.style.top=(top-9)+'px';
					t.className="zq_arrowLeft";
					break;
				case 'bottom':
					d.style.left=(left-9)+'px',d.style.top=(top-_dim.height-1)+'px';
					t.className="zq_arrowBottom";
					break;
				case 'top':
					d.style.left=(left-9)+'px',d.style.top=(top+dim.height+1)+'px';
					t.className="zq_arrowTop";
					break;
				case 'right':
					d.style.left=(left-_dim.width-1)+'px',d.style.top=(top-9)+'px';
					t.className="zq_arrowRight";
					break;
			}
		},2);
		

		that.destroy=function(){
			_close && eventUtil.removeEvent(_close,'click',bindDomFuncs['close']);
			d && document.body.removeChild(d);
			that.d=d=null;
		}
		return that;
	};
});
