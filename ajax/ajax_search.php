<?php
/**
 * Created by Lee.
 * Date: 2016/3/30 0030 13:27
 * Description: 首页搜索自动提示
 */
require_once (dirname(__FILE__) . "/../common/Request.class.php");
require_once (dirname(__FILE__) . "/../common/JindowinConfig.class.php");
require_once (dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$message = isset($_GET["message"]) ? $_GET["message"] : "";
if (empty($message)) {
    print_r(json_encode(array("status" => 0, "result" => "搜索关键字为空")));
    return;
}
$url = JindowinConfig::$requireUrl . "search/1/search.fcgi";
$result = RequestUtil::get($url,
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION["token"],
        "message" => $message
    ));
print_r($result);