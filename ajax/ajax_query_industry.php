<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 9:36
 * Description:查询行业相关信息
 */
require(dirname(__FILE__) . "/../ajax/ajax_login.php");
require(dirname(__FILE__) . "/../common/Request.class.php");
require(dirname(__FILE__) . "/../common/JindowinConfig.class.php");
$user_id = 1;
$token = "";
$url = JindowinConfig::$requireUrl . "subscribe/1/query_industry.fcgi";
$result = Request::post($url,
    array("user_id" => $user_id,
        "token" => $token
    ));
print_r($result);