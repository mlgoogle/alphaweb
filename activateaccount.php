<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>快讯</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="http://cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
    <style>
        html,body{padding: 0;margin: 0;}
        .tip-box{width: 680px;height: 378px; border: 1px solid #EEEEEE;
            margin: 45px auto 0;
        }
        .result,.email,.toindex,.redirect{font-family: "microsoft yahei", sans-serif;}
        .result{
            margin: 65px auto 0;
            font-size: 18px;width: 320px;}
        .email{
            margin:40px auto 0 ;
            width: 390px;font-size: 14px;}
        .btn-index{width: 150px;height: 30px;
            margin: 50px auto 0;
        }
        .toindex{width: 150px;height: 30px;color: #FFFFFF;background-color: #2e5bae;border: none;cursor: pointer}
        .redirect{font-size: 12px;width: 160px;
            margin: 15px auto 0;
        }
        .nums{color: #1347b3;}
        .success,.fail{vertical-align: sub;margin-right: 10px;}
        .success{color: #1347b3;}
        .fail{color: #b10000;}
    </style>
</head>
<body>
<div class="container">
    <div class="head">
        <img src="imgs/header.png" style="width: 100%;height: 196px;">
    </div>
    <div class="tip-box">
        <p class="result">
            <i class="fa fa-check-circle fa-2x success"></i>
            恭喜！您已成功激活筋斗云账号
<!--            <i class="fa fa-times-circle fa-2x fail"></i>-->
<!--            对不起！您的账号激活链接已失效-->
        </p>
        <p class="email">
            您的筋斗云登录邮箱为:<a href="#">chenliuwen@kunyan-inc.com</a>
<!--            <a href="#">点击重新发送账户激活链接，并请于10日内激活筋斗云账户</a>-->
        </p>
        <p class="btn-index"><input class="toindex" type="button" value="进入首页"></p>
        <p class="redirect"><span class="nums">3</span>秒钟后跳转至筋斗云首页</p>
    </div>
</div>

</body>
</html>