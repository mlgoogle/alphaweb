<?php
session_start();
require_once(dirname(__FILE__) . "/common/Request.class.php");
require_once(dirname(__FILE__) . "/common/Cookies.class.php");
require_once(dirname(__FILE__) . "/common/JindowinConfig.class.php");
$user_email = isset($_GET['email']) ? $_GET['email'] : "";
$param = isset($_GET['param']) ? $_GET['param'] : "";
$isSucces = false;
if (!empty($user_email) && !empty($param)) {
    $emailUrl = JindowinConfig::$emailUrl . "verify_email.fcgi";
    $result = RequestUtil::get($emailUrl, array(
        "email" => $user_email,
        "param" => $param
    ));
    $jsonresult = json_decode($result, true);

    if ($jsonresult['status'] != "0") {
        $uid = $jsonresult['result']['user_info']['user_id'];
        $uname = $jsonresult['result']['user_info']['user_name'];
        $ulevel = $jsonresult['result']['user_info']['user_level'];
        $utoken = $jsonresult['result']['user_info']['token'];
        $_SESSION['user_id'] = $uid;   //用户ID
        $_SESSION['token'] = $utoken;    //token
        $_SESSION['user_type'] = 1;
        $myCookie = new Cookies();//设置过期时间为1天
        $myCookie->set("uid", $uid, 86400);
        $myCookie->set("uname", $uname, 86400);
        $myCookie->set("utoken", $utoken, 86400);
        $isSucces = true;
    } else {
        $isSucces = false;
    }
} else {
    $isSucces = false;
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>快讯</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="http://cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="js/jquery-1.10.2.min.js"></script>
    <style>
        html,body{padding: 0;margin: 0;}
        .tip-box{width: 680px;height: 378px; border: 1px solid #EEEEEE;
            margin: 45px auto 0;
            position: relative;
        }
        .result,.email,.toindex,.redirect{font-family: "microsoft yahei", sans-serif;}
        .result{
            margin: 65px auto 0;
            font-size: 18px;width: 320px;color: #3e3e3e;}
        .email{
            margin:40px auto 0 ;
            width: 375px;font-size:16px;color: #666666;text-align: center;}
        .btn-index{width: 150px;height: 30px;
            margin: 50px auto 0;
        }
        .toindex{width: 150px;height: 30px;color: #FFFFFF;background-color: #2e5bae;border: none;cursor: pointer}
        .redirect{font-size: 12px;width: 150px;
            margin: 15px auto 0;text-align: center; color: #666666;
        }
        .nums{color: #1347b3;}
        .success,.fail{vertical-align: sub;margin-right: 10px;}
        .success{color: #1347b3;}
        .fail{color: #b10000;}
        a{color: #1347b3;}
        .email-success{font-size: 16px;}
        .email-fail{font-size: 14px;}
        .left-pic{position: absolute;left: 2px;bottom:0;}
        .right-pic{position: absolute;right: 2px;bottom:0;}
    </style>
</head>
<body>
<div class="container">
    <div class="head">
        <img src="imgs/header.png" style="width: 100%;height: 196px;">
    </div>
    <div class="tip-box">
        <p class="result">
            <?php
            if ($isSucces) {
                echo "<i class=\"fa fa-check-circle fa-2x success\"></i>恭喜！您已成功激活筋斗云账号";
            } else {
                echo "<i class=\"fa fa-times-circle fa-2x fail\"></i>对不起！您的账号激活链接已失效";
            }
            ?>
        </p>
        <?php
        if ($isSucces) {
            echo "<p class=\"email email-success\">您的筋斗云登录邮箱为:<a>" . $user_email . "</a></p>";
            echo "<p class=\"btn-index\"><input class=\"toindex\" type=\"button\" value=\"进入首页\"></p>";
            echo "<p class=\"redirect\"><span class=\"nums\">3</span>秒钟后跳转至筋斗云首页</p>";
            echo "<script> var i=3;setInterval(function(){i--;if(i===0){window.location.href=\"/\";return;}$(\".nums\").html(i);},1000);</script>";
        } else {
            echo "<p class=\"email email-fail\"><a>激活邮件已重新发送至您的邮箱</a></p>";
        }
        ?>
        <div class="left-pic">
            <img src="imgs/cloud1.png" style="width: 152px;height: 83px;">
        </div>
        <div class="right-pic">
            <img src="imgs/cloud2.png" style="width: 125px;height: 93px;">
        </div>
    </div>
</div>
</body>
</html>