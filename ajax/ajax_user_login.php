<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 9:37
 * Description:用户登录 user_type为0时是游客登录
 */
//模拟去请求接口
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/../common/Cookies.class.php");
$platform_id = isset($_POST['platform_id']) ? $_POST['platform_id'] : 1;
$user_name = isset($_POST['user_name']) ? $_POST['user_name'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";
$autologin = isset($_POST['autologin']) ? $_POST['autologin'] : "false";
$user_type = isset($_POST['user_type']) ? $_POST['user_type'] : 0;
$url = JindowinConfig::$requireUrl . "/user/1/user_login.fcgi";
if (empty($user_name) || empty($password)) {
    print_r(json_encode(array("status" => 0, "result" => "账号或密码为空")));
    return;
}
$result = RequestUtil::get($url,
    array(
        "platform_id" => $platform_id,
        "user_name" => $user_name,
        "password" => $password . ",",
        "user_type" => $user_type
    ));
$jsonresult = json_decode($result, true);

if ($jsonresult['status'] != "0") {
    $uid = $jsonresult['result']['user_info']['user_id'];
    $uname = $jsonresult['result']['user_info']['user_name'];
    $ulevel = $jsonresult['result']['user_info']['user_level'];
    $utoken = $jsonresult['result']['user_info']['token'];
    print_r(json_encode(array("status" => 1, "result" => array(
        "user_id" => $uid,
        "user_name" => $uname,
        "user_level" => $ulevel
    ))));
    $_SESSION['user_id'] = $uid;   //用户ID
    $_SESSION['token'] = $utoken;    //token
    $_SESSION['user_type'] = 1;
    if ($autologin == "true") {
        $myCookie = new Cookies();//设置过期时间为15天
        $myCookie->set("uid", $uid,1296000);
        $myCookie->set("uname", $uname,1296000);
        $myCookie->set("utoken", $utoken,1296000);
    }
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
    return;
}