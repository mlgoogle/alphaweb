<?php
require_once(dirname(__FILE__) . "/common/Cookies.class.php");
$myCookie = new Cookies();
$uid = $myCookie->get("uid");
$uname = $myCookie->get("uname");
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>快讯</title>
    <meta charset="utf-8">
    <meta property="wb:webmaster" content="2a4447f19ff23d2f"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/bootstrap.min.css?v=1.0" rel="stylesheet">
    <link href="css/bootstrap-material-design.min.css?v=1.0" rel="stylesheet">
    <link rel="stylesheet" href="plugins/messenger/css/messenger.min.css?v=1.0">
    <link rel="stylesheet" href="plugins/messenger/css/messenger-spinner.min.css?v=1.0">
    <link rel="stylesheet" href="plugins/messenger/css/messenger-theme-air.min.css?v=1.0">
    <link href="css/ripples.min.css?v=1.0" rel="stylesheet">
<!--    <link href="css/jquery.dropdown.min.css?v=1.0" rel="stylesheet">-->
    <link rel="stylesheet" href="css/bootstrap-select.min.css">
    <link rel="stylesheet" href="css/font-awesome.min.css?v=1.0">
    <link rel="stylesheet" href="css/style.min.css?v=1.0">
    <link rel="stylesheet" href="css/animate.min.css?v=1.0">
    <link rel="stylesheet" href="css/iconfont.min.css?v=1.0">
    <link rel="stylesheet" href="css/jquery.typeahead.min.css?v=1.0">
</head>
<body>
<!--头部菜单&搜索框-->
<div class="navbar navbar-inverse hidden-print top-pic" id="search-bar-parent">
    <div class="container" id="search-bar-pre" style="height: 164px;">
        <div class="navbar-header" id="fix-bar-pre">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target=".navbar-responsive-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">
                <img src="imgs/logo.png" style="width: 136px; height: 30px;">
            </a>
        </div>
        <div class="navbar-collapse collapse navbar-responsive-collapse" id="header-right-icon">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <?php
                    if (empty($uname)) {
                        echo " <a id=\"top-user-name\" href=\"javascript:void(0)\"><i class=\"icon iconfont\">&#xe60b;</i>&nbsp;<span>登录</span></a>";
                    } else {
                        echo " <a id=\"top-user-exit\" href=\"javascript:void(0)\"><i class=\"icon iconfont\">&#xe60b;</i>&nbsp;<span>" . $uname . "</span></a>";
                    }
                    ?>
                </li>
                <li><a href="javascript:void(0)" id="wechat"> <i class="icon iconfont">&#xe679;</i>&nbsp;微信关注</a></li>
            </ul>
        </div>
        <div class="col-md-10 col-md-offset-1" style="padding-left: 0; padding-right: 0;">
            <h2>快讯</h2>
            <p class="toptips">
                随时跟踪网上是否有您感兴趣的股票新内容
            </p>
        </div>
    </div>
    <div class="col-md-12 search-box" id="search-fix">
        <div class="container">
            <div class="col-md-10 col-md-offset-1" style="padding-left: 5px; padding-right: 5px">
                <div class="typeahead-container">
                    <div class="typeahead-field">
                        <section id="search">
                            <label for="search-input">
                                <i class="icon iconfont">&#xe622;</i>
                            </label>
                            <input id="search-input" type="search" placeholder="创建关于以下内容的快讯" autocomplete="off"
                                   spellcheck="false" autocorrect="off" tabindex="1">
                            <label for="search-input" class="search-clear" style="display: none;">
                                <i class="fa fa-times"></i>
                            </label>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div asid>
