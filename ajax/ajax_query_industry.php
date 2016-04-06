<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 9:36
 * Description:查询行业相关信息
 */
require_once (dirname(__FILE__) . "/../common/Request.class.php");
require_once (dirname(__FILE__) . "/../common/JindowinConfig.class.php");
require_once (dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
CheckLogin::check();
$url = JindowinConfig::$requireUrl . "subscribe/1/query_industry.fcgi";
$result = RequestUtil::get($url,
    array("user_id" => $_SESSION['user_id'],
        "token" => $_SESSION['token']
    ));
print_r($result);