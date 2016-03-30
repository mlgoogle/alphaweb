/**
 * 首页操作
 * @type {{docHeight: number, docWidth: number, fixedTop: jindowin.fixedTop, initSelectTimes: jindowin.initSelectTimes, clearIconShowHide: jindowin.clearIconShowHide, receiveTimeChange: jindowin.receiveTimeChange, summaryChange: jindowin.summaryChange, receiveTimesSelectChange: jindowin.receiveTimesSelectChange, settings: jindowin.settings, getMyNewsCount: jindowin.getMyNewsCount}}
 */
var jindowin = {
    /**
     * 可见文档高度
     */
    docHeight: document.documentElement.clientHeight,

    /**
     * 可见文档宽度
     */
    docWidth: document.documentElement.clientWidth,

    /**
     * 固定头部搜索框
     */
    fixedTop: function () {
        $(".search-box").posfixed({
            distance: 0,
            pos: "top",
            type: "while",
            hide: false
        });
    },

    /**
     * 初始化事件选择器
     */
    initSelectTimes: function () {
        var allTimes = selectTime.times();
        var timeHtml = [];
        for (var i = 0; i < allTimes.length; i++) {
            if (i === 9) {
                timeHtml.push("<option value='" + i + "' selected='selected'>" + allTimes[i] + "</option>")
            } else {
                timeHtml.push("<option value='" + i + "'>" + allTimes[i] + "</option>")
            }
        }
        $("#startTime").html(timeHtml.join(''));
        $("#endTime").html(timeHtml.join(''));
        $("#endTime").dropdown({"autoinit": ".select"});
        $("#startTime").dropdown();
        $("#receiveTimes").dropdown();
    },

    /**
     * 接收时间复选框事件
     * @param $this 复选框对象
     */
    receiveTimeChange: function ($this) {
        if ($($this).is(':checked')) {
            $("#receiveBox").removeClass("hide");
        } else {
            $("#receiveBox").addClass("hide");
        }
    },

    /**
     * 接收摘要复选框事件
     * @param $this 复选框对象
     */
    summaryChange: function ($this) {
        if ($($this).is(':checked')) {
            $("#summaryBox").removeClass("hide");
            if ($("#receiveTimes").val() === "0") {
                $("#userDefineBox").removeClass("hide");
            }
        } else {
            $("#summaryBox").addClass("hide");
            $("#userDefineBox").addClass("hide");
        }
    },

    /**
     * 接收频率下拉框选择事件
     */
    receiveTimesSelectChange: function () {
        if ($("#receiveTimes").val() === "0") {
            $("#userDefineBox").removeClass("hide");
            $("#userDefineTimes").focus();
        } else {
            $("#userDefineBox").addClass("hide");
        }
    },

    /**
     * 设置快讯接收
     */
    settings: function () {
        var stime = $("#startTime").val();
        var etime = $("#endTime").val();
        if (stime > etime) {
            $("#settingBoxTips").removeClass("hide").find("p").html("开始时间不能大于结束时间").slideDown();
            return;
        }
        $("#complete-dialog").modal("hide");
    },

    /**
     * 获取我的快讯数量
     */
    getMyNewsCount: function () {
        var myNews = $("#myNewsHead").find("tr").length;
        if (myNews == 0) {
            $("#myNewsCount").html("我的快讯");
            $(".show-all-news").hide();
        } else {
            $("#myNewsCount").html("我的快讯(" + myNews + ")");
        }
    },
    /**
     * 首页信息展示切换
     * @param show 切换首页展示(true)和信息展示(false)
     */
    toggleIndexInfo: function (show) {
        if (show) {
            $(".mynews").removeClass("hide");
            $(".recommendnews").removeClass("hide");
            $(".settingnews").addClass("hide");
            $(".newsinfo").addClass("hide");
        } else {
            $(".mynews").addClass("hide");
            $(".recommendnews").addClass("hide");
            $(".settingnews").removeClass("hide");
            $(".newsinfo").removeClass("hide");
        }
    },
    /**
     * 搜索结果展示
     * @param name 显示名
     * @param group 所属类别(股票，行业，概念，热点事件)
     */
    searchResultShow: function (name, group) {
        switch(group){
            case "股票":
                var gpHtml=[];
                gpHtml.push("<div class=\"gp-infos\">");
                gpHtml.push("                            <div class=\"gp-hotstock\">");
                gpHtml.push("                                <h3 style=\"font-weight: 600;\">招商银行(SH60036)</h3>");
                gpHtml.push("                                <div style=\"position: absolute; padding-left: 232px; margin-top: -40px;\">");
                gpHtml.push("                                    <i class=\"icon iconfont\">&#xf013b;</i>");
                gpHtml.push("                                </div>");
                gpHtml.push("                                <div class=\"right-btn\">");
                gpHtml.push("                                    <label>24.2万人订阅</label>");
                gpHtml.push("                                    <a class=\"btn btn-raised btn-info btn-sm\" href=\"javascript:void(0)\" style=\"background-color: #0068b7;\">订阅</a>");
                gpHtml.push("                                    <a class=\"btn btn-raised btn-info btn-sm\" href=\"javascript:void(0)\" style=\"background-color: #0068b7;\">分享</a>");
                gpHtml.push("                                </div>");
                gpHtml.push("                                <hr>");
                gpHtml.push("                                <h3 style=\"padding-bottom: 10px;\">资讯预览</h3>");
                gpHtml.push("                                <div class=\"container\">");
                gpHtml.push("                                  <table class=\"table\">");
                gpHtml.push("                                      <tr>");
                gpHtml.push("                                          <td>查看热度:<span class=\"text-danger\">0.5% ↑</span></td>");
                gpHtml.push("                                          <td>搜索热度:<span class=\"text-danger\">0.5% ↑</span></td>");
                gpHtml.push("                                          <td>关注热度:<span class=\"text-danger\">0.5% ↑</span></td>");
                gpHtml.push("                                      </tr>");
                gpHtml.push("                                      <tr>");
                gpHtml.push("                                          <td>查看增量:<span class=\"text-danger\">0.5% ↑</span></td>");
                gpHtml.push("                                          <td>搜索增量:<span class=\"text-danger\">0.5% ↑</span></td>");
                gpHtml.push("                                          <td>关注增量:<span class=\"text-danger\">0.5% ↑</span></td>");
                gpHtml.push("                                      </tr>");
                gpHtml.push("                                  </table>");
                gpHtml.push("                                </div>");
                gpHtml.push("                            </div>");
                gpHtml.push("                            <div class=\"gp-xw\">");
                gpHtml.push("                                <div class=\"row\">");
                gpHtml.push("                                    <div class=\"col-md-12\">");
                gpHtml.push("                                        <h4>新闻</h4>");
                gpHtml.push("                                        <hr style=\"margin-top:0; \">");
                gpHtml.push("                                    </div>");
                gpHtml.push("                                    <div class=\"col-md-12\">");
                gpHtml.push("                                        <div class=\"col-md-9\">");
                gpHtml.push("                                            <div class=\"hy-news-top\">");
                gpHtml.push("                                                <h4>\"未来银行\"紧贴互联网 招行零售金融再谋升级</h4>");
                gpHtml.push("                                            </div>");
                gpHtml.push("                                            <div class=\"hy-news-content\">");
                gpHtml.push("                                                <p>");
                gpHtml.push("                                                    早在2004年，招商银行（600036）便率先把零售银行作为“一次转型”的战略方向。田惠宇就任招行行长以来，招行的零售银行战略地位有增无减,在2014年提出的”一体两翼“战略定位中，零售金融作为“一体”，在招商银行的战略支点地位日益凸显...详情");
                gpHtml.push("                                                </p>");
                gpHtml.push("                                            </div>");
                gpHtml.push("                                            <div class=\"hy-news-bottom\">");
                gpHtml.push("                                                <div class=\"col-md-6 text-left\">");
                gpHtml.push("                                                    <label>来源：同花顺&nbsp;&nbsp;&nbsp;&nbsp; 2016-03-21 07:00:00</label>");
                gpHtml.push("                                                </div>");
                gpHtml.push("                                                <div class=\"col-md-6 text-right\">");
                gpHtml.push("                                                    <label>");
                gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe61e;</i>20");
                gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe61d;</i>10");
                gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe610;</i>");
                gpHtml.push("                                                    </label>");
                gpHtml.push("                                                </div>");
                gpHtml.push("                                            </div>");
                gpHtml.push("                                        </div>");
                gpHtml.push("                                        <div class=\"col-md-3 hy-news-pic\">");
                gpHtml.push("                                            <img src=\"imgs/qrcode.png\">");
                gpHtml.push("                                        </div>");
                gpHtml.push("                                    </div>");
                gpHtml.push("                                </div>");
                gpHtml.push("                            </div>");
                gpHtml.push("                            <div class=\"gp-kx\">");
                gpHtml.push("                                <div class=\"row\">");
                gpHtml.push("                                    <div class=\"col-md-12\">");
                gpHtml.push("                                        <h4>快讯</h4>");
                gpHtml.push("                                        <hr style=\"margin-top:0; \">");
                gpHtml.push("                                    </div>");
                gpHtml.push("                                    <div class=\"col-md-12\">");
                gpHtml.push("                                        <div class=\"col-md-9\">");
                gpHtml.push("                                            <div class=\"hy-news-top\">");
                gpHtml.push("                                                <h4>\"未来银行\"紧贴互联网 招行零售金融再谋升级</h4>");
                gpHtml.push("                                            </div>");
                gpHtml.push("                                            <div class=\"hy-news-content\">");
                gpHtml.push("                                                <p>");
                gpHtml.push("                                                    早在2004年，招商银行（600036）便率先把零售银行作为“一次转型”的战略方向。田惠宇就任招行行长以来，招行的零售银行战略地位有增无减,在2014年提出的”一体两翼“战略定位中，零售金融作为“一体”，在招商银行的战略支点地位日益凸显...详情");
                gpHtml.push("                                                </p>");
                gpHtml.push("                                            </div>");
                gpHtml.push("                                            <div class=\"hy-news-bottom\">");
                gpHtml.push("                                                <div class=\"col-md-6 text-left\">");
                gpHtml.push("                                                    <label>来源：同花顺&nbsp;&nbsp;&nbsp;&nbsp; 2016-03-21 07:00:00</label>");
                gpHtml.push("                                                </div>");
                gpHtml.push("                                                <div class=\"col-md-6 text-right\">");
                gpHtml.push("                                                    <label>");
                gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe61e;</i>20");
                gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe61d;</i>10");
                gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe610;</i>");
                gpHtml.push("                                                    </label>");
                gpHtml.push("                                                </div>");
                gpHtml.push("                                            </div>");
                gpHtml.push("                                        </div>");
                gpHtml.push("                                        <div class=\"col-md-3 hy-news-pic\">");
                gpHtml.push("                                            <img src=\"imgs/qrcode.png\">");
                gpHtml.push("                                        </div>");
                gpHtml.push("                                    </div>");
                gpHtml.push("                                </div>");
                gpHtml.push("                            </div>");
                gpHtml.push("                            <div class=\"gp-zmt\">");
                gpHtml.push("                                <div class=\"row\">");
                gpHtml.push("                                    <div class=\"col-md-12\">");
                gpHtml.push("                                        <h4>自媒体</h4>");
                gpHtml.push("                                        <hr style=\"margin-top:0; \">");
                gpHtml.push("                                    </div>");
                gpHtml.push("                                    <div class=\"col-md-12\">");
                gpHtml.push("                                        <div class=\"col-md-9\">");
                gpHtml.push("                                            <div class=\"hy-news-top\">");
                gpHtml.push("                                                <h4>\"未来银行\"紧贴互联网 招行零售金融再谋升级</h4>");
                gpHtml.push("                                            </div>");
                gpHtml.push("                                            <div class=\"hy-news-content\">");
                gpHtml.push("                                                <p>");
                gpHtml.push("                                                    早在2004年，招商银行（600036）便率先把零售银行作为“一次转型”的战略方向。田惠宇就任招行行长以来，招行的零售银行战略地位有增无减,在2014年提出的”一体两翼“战略定位中，零售金融作为“一体”，在招商银行的战略支点地位日益凸显...详情");
                gpHtml.push("                                                </p>");
                gpHtml.push("                                            </div>");
                gpHtml.push("                                            <div class=\"hy-news-bottom\">");
                gpHtml.push("                                                <div class=\"col-md-6 text-left\">");
                gpHtml.push("                                                    <label>来源：同花顺 &nbsp;&nbsp;&nbsp;&nbsp;2016-03-21 07:00:00</label>");
                gpHtml.push("                                                </div>");
                gpHtml.push("                                                <div class=\"col-md-6 text-right\">");
                gpHtml.push("                                                    <label>");
                gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe61e;</i>20");
                gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe61d;</i>10");
                gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe610;</i>");
                gpHtml.push("                                                    </label>");
                gpHtml.push("                                                </div>");
                gpHtml.push("                                            </div>");
                gpHtml.push("                                        </div>");
                gpHtml.push("                                        <div class=\"col-md-3 hy-news-pic\">");
                gpHtml.push("                                            <img src=\"imgs/qrcode.png\">");
                gpHtml.push("                                        </div>");
                gpHtml.push("                                    </div>");
                gpHtml.push("                                </div>");
                gpHtml.push("                            </div>");
                gpHtml.push("                        </div>");
                $("#showInfos").html(gpHtml.join(''));
                break;
            case "行业":
                var hyHtml=[];
                hyHtml.push("<div class=\"hy-infos\">");
                hyHtml.push("                            <div class=\"hy-hotstock\">");
                hyHtml.push("                                <h3 style=\"font-weight: 600;\">金融业</h3>");
                hyHtml.push("                                <div style=\"position: absolute; padding-left: 92px; margin-top: -40px;\">");
                hyHtml.push("                                    <i class=\"icon iconfont\">&#xf013b;</i>");
                hyHtml.push("                                </div>");
                hyHtml.push("                                <div class=\"right-btn\">");
                hyHtml.push("                                    <label>24.2万人订阅</label>");
                hyHtml.push("                                    <a class=\"btn btn-raised btn-info btn-sm\" href=\"javascript:void(0)\" style=\"background-color: #0068b7;\">订阅</a>");
                hyHtml.push("                                    <a class=\"btn btn-raised btn-info btn-sm\" href=\"javascript:void(0)\" style=\"background-color: #0068b7;\">分享</a>");
                hyHtml.push("                                </div>");
                hyHtml.push("                                <hr>");
                hyHtml.push("                                <h3 style=\"padding-bottom: 10px;\">资讯预览</h3>");
                hyHtml.push("                                <h4>金融热门股票</h4>");
                hyHtml.push("                                <div class=\"container hot-stock\">");
                hyHtml.push("                                    <div class=\"col-md-4\">");
                hyHtml.push("                                        <div class=\"panel panel-default\">");
                hyHtml.push("                                            <div class=\"panel-heading\">浦发银行 SH001263</div>");
                hyHtml.push("                                            <div class=\"panel-body\">");
                hyHtml.push("                                                <table class=\"table text-center\">");
                hyHtml.push("                                                    <tr>");
                hyHtml.push("                                                        <td>查看：0.5%</td>");
                hyHtml.push("                                                        <td>查看增量：0.5%</td>");
                hyHtml.push("                                                    </tr>");
                hyHtml.push("                                                    <tr>");
                hyHtml.push("                                                        <td>搜索：0.5%</td>");
                hyHtml.push("                                                        <td>搜索增量：0.5%</td>");
                hyHtml.push("                                                    </tr>");
                hyHtml.push("                                                    <tr>");
                hyHtml.push("                                                        <td>关注：0.5%</td>");
                hyHtml.push("                                                        <td>关注增量：0.5%</td>");
                hyHtml.push("                                                    </tr>");
                hyHtml.push("                                                </table>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                        </div>");
                hyHtml.push("                                    </div>");
                hyHtml.push("                                    <div class=\"col-md-4\">");
                hyHtml.push("                                        <div class=\"panel panel-default\">");
                hyHtml.push("                                            <div class=\"panel-heading\">平安银行 SH001263</div>");
                hyHtml.push("                                            <div class=\"panel-body\">");
                hyHtml.push("                                                <table class=\"table text-center\">");
                hyHtml.push("                                                    <tr>");
                hyHtml.push("                                                        <td>查看：0.5%</td>");
                hyHtml.push("                                                        <td>查看增量：0.5%</td>");
                hyHtml.push("                                                    </tr>");
                hyHtml.push("                                                    <tr>");
                hyHtml.push("                                                        <td>搜索：0.5%</td>");
                hyHtml.push("                                                        <td>搜索增量：0.5%</td>");
                hyHtml.push("                                                    </tr>");
                hyHtml.push("                                                    <tr>");
                hyHtml.push("                                                        <td>关注：0.5%</td>");
                hyHtml.push("                                                        <td>关注增量：0.5%</td>");
                hyHtml.push("                                                    </tr>");
                hyHtml.push("                                                </table>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                        </div>");
                hyHtml.push("                                    </div>");
                hyHtml.push("                                    <div class=\"col-md-4\">");
                hyHtml.push("                                        <div class=\"panel panel-default\">");
                hyHtml.push("                                            <div class=\"panel-heading\">招商银行 SH001263</div>");
                hyHtml.push("                                            <div class=\"panel-body\">");
                hyHtml.push("                                                <table class=\"table text-center\">");
                hyHtml.push("                                                    <tr>");
                hyHtml.push("                                                        <td>查看：0.5%</td>");
                hyHtml.push("                                                        <td>查看增量：0.5%</td>");
                hyHtml.push("                                                    </tr>");
                hyHtml.push("                                                    <tr>");
                hyHtml.push("                                                        <td>搜索：0.5%</td>");
                hyHtml.push("                                                        <td>搜索增量：0.5%</td>");
                hyHtml.push("                                                    </tr>");
                hyHtml.push("                                                    <tr>");
                hyHtml.push("                                                        <td>关注：0.5%</td>");
                hyHtml.push("                                                        <td>关注增量：0.5%</td>");
                hyHtml.push("                                                    </tr>");
                hyHtml.push("                                                </table>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                        </div>");
                hyHtml.push("                                    </div>");
                hyHtml.push("                                </div>");
                hyHtml.push("                            </div>");
                hyHtml.push("                            <div class=\"hy-xw\">");
                hyHtml.push("                                <div class=\"row\">");
                hyHtml.push("                                    <div class=\"col-md-12\">");
                hyHtml.push("                                        <h4>新闻</h4>");
                hyHtml.push("                                        <hr style=\"margin-top:0; \">");
                hyHtml.push("                                    </div>");
                hyHtml.push("                                    <div class=\"col-md-12\">");
                hyHtml.push("                                        <div class=\"col-md-9\">");
                hyHtml.push("                                            <div class=\"hy-news-top\">");
                hyHtml.push("                                                <h4>\"未来银行\"紧贴互联网 招行零售金融再谋升级</h4>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                            <div class=\"hy-news-content\">");
                hyHtml.push("                                                <p>");
                hyHtml.push("                                                    早在2004年，招商银行（600036）便率先把零售银行作为“一次转型”的战略方向。田惠宇就任招行行长以来，招行的零售银行战略地位有增无减,在2014年提出的”一体两翼“战略定位中，零售金融作为“一体”，在招商银行的战略支点地位日益凸显...详情");
                hyHtml.push("                                                </p>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                            <div class=\"hy-news-bottom\">");
                hyHtml.push("                                                <div class=\"col-md-6 text-left\">");
                hyHtml.push("                                                    <label>来源：同花顺&nbsp;&nbsp;&nbsp;&nbsp; 2016-03-21 07:00:00</label>");
                hyHtml.push("                                                </div>");
                hyHtml.push("                                                <div class=\"col-md-6 text-right\">");
                hyHtml.push("                                                    <label>");
                hyHtml.push("                                                        <i class=\"icon iconfont\">&#xe61e;</i>20");
                hyHtml.push("                                                        <i class=\"icon iconfont\">&#xe61d;</i>10");
                hyHtml.push("                                                        <i class=\"icon iconfont\">&#xe610;</i>");
                hyHtml.push("                                                    </label>");
                hyHtml.push("                                                </div>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                        </div>");
                hyHtml.push("                                        <div class=\"col-md-3 hy-news-pic\">");
                hyHtml.push("                                            <img src=\"imgs/qrcode.png\">");
                hyHtml.push("                                        </div>");
                hyHtml.push("                                    </div>");
                hyHtml.push("                                </div>");
                hyHtml.push("                            </div>");
                hyHtml.push("                            <div class=\"hy-kx\">");
                hyHtml.push("                                <div class=\"row\">");
                hyHtml.push("                                    <div class=\"col-md-12\">");
                hyHtml.push("                                        <h4>快讯</h4>");
                hyHtml.push("                                        <hr style=\"margin-top:0; \">");
                hyHtml.push("                                    </div>");
                hyHtml.push("                                    <div class=\"col-md-12\">");
                hyHtml.push("                                        <div class=\"col-md-9\">");
                hyHtml.push("                                            <div class=\"hy-news-top\">");
                hyHtml.push("                                                <h4>\"未来银行\"紧贴互联网 招行零售金融再谋升级</h4>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                            <div class=\"hy-news-content\">");
                hyHtml.push("                                                <p>");
                hyHtml.push("                                                    早在2004年，招商银行（600036）便率先把零售银行作为“一次转型”的战略方向。田惠宇就任招行行长以来，招行的零售银行战略地位有增无减,在2014年提出的”一体两翼“战略定位中，零售金融作为“一体”，在招商银行的战略支点地位日益凸显...详情");
                hyHtml.push("                                                </p>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                            <div class=\"hy-news-bottom\">");
                hyHtml.push("                                                <div class=\"col-md-6 text-left\">");
                hyHtml.push("                                                    <label>来源：同花顺&nbsp;&nbsp;&nbsp;&nbsp; 2016-03-21 07:00:00</label>");
                hyHtml.push("                                                </div>");
                hyHtml.push("                                                <div class=\"col-md-6 text-right\">");
                hyHtml.push("                                                    <label>");
                hyHtml.push("                                                        <i class=\"icon iconfont\">&#xe61e;</i>20");
                hyHtml.push("                                                        <i class=\"icon iconfont\">&#xe61d;</i>10");
                hyHtml.push("                                                        <i class=\"icon iconfont\">&#xe610;</i>");
                hyHtml.push("                                                    </label>");
                hyHtml.push("                                                </div>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                        </div>");
                hyHtml.push("                                        <div class=\"col-md-3 hy-news-pic\">");
                hyHtml.push("                                            <img src=\"imgs/qrcode.png\">");
                hyHtml.push("                                        </div>");
                hyHtml.push("                                    </div>");
                hyHtml.push("                                </div>");
                hyHtml.push("                            </div>");
                hyHtml.push("                            <div class=\"hy-zmt\">");
                hyHtml.push("                                <div class=\"row\">");
                hyHtml.push("                                    <div class=\"col-md-12\">");
                hyHtml.push("                                        <h4>自媒体</h4>");
                hyHtml.push("                                        <hr style=\"margin-top:0; \">");
                hyHtml.push("                                    </div>");
                hyHtml.push("                                    <div class=\"col-md-12\">");
                hyHtml.push("                                        <div class=\"col-md-9\">");
                hyHtml.push("                                            <div class=\"hy-news-top\">");
                hyHtml.push("                                                <h4>\"未来银行\"紧贴互联网 招行零售金融再谋升级</h4>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                            <div class=\"hy-news-content\">");
                hyHtml.push("                                                <p>");
                hyHtml.push("                                                    早在2004年，招商银行（600036）便率先把零售银行作为“一次转型”的战略方向。田惠宇就任招行行长以来，招行的零售银行战略地位有增无减,在2014年提出的”一体两翼“战略定位中，零售金融作为“一体”，在招商银行的战略支点地位日益凸显...详情");
                hyHtml.push("                                                </p>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                            <div class=\"hy-news-bottom\">");
                hyHtml.push("                                                <div class=\"col-md-6 text-left\">");
                hyHtml.push("                                                    <label>来源：同花顺 &nbsp;&nbsp;&nbsp;&nbsp;2016-03-21 07:00:00</label>");
                hyHtml.push("                                                </div>");
                hyHtml.push("                                                <div class=\"col-md-6 text-right\">");
                hyHtml.push("                                                    <label>");
                hyHtml.push("                                                        <i class=\"icon iconfont\">&#xe61e;</i>20");
                hyHtml.push("                                                        <i class=\"icon iconfont\">&#xe61d;</i>10");
                hyHtml.push("                                                        <i class=\"icon iconfont\">&#xe610;</i>");
                hyHtml.push("                                                    </label>");
                hyHtml.push("                                                </div>");
                hyHtml.push("                                            </div>");
                hyHtml.push("                                        </div>");
                hyHtml.push("                                        <div class=\"col-md-3 hy-news-pic\">");
                hyHtml.push("                                            <img src=\"imgs/qrcode.png\">");
                hyHtml.push("                                        </div>");
                hyHtml.push("                                    </div>");
                hyHtml.push("                                </div>");
                hyHtml.push("                            </div>");
                hyHtml.push("                        </div>");
                $("#showInfos").html(hyHtml.join(''));
                break;
            case "概念":
                var gnHtml = [];
                gnHtml.push("<div class=\"gn-infos\">");
                gnHtml.push("                           当前概念板块下无内容");
                gnHtml.push("                        </div>");
                $("#showInfos").html(gnHtml.join(''));
                break;
            case "热点事件":
                var rdHtml = [];
                rdHtml.push("<div class=\"gn-infos\">");
                rdHtml.push("                           当前热点事件板块下无内容");
                rdHtml.push("                        </div>");
                $("#showInfos").html(rdHtml.join(''));
                break;
        }
    }
};

