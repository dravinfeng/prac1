<?php
require_once 'config.inc.php';
$Smarty -> assign('title','这里是标题');
$Smarty -> assign('content','这里是主体内容');
$Smarty -> display('templates/test.html');
?> 