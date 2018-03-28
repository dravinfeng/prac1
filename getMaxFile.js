var fs = require('fs'),path=require('path'),fileList = [],num=0,count={};
function setCount(num,key){
	!count[''+key] && (count[''+key]=0);
	count[''+key]++;
}

/**
*@param pt: root path
*@param sta: need walk all child path or not
*/
function walk(pt,sta){
  var dirList = fs.readdirSync(pt);
  var t;
  dirList.forEach(function(item){

    if(sta && fs.statSync(pt + '/' + item).isDirectory()){
      walk(pt + '/' + item);
    }else if(item.match(/\.(jpg|jpeg|png)/)){
		num++;
		t=fs.statSync(pt + '/' + item).size/1024/1024;
		
		if(t>=25){
			setCount(t,25);
		}else if(t>=20){
			setCount(t,20);
		}else if(t>=15){
			setCount(t,15);
		}else if(t>=10){
			setCount(t,10);
		}else if(t>=5){
			setCount(t,5);
		}else{
			setCount(t,0);
		}
      fileList.push({path:pt + '/' + item,size:t});
    }else{
		item.indexOf('.')!=-1 && console.log(item)
	}
  });
}
walk('.');
fileList.sort(function(i,j){
	return i.size>j.size ? -1:1;
})

console.log('total number:'+num);
console.log(count)