/**
 * 扩展animatecss
 */
$.fn.extend({
    animateCss: function (animationName, delId, backFn) {
        var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        $(this).addClass("animated " + animationName).one(animationEnd, function () {
            $(this).removeClass("animated " + animationName);
            $("#" + delId).remove();
            backFn();
        });
    }
});

/**
 * 初始化material
 */
$.material.init();
jindowin.fixedTop();
jindowin.initSelectTimes();
jindowin.getMyNewsCount();

/**
 * 我的快讯-查看所有
 */
$("#showMyAll").bind("click", function () {

});

/**
 * 快讯推荐-股票-查看所有
 */
$("#rec-gp-all").bind("click", function () {

});

/**
 * 快讯行业-股票-查看所有
 */
$("#rec-hy-all").bind("click", function () {

});

/**
 * 快讯概念-股票-查看所有
 */
$("#rec-gn-all").bind("click", function () {

});

/**
 * 设置快讯-确定
 */
$("#settingOk").bind("click", function () {
    jindowin.settings();
});

/**
 * 接收频次自定义
 */
$("#receiveTimes").change(function () {
    jindowin.receiveTimesSelectChange();
});

/**
 * 接收时间-复选框选择
 */
$("#cbReceiveTime").change(function () {
    jindowin.receiveTimeChange($(this));
});

