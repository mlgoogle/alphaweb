<?php
/**
 * Created by Lee.
 * Date: 2016/4/7 0007 15:48
 * Description:查询用户已经订阅的信息
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/JindowinConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() != 1) {
    print_r(json_encode(array("status" => -1, "result" => "用户未登录")));
    return;
}
$url = JindowinConfig::$requireUrl . "subscribe/1/query_subscribe.fcgi";
$result = RequestUtil::get($url,
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION["token"]
    ));
$jsonresult = json_decode($result, true);

if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
    return;
}