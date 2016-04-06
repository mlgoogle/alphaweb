<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 9:37
 * Description:用户登录 user_type为visitor时是游客登录
 */
session_start();
//模拟去请求接口
require(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
$platform_id = isset($_POST['platform_id']) ? $_POST['platform_id'] : "1";
$user_name = isset($_POST['user_name']) ? $_POST['user_name'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";
$user_type = isset($_POST['user_type']) ? $_POST['user_type'] : "visitor";
$url = JindowinConfig::$requireUrl . "/user/1/user_login.fcgi";
if (empty($user_name) || empty($password)) {
    print_r(json_encode(array("status" => 0, "result" => "账号或密码为空")));
    return;
}
$result = RequestUtil::get($url,
    array(
        "platform_id" => $platform_id,
        "user_name" => $user_name,
        "password" => $password,
        "user_type" => $user_type
    ));
print_r($result);


$_SESSION['user_id'] = 1;   //用户ID
$_SESSION['token'] = "";    //token