/**
 * 接收摘要-复选框选择
 */
$("#cbSummary").change(function () {
    jindowin.summaryChange($(this));
});

/**
 * 搜索框改变事件
 */
$("#search-input").bind("input propertychange", function () {
    if ($(this).val() === "") {
        jindowin.toggleIndexInfo(true);
    }
});

/**
 * 微信图标点击事件
 */
$("#wechat").bind("click", function () {
    var wechatTop = jindowin.docHeight / 2 - 221;
    $("#wechat-dialog").css("top", wechatTop + "px")
    $("#wechat-dialog").modal();
});

/**
 * 我的快讯-删除
 */
$("#myNewsHead>tbody>tr>td>.fa-times").each(function () {
    $(this).click(function () {
        var delId = $(this).parents().parents().attr("id");
        // $("#" + delId).animateCss("fadeOutRight", delId, function () {
        //     jindowin.getMyNewsCount();
        // });
        $("#" + delId).fadeOut("normal", function () {
            $(this).remove();
            jindowin.getMyNewsCount();
        })
    })
});

/**
 * 我的快讯-编辑
 */
$("#myNewsHead>tbody>tr>td>.fa-pencil").each(function () {
    $(this).click(function () {
        var delId = $(this).parents().parents().attr("id");
        $("#complete-dialog").modal();
    })
});

