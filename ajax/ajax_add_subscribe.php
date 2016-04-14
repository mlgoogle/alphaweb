<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 9:35
 * Description: 添加用户订阅
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/JindowinConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() != 1) {
    print_r(json_encode(array("status" => -1, "result" => "用户未登录")));
    return;
}
$start_time = isset($_POST["start_time"]) ? $_POST["start_time"] : "";  //每天订阅开始时间
$end_time = isset($_POST["end_time"]) ? $_POST["end_time"] : "";        //每天订阅结束时间
$time_inval = isset($_POST["time_inval"]) ? $_POST["time_inval"] : "";  //订阅的时间间隔
$stock_code = isset($_POST["stock_code"]) ? $_POST["stock_code"] : "";  //关注的股票代码
$section = isset($_POST["section"]) ? $_POST["section"] : "";           //关注的部门名称
$industry = isset($_POST["industry"]) ? $_POST["industry"] : "";        //关注的行业名称

if (empty($start_time)) {
    print_r(json_encode(array("status" => 0, "result" => "订阅开始时间为空")));
    return;
}
if (empty($end_time)) {
    print_r(json_encode(array("status" => 0, "result" => "订阅结束时间为空")));
    return;
}
if (empty($stock_code) && empty($section) && empty($industry)) {
    print_r(json_encode(array("status" => 0, "result" => "关注项为空")));
    return;
}
$url = JindowinConfig::$requireUrl . "subscribe/1/add_subscribe.fcgi";
$result = RequestUtil::get($url,
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION['token'],
        "start_time" => $start_time,
        "end_time" => $end_time,
        "time_inval" => $time_inval,
        "stock_code" => empty($stock_code) ? "" : $stock_code . ",",
        "section" => $section,
        "industry" => $industry
    ));
print_r($result);