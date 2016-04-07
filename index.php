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
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/bootstrap.min.css?v=1.0" rel="stylesheet">
    <link href="css/bootstrap-material-design.min.css?v=1.0" rel="stylesheet">
    <link href="css/ripples.min.css?v=1.0" rel="stylesheet">
    <link href="css/jquery.dropdown.min.css?v=1.0" rel="stylesheet">
    <link rel="stylesheet" href="css/font-awesome.min.css?v=1.0">
    <link rel="stylesheet" href="css/style.min.css?v=1.0">
    <link rel="stylesheet" href="css/animate.min.css?v=1.0">
    <link rel="stylesheet" href="css/iconfont.min.css?v=1.0">
    <link rel="stylesheet" href="css/jquery.typeahead.min.css?v=1.0">
</head>
<body>
<!--头部菜单&搜索框-->
<div class="navbar navbar-inverse hidden-print top-pic">
    <div class="container" style="height: 164px;">
        <div class="navbar-header">
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
                <li><a href="javascript:void(0)"><i class="icon iconfont">&#xe73b;</i>&nbsp;悟空官网</a></li>
                <li><a href="javascript:void(0)" id="wechat"> <i class="icon iconfont">&#xe679;</i>&nbsp;微信关注</a></li>
            </ul>
        </div>
        <div class="col-xs-8 col-xs-offset-2" style="padding-left: 0; padding-right: 0;">
            <h2>快讯</h2>
            <p class="toptips">
                随时跟踪网上是否由您感兴趣的股票新内容
            </p>
        </div>
    </div>
    <div class="col-md-12 search-box">
        <div class="container">
            <div class="col-md-8 col-md-offset-2" style="padding-left: 5px; padding-right: 5px">
                <div class="typeahead-container">
                    <div class="typeahead-field">
                        <section id="search">
                            <label for="search-input">
                                <i class="icon iconfont">&#xe622;</i>
                            </label>
                            <input id="search-input" type="search" placeholder="创建关于以下内容的快讯" autocomplete="off"
                                   spellcheck="false" autocorrect="off" tabindex="1">
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--提示框-->
<div class="container hide" id="allTips">
    <div class="bs-docs-section">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="bs-component">
                    <div class="alert alert-dismissible">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        <p>这是一堆警告内容</p>
                        <button type="button" class="btn btn-default" id="testtest">
                            测试弹出分享按钮
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--主体内容-->
<div class="container">
    <!--我的快讯模块-->
    <div class="bs-docs-section mynews" style="display: none;">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
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
                        <i class="fa fa-cog" data-toggle="modal" data-target="#complete-dialog"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--快讯推荐模块-->
    <div class="bs-docs-section recommendnews">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
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
            <div class="col-md-8 col-md-offset-2">
                <div class="bs-component">
                    <div class="jumbotron">
                        <h5 style="padding-bottom: 10px; font-weight: 600;">将为您“<?php echo $uname; ?>
                            ”创建每天早上09:00的快讯</h5>
                        <a class="btn btn-raised btn-info" href="javascript:void(0)" style="background-color: #0068b7;">创建快讯</a>
                        <a class="show-my-setting" href="javascript:void(0)" style="margin-left: 40px;">显示选项</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--快讯列表模块-->
    <div class="bs-docs-section newsinfo hide">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
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
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">订阅设置</h4>
            </div>
            <div class="modal-body">
                <div id="settings" class="row">
                    <div class="col-xs-12">
                        <div class="checkbox">
                            <label>
                                <input id="cbReceiveTime" type="checkbox"> &nbsp;&nbsp;接收时间
                            </label>
                        </div>
                        <p class="text-muted">选择接收快讯的时间</p>
                        <div class="form-group hide" id="receiveBox">
                            <label for="startTime" class="col-md-3 control-label">开始时间</label>
                            <div class="col-md-9">
                                <select id="startTime" class="form-control"></select>
                            </div>
                            <label for="endTime" class="col-md-3 control-label">结束时间</label>
                            <div class="col-md-9">
                                <select id="endTime" class="form-control"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <hr>
                    </div>
                    <div class="col-xs-12">
                        <div class="checkbox">
                            <label>
                                <input id="cbSummary" type="checkbox"> &nbsp;&nbsp;接收摘要
                            </label>
                        </div>
                        <p class="text-muted">在一封电子邮件中囊括所有查询通知</p>
                        <div class="form-group hide" id="summaryBox">
                            <label for="receiveTimes" class="col-md-3 control-label">接收频次</label>
                            <div class="col-md-9">
                                <select id="receiveTimes" class="form-control">
                                    <option value="1">实时</option>
                                    <option value="2">每半小时一次</option>
                                    <option value="3">每小时一次</option>
                                    <option value="4">每两小时一次</option>
                                    <option value="0">自定义</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group hide" id="userDefineBox">
                            <div class="col-md-9 col-md-offset-3">
                                <input class="form-control" type="number" min="0" max="96" id="userDefineTimes"
                                       placeholder="自定义接收频次(小时/次)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="btn btn-danger" data-dismiss="modal">
                    <span>取消</span>
                </a>
                <a class="btn btn-info" id="settingOk">
                    <span>确定</span>
                </a>
            </div>
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
                <li role="presentation" class="active">
                    <span href="#user-login" id="home-tab" role="tab" data-toggle="tab" aria-controls="user-login"
                          aria-expanded="true">用户登录</span>
                </li>
                <li role="presentation" class="">
                    <span href="#user-register" role="tab" id="profile-tab" data-toggle="tab"
                          aria-controls="user-register" aria-expanded="false">邮箱注册</span>
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
                                        <input type="email" id="login-email" class="form-control" placeholder="请输入登录邮箱"
                                               maxlength="18">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-key"></i></span>
                                        <input type="password" id="login-pwd" class="form-control" placeholder="请输入登录密码"
                                               maxlength="16">
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
                                    <input class="btn btn-info" type="button" id="btn-login"
                                           value="登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录">
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
                                        <input type="email" id="register-email" class="form-control"
                                               placeholder="请输入注册邮箱">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-key"></i></span>
                                        <input type="password" id="register-pwd-1" class="form-control"
                                               placeholder="请输入注册密码">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-key"></i></span>
                                        <input type="password" id="register-pwd-2" class="form-control"
                                               placeholder="请再次输入注册密码">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input class="btn btn-info" type="button" id="btn-register"
                                           value="注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册">
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
<script src="js/jquery-1.10.2.min.js?v=1.0"></script>
<script src="js/bootstrap.min.js?v=1.0"></script>
<script src="js/ripples.min.js?v=1.0"></script>
<script src="js/material.min.js?v=1.0"></script>
<script src="js/selecttime.min.js?v=1.0"></script>
<script src="js/jquery.dropdown.min.js?v=1.0"></script>
<script src="js/jquery.typeahead.min.js?v=1.0"></script>
<script src="js/stickUp.min.js?v=1.0"></script>
<script src="js/jindowin-index.min.js?v=1.0"></script>
<script>
    jQuery(function ($) {
        $.material.init();
        jindowin.getIndexStock();
        jindowin.getIndexIndustry();
        jindowin.getIndexSection();
        jindowin.querySubscribe();
        jindowin.initSelectTimes();
        jindowin.getMyNewsCount();

        $(document).ready(function () {
            $('.search-box').stickUp({
                marginTop: 'auto'
            });
        });
    });
</script>