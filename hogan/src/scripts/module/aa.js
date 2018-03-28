var aa=require('../template/aa.mustache');
console.log(aa);

var ls=[];
for(var i=0;i<100*50;i++){
	ls.push(i);
}
var s=new Date().getTime();
var str='';
 var html = QTMPL.aa.render({a:ls});
 var m=new Date().getTime();
 str=m-s+';  ';
 document.getElementById('aa').innerHTML=html;
 alert(str+(new Date().getTime()-m))
