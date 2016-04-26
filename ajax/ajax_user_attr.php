<?php
/**
 * Created by Lee.
 * Date: 2016/4/22 0022 16:52
 * Description:用户注册信息验证
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/alphaConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/../common/VerifyAction.class.php");
$email = isset($_POST['email']) ? $_POST['email'] : "";
if (empty($email)) {
    print_r(json_encode(array("status" => 0, "result" => "邮箱不能为空")));
    return;
}
if (!VerifyAction::isEmail($email)) {
    print_r(json_encode(array("status" => 0, "result" => "邮箱格式不正确")));
    return;
}
$url = alphaConfig::$requireUrl . "user/1/user_attr.fcgi";
$result = RequestUtil::get($url,
    array(
        "email" => $email
    ));
$jsonresult = json_decode($result, true);

if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
    return;
}