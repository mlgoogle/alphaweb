<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 17:01
 * Description:用户注册
 */
//模拟去请求接口
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/../common/Cookies.class.php");
$platform_id = isset($_POST['platform_id']) ? $_POST['platform_id'] : 1;
$user_name = isset($_POST['username']) ? $_POST['username'] : "";
$password1 = isset($_POST['password1']) ? $_POST['password1'] : "";
$password2 = isset($_POST['password2']) ? $_POST['password2'] : "";
$url = JindowinConfig::$requireUrl . "user/1/user_register.fcgi";
if (empty($user_name) || empty($password1) || empty($password2)) {
    print_r(json_encode(array("status" => 0, "result" => "账号或密码为空")));
    return;
}
if ($password1 != $password2) {
    print_r(json_encode(array("status" => 0, "result" => "两次密码不同")));
    return;
}
$md5Password=md5($password1);
$a=substr($md5Password,0,2);
$b=substr($md5Password,2,12);
$c=substr($md5Password,14,16);
$d=substr($md5Password,30,2);
$newPwd=$a.chr(rand(97, 122)).$b.chr(rand(97, 122)).$c.chr(rand(97, 122)).$d;

$result = RequestUtil::get($url,
    array(
        "platform_id" => $platform_id,
        "user_name" => $user_name,
        "password" => $newPwd . ","
    ));

$jsonresult = json_decode($result, true);
if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
    return;
}