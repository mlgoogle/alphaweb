<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 9:36
 * Description:查询股票相关信息
 */
require_once (dirname(__FILE__) . "/../common/Request.class.php");
require_once (dirname(__FILE__) . "/../common/JindowinConfig.class.php");
require_once (dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$url = JindowinConfig::$requireUrl . "subscribe/1/query_stock.fcgi";
$result = RequestUtil::get($url,
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION["token"]
    ));
print_r($result);