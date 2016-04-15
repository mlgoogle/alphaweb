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
echo $result;
if ($jsonresult['status'] != "0") {
//    $uid = $jsonresult['result']['user_info']['user_id'];
//    $uname = $jsonresult['result']['user_info']['user_name'];
//    $utoken = $jsonresult['result']['user_info']['token'];
//    print_r(json_encode(array("status" => 1, "result" => array(
//        "user_id" => $uid,
//        "user_name" => $uname
//    ))));
//    $_SESSION['user_id'] = $uid;   //用户ID
//    $_SESSION['token'] = $utoken;    //token
//    $_SESSION['user_type'] = 1;
//    $myCookie = new Cookies();//设置过期时间为15天
//    $myCookie->set("uid", $uid,1296000);
//    $myCookie->set("uname", $uname,1296000);
//    $myCookie->set("utoken", $utoken,1296000);
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
    return;
}