</div>
<!--主体内容-->
<div class="container">
    <!--我的快讯模块-->
    <div class="bs-docs-section mynews" style="display: none;">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="bs-component">
                    <div class="jumbotron">
                        <h4 style="font-weight: 600;" id="myNewsCount">我的快讯</h4>
                        <table id="myNewsHead" class="table"></table>
                        <footer class="text-center show-all-news hide">
                            <div id="showMyAll" data-show-all="false">
                                <div class="text-muted">点击展开更多</div>
                                <i class="fa fa-angle-down fa-2x"></i>
                            </div>
                        </footer>
                    </div>
                    <div id="setting-button">
                        <i class="fa fa-cog" id="btn-setting"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--快讯推荐模块-->
    <div class="bs-docs-section recommendnews">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="bs-component">
                    <div class="jumbotron" id="allrecommend">
                        <h4 style="padding-bottom: 10px; font-weight: 600;">快讯推荐</h4>
                        <span class="label-head-gp">股票</span>
                        <div id="gp-container">
                        </div>
                        <footer class="text-center">
                            <div id="rec-gp-all" data-show-all="false" style="display: none;">
                                <div class="text-muted">点击展开更多</div>
                                <i class="fa fa-angle-down fa-2x"></i>
                            </div>
                        </footer>

                        <span class="label-head-hy">行业</span>
                        <div id="hy-container">
                        </div>
                        <footer class="text-center">
                            <div id="rec-hy-all" data-show-all="false" style="display: none;">
                                <div class="text-muted">点击展开更多</div>
                                <i class="fa fa-angle-down fa-2x"></i>
                            </div>
                        </footer>

                        <span class="label-head-gn">概念</span>
                        <div id="gn-container">
                        </div>
                        <footer class="text-center">
                            <div id="rec-gn-all" data-show-all="false" style="display: none;">
                                <div class="text-muted">点击展开更多</div>
                                <i class="fa fa-angle-down fa-2x"></i>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--创建快讯以及设置接收模块-->
    <div class="bs-docs-section settingnews hide">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="bs-component">
                    <div class="jumbotron">
                        <?php
                        if (empty($uname)) {
                            echo "<input class=\"input-sm col-md-4\" id='receive_email' type='email' style='margin-top: 11px;border: 1px solid gray;border-radius: 0;height: 35px;' placeholder='输入接收邮件创建快讯'>";
                        } else {
                            ?>
                            <?php
                            echo "<h5 id='show_sub_info' style=\"padding-bottom: 10px; font-weight: 600;\"></h5>";
                        }
                        ?>
                        <a class="btn btn-raised btn-info" id="create_mynews" style="background-color: #0068b7;">创建快讯</a>
                        <a class="show-my-setting" href="javascript:void(0)" style="margin-left: 40px;">显示选项</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--快讯列表模块-->
    <div class="bs-docs-section newsinfo hide">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="bs-component">
                    <div class="jumbotron" id="showInfos">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--设置资讯-弹出框-->
<div id="complete-dialog" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lsm">
        <div class="modal-content">

        </div>
    </div>
</div>
<!--微信二维码弹出框-->
<div id="wechat-dialog" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">微信关注</h4>
            </div>
            <div class="modal-body text-center">
                <img src="imgs/qrcode.png">
            </div>
        </div>
    </div>
</div>
<!--登录&&注册-弹框-->
<div id="login-dialog" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-msm">
        <div class="modal-content">
            <ul id="myTabs" class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active" id="login-li">
                    <span href="#user-login" id="home-tab" role="tab" data-toggle="tab" aria-controls="user-login" aria-expanded="true">用户登录</span>
                </li>
                <li role="presentation" class="" id="register-li">
                    <span href="#user-register" role="tab" id="profile-tab" data-toggle="tab" aria-controls="user-register" aria-expanded="false">邮箱注册</span>
                </li>
            </ul>
            <div id="myTabContent" class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="user-login" aria-labelledby="home-tab">
                    <div class="row-content">
                        <div class="form-horizontal">
                            <fieldset>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                        <input type="email" id="login-email" class="form-control" placeholder="请输入登录邮箱" maxlength="18">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-key"></i></span>
                                        <input type="password" id="login-pwd" class="form-control" placeholder="请输入登录密码" maxlength="16">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-10">
                                        <div class="checkbox">
                                            <label style="font-size: 12px;">
                                                <input type="checkbox" id="cb-autologin">&nbsp;&nbsp;&nbsp;&nbsp;自动登录
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input class="btn btn-info" type="button" id="btn-login" value="登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录">
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="user-register" aria-labelledby="profile-tab">
                    <div class="row-content">
                        <div class="form-horizontal">
                            <fieldset>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                        <input type="email" id="register-email" class="form-control" placeholder="请输入注册邮箱">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-key"></i></span>
                                        <input type="password" id="register-pwd-1" class="form-control" placeholder="请输入注册密码">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-key"></i></span>
                                        <input type="password" id="register-pwd-2" class="form-control" placeholder="请再次输入注册密码">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input class="btn btn-info" type="button" id="btn-register" value="注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册">
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="js/jquery-1.10.2.min.js?v=1.0"></script>
<script src="js/bootstrap.min.js?v=1.0"></script>
<script src="js/store.min.js?v=1.0"></script>
<script src="plugins/messenger/js/messenger.min.js?v=1.0"></script>
<script src="plugins/messenger/js/messenger-theme-future.min.js?v=1.0"></script>
<script src="js/ripples.min.js?v=1.0"></script>
<script src="js/material.min.js?v=1.0"></script>
<script src="js/selecttime.min.js?v=1.0"></script>
<!--<script src="js/jquery.dropdown.min.js?v=1.0"></script>-->
<script src="js/bootstrap-select.min.js?v=1.0"></script>
<script src="js/jquery.typeahead.min.js?v=1.0"></script>
<script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201" charset="utf-8"></script>
<script src="js/jquery.tips.min.js?v=1.0"></script>
<script src="js/common.min.js?v=1.0"></script>
<script src="js/alpha-index.min.js?v=1.0"></script>
<script>
   
</script>
<div style="display: none;">
    <script src="http://s11.cnzz.com/z_stat.php?id=1258763697&web_id=1258763697" language="JavaScript"></script>
</div>
</body>
</html>
