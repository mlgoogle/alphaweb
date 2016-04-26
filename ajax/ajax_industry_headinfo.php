<?php
/**
 * Created by Lee.
 * Date: 2016/4/11 0011 14:51
 * Description:行业\概念热门股票
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/alphaConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$hyname = isset($_POST['hyname']) ? $_POST['hyname'] : "";
$gnname = isset($_POST['gnname']) ? $_POST['gnname'] : "";
$hy_array = array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "hy" => $hyname . ","
);
$gn_array = array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "gn" => $gnname . ","
);
$url = alphaConfig::$requireUrl . "message/1/message_hy_gn.fcgi";
if (!empty($hyname)) {
    $result = RequestUtil::get($url, $hy_array);
} else {
    $result = RequestUtil::get($url, $gn_array);
}

$jsonresult = json_decode($result, true);

if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
    return;
}