/**
 *快讯推荐-订阅
 */
$("#allrecommend table tbody tr td .fa-plus").each(function () {
    $(this).click(function () {
        if ($(this).hasClass("fa-check")) {
            $(this).removeClass("fa-check").addClass("fa-plus");
        } else {
            $(this).removeClass("fa-plus").addClass("fa-check");
        }
    })
});

/**
 * 搜索框自动完成
 */
$("#search-input").typeahead({
    minLength: 1,
    maxItem: 20,
    order: "asc",
    hint: true,
    group: [true, "{{group}}"],
    maxItemPerGroup: 5,
    backdrop: false,
    dynamic: true,
    emptyTemplate: '未找到 "{{query}}" 的相关信息',
    source: {
        "股票": {url: ["ajax/ajax_search.php?message={{query}}", "stock"]},
        "行业": {url: ["ajax/ajax_search.php?message={{query}}", "hy"]},
        "概念": {url: ["ajax/ajax_search.php?message={{query}}", "gn"]},
        "热点事件": {url: ["ajax/ajax_search.php?message={{query}}", "rd"]}
    },
    callback: {
        onClickAfter: function (node, a, item, event) {
            if (item.display !== "") {
                jindowin.toggleIndexInfo(false);
                jindowin.searchResultShow(item.display,item.group);
                console.log("你选择了\"" + item.group + "\"下的\"" + item.display + "\"");
            }
        },
        onSubmit: function (node, a, item, event) {
            if (item.display !== "") {
                jindowin.toggleIndexInfo(false);
                jindowin.searchResultShow(item.display,item.group);
                console.log("你选择了\"" + item.group + "\"下的\"" + item.display + "\"");
            }
        }
    },
    debug: true
});
