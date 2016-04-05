<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 9:35
 * Description: 添加用户订阅
 */
require(dirname(__FILE__) . "/../ajax/ajax_login.php");
require(dirname(__FILE__) . "/../common/Request.class.php");
require(dirname(__FILE__) . "/../common/JindowinConfig.class.php");
$user_id = 1;
$token = "";
$start_time = isset($_POST["start_time"]) ? $_POST["start_time"] : "";  //每天订阅开始时间
$end_time = isset($_POST["end_time"]) ? $_POST["end_time"] : "";        //每天订阅结束时间
$time_inval = isset($_POST["time_inval"]) ? $_POST["time_inval"] : "";  //订阅的时间间隔
$stock_code = isset($_POST["stock_code"]) ? $_POST["stock_code"] : "";  //关注的股票代码
$section = isset($_POST["section"]) ? $_POST["section"] : "";           //关注的部门名称
$industry = isset($_POST["industry"]) ? $_POST["industry"] : "";        //关注的行业名称

if (empty($start_time)) {
    print_r(json_encode(array("code" => 0, "message" => "订阅开始时间为空")));
    return;
}
if (empty($end_time)) {
    print_r(json_encode(array("code" => 0, "message" => "订阅结束时间为空")));
    return;
}
if (empty($stock_code) && empty($section) && empty($industry)) {
    print_r(json_encode(array("code" => 0, "message" => "关注项为空")));
    return;
}
$url = JindowinConfig::$requireUrl . "subscribe/1/add_subscribe.fcgi";
$result = Request::post($url,
    array(
        "user_id" => $user_id,
        "token" => $token,
        "start_time" => $start_time,
        "end_time" => $end_time,
        "time_inval" => $time_inval,
        "stock_code" => $stock_code,
        "section" => $section,
        "industry" => $section
    ));
print_r($result);