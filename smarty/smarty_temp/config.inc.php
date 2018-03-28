<?php
$PathArray=explode('smarty_temp',str_replace('\\','/',dirname(__FILE__)));
define('ROOT',$PathArray[0]); //网站文件的绝对路径
define('SMARTY_ROOT',ROOT.'smarty_temp/');   //Smarty类库路径
require_once 'libs/Smarty.class.php';
$Smarty=new Smarty(); //建立新的 smarty对象
$Smarty -> compile_check = TRUE; //每次php执行时查看模板文件是否有改变
$Smarty -> debugging = FALSE;  //如果为true将显示 调试窗口
$Smarty -> template_dir = SMARTY_ROOT.'templates/'; //设置模板目录
$Smarty -> compile_dir = SMARTY_ROOT.'templates_c/';//Smarty默认的模板目录名：
$Smarty -> cache_dir = SMARTY_ROOT.'cache/'; //默认模板缓存的目录名
$Smarty -> config_dir = SMARTY_ROOT.'configs/'; //默认的config文件目录名：configs 

//左右边界符，默认为{}，但实际应用当中容易与JavaScript相冲突，所以建议设成#{}!#或其它。
$Smarty -> left_delimiter  = '#{'; 
$Smarty -> right_delimiter = '}#';
?> 