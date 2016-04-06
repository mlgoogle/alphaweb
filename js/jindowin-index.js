/**
 * 首页操作
 * @type {{docHeight: number, docWidth: number, fixedTop: jindowin.fixedTop, initSelectTimes: jindowin.initSelectTimes, receiveTimeChange: jindowin.receiveTimeChange, summaryChange: jindowin.summaryChange, receiveTimesSelectChange: jindowin.receiveTimesSelectChange, settings: jindowin.settings, getMyNewsCount: jindowin.getMyNewsCount, toggleIndexInfo: jindowin.toggleIndexInfo, searchResultShow: jindowin.searchResultShow, showorhide: jindowin.showorhide, buildStockInfo: jindowin.buildStockInfo, buildIndustryInfo: jindowin.buildIndustryInfo, buildConceptInfo: jindowin.buildConceptInfo, buildHoteventInfo: jindowin.buildHoteventInfo}}
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
        var myNews = $("#myNewsHead").find("tr");
        if (myNews.length == 0) {
            $("#myNewsCount").html("我的快讯");
            $(".bs-docs-section.mynews").hide();
        } else if (myNews.length == 5) {
            $(".show-all-news").hide();
        } else {
            $("#myNewsCount").html("我的快讯(" + myNews.length + ")");
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
     * 查看更多按钮点击效果
     * @param $this 按钮对象
     */
    showorhide: function ($this) {
        if ($($this).attr("data-show-all") === "false") {
            $($this).find("div:first-child").html("点击隐藏更多");
            $($this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
            $($this).attr("data-show-all", "true");
            if ($this.attr("id") === "showMyAll") {
                $("#myNewsHead>tbody>tr:gt(4)").removeClass("hide");
            }
            if ($this.attr("id") === "rec-gp-all") {
                $("#gp-container div:hidden").removeClass("hide");
            }
            if ($this.attr("id") === "rec-hy-all") {
                $("#hy-container div:hidden").removeClass("hide");
            }
            if ($this.attr("id") === "rec-gn-all") {
                $("#gn-container div:hidden").removeClass("hide");
            }
            return;
        }
        if ($($this).attr("data-show-all") === "true") {
            $($this).find("div:first-child").html("点击展开更多");
            $($this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            $($this).attr("data-show-all", "false");
            if ($this.attr("id") === "showMyAll") {
                $("#myNewsHead>tbody>tr:gt(4)").addClass("hide");
            }
            if ($this.attr("id") === "rec-gp-all") {
                $("#gp-container div:gt(2)").addClass("hide");
            }
            if ($this.attr("id") === "rec-hy-all") {
                $("#hy-container div:gt(2)").addClass("hide");
            }
            if ($this.attr("id") === "rec-gn-all") {
                $("#gn-container div:gt(2)").addClass("hide");
            }
            return;
        }
    },

    /**
     * 搜索结果展示
     * @param name 显示名
     * @param group 所属类别(股票，行业，概念，热点事件)
     */
    searchResultShow: function (name, group) {
        switch (group) {
            case "股票":
                this.buildStockInfo();
                break;
            case "行业":
                this.buildIndustryInfo();
                break;
            case "概念":
                this.buildConceptInfo();
                break;
            case "热点事件":
                this.buildHoteventInfo();
                break;
            default:
                $("#showInfos").html('');
                break;
        }
    },

    /**
     * 构建股票信息
     */
    buildStockInfo: function () {
        var gpHtml = [];
        gpHtml.push("<div class=\"gp-infos\">");
        gpHtml.push("<div class=\"gp-hotstock\">");

        //<editor-fold desc="股票头信息">
        gpHtml.push("<h3 style=\"font-weight: 600;\">招商银行(SH60036)</h3>");
        gpHtml.push("<div style=\"position: absolute; padding-left: 232px; margin-top: -40px;\"><i class=\"icon iconfont\">&#xf013b;</i></div>");
        gpHtml.push("<div class=\"right-btn\"><label>24.2万人订阅</label>");
        gpHtml.push("<a class=\"btn btn-raised btn-info btn-sm info-subscription\" href=\"javascript:void(0)\" style=\"background-color: #0068b7;\">订阅</a>");
        gpHtml.push("<a class=\"btn btn-raised btn-info btn-sm info-share\" href=\"javascript:void(0)\" style=\"background-color: #0068b7;\">分享</a>");
        gpHtml.push("</div>");
        //</editor-fold>

        gpHtml.push("<hr>");

        //<editor-fold desc="资讯预览">
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
        //</editor-fold>

        gpHtml.push("</div>");

        //<editor-fold desc="循环生成新闻">
        gpHtml.push("                            <div class=\"gp-xw\">");
        gpHtml.push("                                <div class=\"row\">");
        gpHtml.push("                                    <div class=\"col-md-12\">");
        gpHtml.push("                                        <h4>新闻</h4>");
        gpHtml.push("                                        <hr style=\"margin-top:0; \">");
        gpHtml.push("                                    </div>");
        gpHtml.push("                                    <div class=\"col-md-12\">");
        gpHtml.push("                                        <div class=\"col-md-9\">");
        gpHtml.push("                                            <div class=\"list-news-top\">");
        gpHtml.push("                                                <h4>\"未来银行\"紧贴互联网 招行零售金融再谋升级</h4>");
        gpHtml.push("                                            </div>");
        gpHtml.push("                                            <div class=\"list-news-content\">");
        gpHtml.push("                                                <p>");
        gpHtml.push("                                                    早在2004年，招商银行（600036）便率先把零售银行作为“一次转型”的战略方向。田惠宇就任招行行长以来，招行的零售银行战略地位有增无减,在2014年提出的”一体两翼“战略定位中，零售金融作为“一体”，在招商银行的战略支点地位日益凸显...详情");
        gpHtml.push("                                                </p>");
        gpHtml.push("                                            </div>");
        gpHtml.push("                                            <div class=\"list-news-bottom\">");
        gpHtml.push("                                                <div class=\"col-sm-6 text-left\">");
        gpHtml.push("                                                    <label>来源：同花顺&nbsp;&nbsp;&nbsp;&nbsp; 2016-03-21 07:00:00</label>");
        gpHtml.push("                                                </div>");
        gpHtml.push("                                                <div class=\"col-sm-6 text-right\">");
        gpHtml.push("                                                    <label>");
        gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe61e;</i>20");
        gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe61d;</i>10");
        gpHtml.push("                                                        <i class=\"icon iconfont\">&#xe610;</i>");
        gpHtml.push("                                                    </label>");
        gpHtml.push("                                                </div>");
        gpHtml.push("                                            </div>");
        gpHtml.push("                                        </div>");
        gpHtml.push("                                        <div class=\"col-md-3 list-news-pic\">");
        gpHtml.push("                                            <img src=\"imgs/qrcode.png\">");
        gpHtml.push("                                        </div>");
        gpHtml.push("                                    </div>");
        gpHtml.push("                                </div>");
        gpHtml.push("                            </div>");
        //</editor-fold>

        gpHtml.push("</div>");
        $("#showInfos").html(gpHtml.join(''));
    },

    /**
     * 构建行业信息
     */
    buildIndustryInfo: function () {
        var hyHtml = [];
        hyHtml.push("<div class=\"hy-infos\">");
        hyHtml.push("<div class=\"hy-hotstock\">");

        //<editor-fold desc="行业头信息">
        hyHtml.push("<h3 style=\"font-weight: 600;\">金融业</h3>");
        hyHtml.push("<div style=\"position: absolute; padding-left: 92px; margin-top: -40px;\">");
        hyHtml.push("<i class=\"icon iconfont\">&#xf013b;</i>");
        hyHtml.push("</div>");
        hyHtml.push("<div class=\"right-btn\">");
        hyHtml.push("<label>24.2万人订阅</label>");
        hyHtml.push("<a class=\"btn btn-raised btn-info btn-sm info-subscription\" href=\"javascript:void(0)\" style=\"background-color: #0068b7;\">订阅</a>");
        hyHtml.push("<a class=\"btn btn-raised btn-info btn-sm info-share\" href=\"javascript:void(0)\" style=\"background-color: #0068b7;\">分享</a>");
        hyHtml.push("</div>");
        //</editor-fold>

        hyHtml.push("<hr>");

        //<editor-fold desc="热门股票">
        hyHtml.push("<h3 style=\"padding-bottom: 10px;\">资讯预览</h3>");
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
        //</editor-fold>

        hyHtml.push("</div>");

        //<editor-fold desc="循环生成新闻">
        hyHtml.push("                            <div class=\"hy-xw\">");
        hyHtml.push("                                <div class=\"row\">");
        hyHtml.push("                                    <div class=\"col-md-12\">");
        hyHtml.push("                                        <h4>新闻</h4>");
        hyHtml.push("                                        <hr style=\"margin-top:0; \">");
        hyHtml.push("                                    </div>");
        hyHtml.push("                                    <div class=\"col-md-12\">");
        hyHtml.push("                                        <div class=\"col-md-9\">");
        hyHtml.push("                                            <div class=\"list-news-top\">");
        hyHtml.push("                                                <h4>\"未来银行\"紧贴互联网 招行零售金融再谋升级</h4>");
        hyHtml.push("                                            </div>");
        hyHtml.push("                                            <div class=\"list-news-content\">");
        hyHtml.push("                                                <p>");
        hyHtml.push("                                                    早在2004年，招商银行（600036）便率先把零售银行作为“一次转型”的战略方向。田惠宇就任招行行长以来，招行的零售银行战略地位有增无减,在2014年提出的”一体两翼“战略定位中，零售金融作为“一体”，在招商银行的战略支点地位日益凸显...详情");
        hyHtml.push("                                                </p>");
        hyHtml.push("                                            </div>");
        hyHtml.push("                                            <div class=\"list-news-bottom\">");
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
        hyHtml.push("                                        <div class=\"col-md-3 list-news-pic\">");
        hyHtml.push("                                            <img src=\"imgs/qrcode.png\">");
        hyHtml.push("                                        </div>");
        hyHtml.push("                                    </div>");
        hyHtml.push("                                </div>");
        hyHtml.push("                            </div>");
        //</editor-fold>

        hyHtml.push("</div>");
        $("#showInfos").html(hyHtml.join(''));
    },

    /**
     * 构建概念信息
     */
    buildConceptInfo: function () {
        var gnHtml = [];
        gnHtml.push("<div class=\"gn-infos\">当前概念板块下无内容</div>");
        $("#showInfos").html(gnHtml.join(''));
    },
    /**
     * 构建热点事件信息
     */
    buildHoteventInfo: function () {
        var rdHtml = [];
        rdHtml.push("<div class=\"rd-infos\">当前热点事件板块下无内容</div>");
        $("#showInfos").html(rdHtml.join(''));
    },
    /**
     * 获取首页推荐股票
     */
    getIndexStock: function () {
        $.ajax({
            url: "ajax/ajax_query_stock.php",
            dataType: "json",
            type: "post",
            beforeSend: function () {

            },
            success: function (result) {
                if (result && result.status === 1) {
                    if (result.stock.length > 0) {
                        var split_len = 3;//分割数量大小
                        if (result != null && result.stock != null) {
                            var stockHtml = '<div class="container">';
                            var table_len = result.stock.length / split_len;
                            if (result.stock.length % split_len > 0) {
                                table_len += 1;
                            }
                            for (var i = 0; i < table_len; i++) {
                                var pageStart = (i * split_len);
                                var pageEnd = i == 0 ? split_len : ((i + 1) * split_len)
                                if (pageStart > result.stock.length) break;
                                stockHtml += ' <div class="col-md-6 ' + (i >= 2 ? "hide" : "") + '"><table class="table table-hover"><tbody>';
                                for (var j = pageStart; j < pageEnd; j++) {
                                    if (!result.stock[j]) break;
                                    stockHtml += '<tr><td><img src="imgs/icon.png"></td><td>' + result.stock[j].stock_name + '(' + result.stock[j].stock_code + ')</td><td><i class="fa fa-plus"></i></td></tr>';
                                }
                                stockHtml += '</tbody></table></div>';
                            }
                            if (result.stock.length > 6) {
                                $("#rec-gp-all").show();
                            }
                            $('#gp-container').html(stockHtml);
                            jindowin.stockFollowInfo();
                        }
                    }
                } else {
                    $("#gp-container").next().hide();
                }
            }
        });
    },
    /**
     * 获取首页推荐行业
     */
    getIndexIndustry: function () {
        $.ajax({
            url: "ajax/ajax_query_industry.php",
            dataType: "json",
            type: "post",
            beforeSend: function () {
            },
            success: function (result) {
                if (result && result.status === 1) {
                    if (result.industry.length > 0) {
                        var split_len = 3;//分割数量大小
                        if (result != null && result.industry != null) {
                            var industryHtml = '<div class="container">';
                            var table_len = result.industry.length / split_len;
                            if (result.industry.length % split_len > 0) {
                                table_len += 1;
                            }
                            for (var i = 0; i < table_len; i++) {
                                var pageStart = (i * split_len);
                                var pageEnd = i == 0 ? split_len : ((i + 1) * split_len)
                                if (pageStart > result.industry.length) break;
                                industryHtml += ' <div class="col-md-6 ' + (i >= 2 ? "hide" : "") + '"><table class="table table-hover"><tbody>';
                                for (var j = pageStart; j < pageEnd; j++) {
                                    if (!result.industry[j]) break;
                                    industryHtml += '<tr><td><img src="imgs/icon.png"></td><td>' + result.industry[j].hy_name + '</td><td><i class="fa fa-plus"></i></td></tr>';
                                }
                                industryHtml += '</tbody></table></div>';
                            }
                            if (result.industry.length > 6) {
                                $("#rec-hy-all").show();
                            }
                            $('#hy-container').html(industryHtml);
                            jindowin.industryFollowInfo();
                        }
                    }
                } else {
                    $("#hy-container").next().hide();
                }
            }
        });
    },
    /**
     * 获取首页推荐概念
     */
    getIndexSection: function () {
        $.ajax({
            url: "ajax/ajax_query_section.php",
            dataType: "json",
            type: "post",
            beforeSend: function () {
            },
            success: function (result) {
                if (result && result.status === 1) {
                    if (result.section.length > 0) {
                        var split_len = 3;//分割数量大小
                        if (result != null && result.section != null) {
                            var sectionHtml = '<div class="container">';
                            var table_len = result.section.length / split_len;
                            if (result.section.length % split_len > 0) {
                                table_len += 1;
                            }
                            for (var i = 0; i < table_len; i++) {
                                var pageStart = (i * split_len);
                                var pageEnd = i == 0 ? split_len : ((i + 1) * split_len)
                                if (pageStart > result.section.length) break;
                                sectionHtml += ' <div class="col-md-6 ' + (i >= 2 ? "hide" : "") + '"><table class="table table-hover"><tbody>';
                                for (var j = pageStart; j < pageEnd; j++) {
                                    if (!result.section[j]) break;
                                    sectionHtml += '<tr><td><img src="imgs/icon.png"></td><td>' + result.section[j].gn_name + '</td><td><i class="fa fa-plus"></i></td></tr>';
                                }
                                sectionHtml += '</tbody></table></div>';
                            }
                            if (result.section.length > 6) {
                                $("#rec-gn-all").show();
                            }
                            $('#gn-container').html(sectionHtml);
                            jindowin.sectionFollowInfo();
                        }
                    }
                } else {
                    $("#gn-container").next().hide();
                }
            }
        });
    },

    /**
     * 股票订阅/取消订阅
     * 注:此代码可以和行业、概念重构为一套代码，目前由于数据量大，循环时大量执行循环查找操作，性能不高，暂时舍弃
     */
    stockFollowInfo: function () {
        $("#gp-container table i").each(function () {
            $(this).click(function () {
                if ($(this).hasClass("fa-check")) {
                    $(this).removeClass("fa-check").addClass("fa-plus").css("color", "lightgray");
                    $(this).parent().parent().css("background-color", "#ffffff");
                    return;
                } else {
                    $(this).removeClass("fa-plus").addClass("fa-check").css("color", "gray");
                    $(this).parent().parent().css("background-color", "#f5f5f5");
                    return;
                }
            })
        });
    },
    /**
     * 行业订阅/取消订阅
     * 注:此代码可以和股票、概念重构为一套代码，目前由于数据量大，循环时大量执行循环查找操作，性能不高，暂时舍弃
     */
    industryFollowInfo: function () {
        $("#hy-container table i").each(function () {
            $(this).click(function () {
                if ($(this).hasClass("fa-check")) {
                    $(this).removeClass("fa-check").addClass("fa-plus").css("color", "lightgray");
                    $(this).parent().parent().css("background-color", "#ffffff");
                    return;
                } else {
                    $(this).removeClass("fa-plus").addClass("fa-check").css("color", "gray");
                    $(this).parent().parent().css("background-color", "#f5f5f5");
                    return;
                }
            })
        });
    },
    /**
     * 概念订阅/取消订阅
     * 注:此代码可以和股票、行业重构为一套代码，目前由于数据量大，循环时大量执行循环查找操作，性能不高，暂时舍弃
     */
    sectionFollowInfo: function () {
        $("#gn-container table i").each(function () {
            $(this).click(function () {
                if ($(this).hasClass("fa-check")) {
                    $(this).removeClass("fa-check").addClass("fa-plus").css("color", "lightgray");
                    $(this).parent().parent().css("background-color", "#ffffff");
                    return;
                } else {
                    $(this).removeClass("fa-plus").addClass("fa-check").css("color", "gray");
                    $(this).parent().parent().css("background-color", "#f5f5f5");
                    return;
                }
            })
        });
    },
    /**
     * 用户登录
     */
    userLogin: function () {
        $.ajax({
            url: "ajax/ajax_user_login.php",
            dataType: "json",
            type: "post",
            data: {},
            beforeSend: function () {
            },
            success: function (result) {

            }
        })
    },
    /**
     * 用户注册
     */
    userRegister: function () {
        $.ajax({
            url: "ajax/ajax_user_register.php",
            dataType: "json",
            type: "post",
            data: {},
            beforeSend: function () {
            },
            success: function (result) {

            }
        })
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
 * 我的快讯-查看所有
 */
$("#showMyAll").bind("click", function () {
    jindowin.showorhide($(this));
});

/**
 * 快讯推荐-股票-查看所有
 */
$("#rec-gp-all").bind("click", function () {
    jindowin.showorhide($(this));
});

/**
 * 快讯行业-股票-查看所有
 */
$("#rec-hy-all").bind("click", function () {
    jindowin.showorhide($(this));
});

/**
 * 快讯概念-股票-查看所有
 */
$("#rec-gn-all").bind("click", function () {
    jindowin.showorhide($(this));
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
    var wechatTop = jindowin.docHeight / 2 - 110;
    $("#wechat-dialog").css("top", wechatTop + "px")
    $("#wechat-dialog").modal();
});

/**
 * 我的快讯-删除
 */
$("#myNewsHead>tbody>tr>td>.fa-times").each(function () {
    $(this).click(function () {
        var deltrElement = $(this).parent().parent();
        var delId = deltrElement.attr("id");

        $("#" + delId).fadeOut("normal", function () {
            deltrElement.parent().find("tr").eq(5).removeClass("hide");
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
        var delId = $(this).parent().parent().attr("id");
        $("#complete-dialog").modal();
    })
});


/**
 * 显示选项按钮事件
 */
$(".show-my-setting").bind("click", function () {
    $("#complete-dialog").modal();
});

/**
 * 标题内-订阅
 */
$(".info-subscription").bind("click", function () {
    if ($(this).html() === "订阅") {
        $(this).html("已订阅");
    } else {
        $(this).html("订阅");
    }
});

$(".list-news-bottom>.col-sm-6.text-right>label>i").each(function (i) {
    $(this).click(function () {
        switch (i) {
            case 0:
                alert("1");
                break;
            case 1:
                alert("2");
                break;
            case 2:
                alert("3");
                break;
        }
    })
})

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
        "股票": {url: ["ajax/ajax_search.php?message={{query}},", "stock"]},
        "行业": {url: ["ajax/ajax_search.php?message={{query}},", "hy"]},
        "概念": {url: ["ajax/ajax_search.php?message={{query}},", "gn"]},
        "热点事件": {url: ["ajax/ajax_search.php?message={{query}},", "rd"]}
    },
    callback: {
        onClickAfter: function (node, a, item, event) {
            if (item.display !== "") {
                jindowin.toggleIndexInfo(false);
                jindowin.searchResultShow(item.display, item.group);
                console.log("你选择了\"" + item.group + "\"下的\"" + item.display + "\"");
            }
        },
        onSubmit: function (node, a, item, event) {
            if (item.display !== "") {
                jindowin.toggleIndexInfo(false);
                jindowin.searchResultShow(item.display, item.group);
                console.log("你选择了\"" + item.group + "\"下的\"" + item.display + "\"");
            }
        }
    },
    debug: true
});


$(function () {
    /**
     *标题内-分享
     */
    $('#testtest').popover({
        html: true,
        placement: "top",
        content: " <div class='allshare'><i class=\"icon iconfont\">&#xe686;</i><i class=\"icon iconfont\">&#xe606;</i><i class=\"icon iconfont\">&#xe65c;</i></div>",
        trigger: "focus"
    })
})
