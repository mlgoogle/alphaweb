<?php
/**
 * Created by Lee.
 * Date: 2016/3/30 0030 13:27
 * Description: 首页搜索自动提示
 */
require(dirname(__FILE__) . "/../ajax/ajax_login.php");
require(dirname(__FILE__) . "/../common/Request.class.php");
require(dirname(__FILE__) . "/../common/JindowinConfig.class.php");

$user_id = 1;
$token = "";
$message = isset($_GET["message"]) ? $_GET["message"] : "";
if (empty($message)) {
    print_r(json_encode(array("code" => 0, "message" => "搜索关键字为空")));
    return;
}
$url = JindowinConfig::$requireUrl . "search/1/search.fcgi";
$result = Request::post($url,
    array(
        "user_id" => $user_id,
        "token" => $token,
        "message" => $message
    ));
print_r($result);