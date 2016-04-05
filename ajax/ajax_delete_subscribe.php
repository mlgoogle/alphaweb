<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 9:35
 * Description:删除用户订阅
 */
require(dirname(__FILE__) . "/../ajax/ajax_login.php");
require(dirname(__FILE__) . "/../common/Request.class.php");
require(dirname(__FILE__) . "/../common/JindowinConfig.class.php");
$user_id = 1;
$token = "";
$stock_code = isset($_POST["stock_code"]) ? $_POST["stock_code"] : "";  //关注的股票代码
$section = isset($_POST["section"]) ? $_POST["section"] : "";           //关注的部门名称
$industry = isset($_POST["industry"]) ? $_POST["industry"] : "";        //关注的行业名称

if (empty($stock_code) && empty($section) && empty($industry)) {
    print_r(json_encode(array("code" => 0, "message" => "关注项为空")));
    return;
}
$url = JindowinConfig::$requireUrl . "subscribe/1/add_subscribe.fcgi";
$result = Request::post($url,
    array("user_id" => $user_id,
        "token" => $token,
        "stock_code" => $stock_code,
        "section" => $section,
        "industry" => $section
    ));
print_r($result);