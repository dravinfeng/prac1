
createDesktop=function(){
    document.write(navigator.userAgent);
    var sUrl='http://music.baidu.com/mall';
    var sName='aaaa';
    alert(1)
    try
    {
        
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var shell = new ActiveXObject("WScript.Shell");
        var folderPath = shell.SpecialFolders("Desktop") ;//获取桌面本地桌面地址
        alert(shell)
        if(!fso.FolderExists(folderPath)){
        fso.CreateFolder(folderPath);
        }
        if(!fso.FileExists(folderPath + "//"+sName+".lnk")){
        //在指定的文件夹下创建名为sName的快捷方式
            var shortLink = shell.CreateShortcut(folderPath + "//"+sName+".lnk"); //相应的描述信息
            shortLink.Description = "shortcut for "+sName; //快捷方式指向的链接
            shortLink.TargetPath = sUrl; //激活链接并且窗口最大化
            shortLink.WindowStyle = 3;
            shortLink.Save();
            alert('成功');
        }
    }catch(e){
    alert("当前IE安全级别不允许操作！");
    }
}
// toDesktop=function(sUrl,sName){
    // var sUrl='http://music.baidu.com/mall';
    // var sName='aaaa';
    // alert(1)
// try{
    // alert(2)
// var WshShell = new ActiveXObject("WScript.Shell");
// alert(3)
// var oUrlLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") + "\\" + sName + ".url");
// alert(4)
// oUrlLink.TargetPath = sUrl;
// oUrlLink.Save();
// }catch(e){
// alert("当前IE安全级别不允许操作！");
// }
// } var ls=[];
for(var i in navigator){
    ls.push(i+':'+navigator[i]);
};
alert(ls.join('\n'))

$('<input style="position:fixed;left:100px;top:100px;" type="button" value="save" onclick="createDesktop()">').appendTo(document.body)
