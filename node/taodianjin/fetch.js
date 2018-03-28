var engin=require('./engin');

var cookie='cna=exWqCQ7dsR0CAXO3AToXVOmo; t=7fb1851d07147626b51a9d3551beda8a; lzstat_uv=10313807693941430083|2876347@700373@1838489@359586@390770; CNZZDATA30081923=cnzz_eid%3D1631974496-1383623513-http%253A%252F%252Fu.alimama.com%26ntime%3D1383705323%26cnzz_a%3D7%26ltime%3D1383701697987%26rtime%3D1; _cnzz_CV=; cookie2=00bc2ad1125674e2366ad97c5fbb14e8; lzstat_ss=3442454032_2_1383735653_2876347|3911931659_1_1383735679_700373|3045594272_0_1383735679_1838489|1784014454_0_1383734125_359586|2685401842_0_1383734125_390770; wwwtaobaocomsupport=1241; v=0; _tb_token_=ygL1Tx2fkim; cookie32=2f6dcfd27af89eb6b06b5f8adf436338; cookie31=MzU2MDA4NjksJUU2JTg4JTg4JUU2JUFGJTlCJUU2JUFGJTlCJUU2JUI3JTk4LDQ4Mjk0OTA5QHFxLmNvbSxUQg%3D%3D; alimamapwag=TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgNi4xOyBXT1c2NDsgcnY6MjQuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8yNC4w; login=VFC%2FuZ9ayeYq2g%3D%3D; alimamapw=QCYJF3J3Q3sBR3IjQ3JQRyIgQCdyF3MCbwgHBgdXBwZUUgFXUl0DUVEGBQsFUQADVwZSBFdTAQFT'
var callback=function(status,id,url){
	console.log('status:'+status);
	console.log('id:'+id);
	console.log('url:'+url);
	if(status!=200){
		//TODO 去模拟登录，成功后 修改 cookie
	}
}
var ids=[16268614417,35549493695,21701387374];

for(var i=0;i<ids.length;i++){
	engin.getData(ids[i],cookie,callback);
}