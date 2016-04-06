<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 16:16
 * Description:检查用户登录状态,未登录则使用游客账户
 */
session_start();
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/JindowinConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/../common/Cookies.class.php");

class CheckLogin
{
    public static function check()
    {
        /**
         * 先读取cookie
         */
        $myCookie = new Cookies();
        $uid = $myCookie->get("uid");
        $uname = $myCookie->get("uname");
        $utoken = $myCookie->get("utoken");
        if (!empty($uid) && !empty($uname) && !empty($utoken)) {
            $_SESSION['user_id'] = $uid;
            $_SESSION['token'] = $utoken;
            $_SESSION['user_type'] = 1;
        }

        $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : "";
        $token = isset($_SESSION['token']) ? $_SESSION['token'] : "";
        $user_type = isset($_SESSION['user_type']) ? $_SESSION['user_type'] : 0;
        /**
         * 游客登录
         */
        if (empty($user_id) || empty($token) || $user_type == 0) {
            $url = JindowinConfig::$requireUrl . "/user/1/user_login.fcgi";

            $result = RequestUtil::get($url,
                array(
                    "platform_id" => 1,
                    "user_name" => "user" . mt_rand(),
                    "password" => mt_rand() . ",",
                    "user_type" => "visitor"
                ));
            $jsonresult = json_decode($result, true);
            $_SESSION['user_id'] = $jsonresult['result']['user_info']['user_id'];   //用户ID
            $_SESSION['token'] = $jsonresult['result']['user_info']['token'];    //token
            return 0;
        } else if (!empty($user_id) && !empty($token) && $user_type == 1) {
            return 1;
        } else {
            return -1;
        }
    }
}

