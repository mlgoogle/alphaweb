/**
 * 用户订阅设置
 * @type {{startTime: number, endTime: number, timeinval: number}}
 */
var userSubSetting = {
    /**
     * 接收订阅开始时间
     */
    startTime: 540,
    /**
     *接收订阅结束时间
     */
    endTime: 540,
    /**
     * 接收订阅频次
     */
    timeinval: 60
};
/**
 * 根据股票代码获取新浪股票数据
 * @type {{getSinaStockData: sinaData.getSinaStockData}}
 */
var sinaData = {
    getSinaStockData: function (stockcode, backFn) {
        var code;
        var codetype;
        var sub = stockcode.substr(0, 1);
        if (sub === "5" || sub == "6") {
            codetype = "SH";
            code = "sh" + stockcode;
        } else if (sub === "0") {
            codetype = "SZ";
            code = "sz" + stockcode;
        }
        $.ajax({
            dataType: 'script',
            url: 'http://hq.sinajs.cn/list=' + code,
            cache: true,
            success: function () {
                var valuename = "hq_str_" + code
                var result = eval(valuename);
                if (result.length > 0) {
                    var socketInfo = result.split(',');
                    var stockDetail = {
                        stockname: socketInfo[0], //股票名
                        codetype: codetype, //类型 SH SZ
                        stockcode: stockcode, //股票代码
                        todayopen: socketInfo[1], //今开
                        yesterdayclose: socketInfo[2], //昨收
                        currentmoney: socketInfo[3],//当前价格
                        todayhighest: socketInfo[4], //今日最高
                        todaylowest: socketInfo[5], //今日最低
                        dealcount: socketInfo[8], // 成交数量
                        dealmoney: socketInfo[9] //成交金额
                    };
                    backFn && backFn(stockDetail);
                }
            }
        });
    }
};
/**
 * 新闻分享
 * @type {{weiboShare: newsShare.weiboShare, tencentWeiBoShare: newsShare.tencentWeiBoShare, qzoneShare: newsShare.qzoneShare}}
 */
var newsShare = {
    weiboShare: function (shareOption) {
        var defaults = {
            wb_url: '',
            wb_appkey: '',
            wb_title: '',
            wb_ralateUid: '',
            wb_pic: '',
            wb_language: 'zh_cn'
        };
        var shareOption = $.extend(defaults, shareOption);
        var openurl = "http://service.weibo.com/share/share.php?url=" + shareOption.wb_url + "&appkey=" + shareOption.wb_appkey + "&title=" + shareOption.wb_title + "&pic=" + shareOption.wb_pic + "&ralateUid=" + shareOption.wb_ralateUid + "&language=" + shareOption.wb_language + "";
        window.open(openurl, "", "height=650,width=450");
    },
    tencentWeiBoShare: function (shareOption) {
        var defaults = {
            wb_url: '',
            wb_appkey: '',
            wb_title: '',
            wb_pic: '',
            wb_site: ''
        };
        var shareOption = $.extend(defaults, shareOption);
        var openurl = 'http://v.t.qq.com/share/share.php?title=' + shareOption.wb_title + '&url=' + shareOption.wb_url + '&appkey=' + shareOption.wb_appkey + '&site=' + shareOption.wb_site + '&pic=' + shareOption.wb_pic + '';
        window.open(openurl, "", "height=650,width=450");
    },
    qzoneShare: function (shareOption) {
        var defaults = {
            url: '',
            showcount: '0',
            desc: '',
            summary: '',
            title: '',
            site: '',
            pics: '',
            style: '201',
            width: '39',
            height: '39'
        };
        var shareOption = $.extend(defaults, shareOption);
        var s = [];
        for (var i in shareOption) {
            if (shareOption.hasOwnProperty(i)) {
                s.push(i + "=" + encodeURIComponent(shareOption[i] || ""));
            }
        }
        var iTop = (window.screen.availHeight - 30 - 530) / 2;
        var iLeft = (window.screen.availWidth - 10 - 715) / 2;
        var openurl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&');
        window.open(openurl, "", "height=530,width=715,top=" + iTop + ",left=" + iLeft);
    }
};
/**
 * 列表头部颜色
 * @type {string[]}
 */
// var colorData = ["#CCFF99", "#99CCFF", "#99CCCC","#CCFF99","#CCFFCC","#66CCCC","#CCCCFF","#99CCCC","#CCFFCC","#99CCCC","#FFFFCC","#CCFFFF","#CCCCFF","#CCFFFF","#99CCFF","#66CCFF","#6699CC","#99CCFF","#CCCCFF","#99CCFF"];
var colorData = ["#6699CC"];
/**
 *
 * @type {{
 * tempid: number,
 * docHeight: number,
 * docWidth: number,
 * initSelectTimes: jindowin.initSelectTimes,
 * receiveTimeChange: jindowin.receiveTimeChange,
 * summaryChange: jindowin.summaryChange,
 * receiveTimesSelectChange: jindowin.receiveTimesSelectChange,
 * settings: jindowin.settings,
 * getMyNewsCount: jindowin.getMyNewsCount,
 * toggleIndexInfo: jindowin.toggleIndexInfo,
 * showorhide: jindowin.showorhide,
 * searchResultShow: jindowin.searchResultShow,
 * buildStockInfo: jindowin.buildStockInfo,
 * buildIndustryInfo: jindowin.buildIndustryInfo,
 * buildConceptInfo: jindowin.buildConceptInfo,
 * buildHoteventInfo: jindowin.buildHoteventInfo,
 * getIndexStock: jindowin.getIndexStock,
 * getIndexStockDetail: jindowin.getIndexStockDetail,
 * getIndexIndustry: jindowin.getIndexIndustry,
 * getIndexIndustryDetail: jindowin.getIndexIndustryDetail,
 * getIndexSection: jindowin.getIndexSection,
 * stockFollowInfo: jindowin.stockFollowInfo,
 * industryFollowInfo: jindowin.industryFollowInfo,
 * sectionFollowInfo: jindowin.sectionFollowInfo,
 * userLogin: jindowin.userLogin,
 * userRegister: jindowin.userRegister,
 * showLoading: jindowin.showLoading,
 * addSubscribe: jindowin.addSubscribe,
 * delSubscribe: jindowin.delSubscribe,
 * querySubscribe: jindowin.querySubscribe,
 * checkOrNot: jindowin.checkOrNot,
 * bindSubscribeDel: jindowin.bindSubscribeDel
 * }}
 */
var jindowin = {
    /**
     * 订阅ID/文字 临时变量
     */
    tempid: 0,
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
        $("#startTime").dropdown({"autoinit": ".select"});
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
        var stime = parseInt($("#startTime").val()) * 60;
        var etime = parseInt($("#endTime").val()) * 60;
        if (stime > etime) {
            $.globalMessenger().post({message: '开始时间不能大于结束时间', type: 'error', showCloseButton: true, hideAfter: 2});
            return;
        }
        var timeinval = parseInt($("#receiveTimes").val());
        var setType = $("#setting-storage").attr("data-set-type");
        var setValue = $("#setting-storage").attr("data-set-val");
        if (setType === "all" && setValue === "") {
            userSubSetting.startTime = stime;
            userSubSetting.endTime = etime;
            userSubSetting.timeinval = timeinval;
        } else {
            jindowin.addSubscribe(stime, etime, timeinval, setType === "stock" ? setValue : "", setType === "industry" ? setValue : "", setType === "section" ? setValue : "", null, function (settingResult) {
                if (settingResult.status === 1) {
                    $.globalMessenger().post({
                        message: '接收订阅设置成功',
                        type: 'success',
                        showCloseButton: true,
                        hideAfter: 2
                    });
                } else {
                    $.globalMessenger().post({message: '接收订阅设置异常', type: 'error', showCloseButton: true, hideAfter: 2});
                }
            });
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
        }
        if (myNews.length > 0) {
            $(".bs-docs-section.mynews").show();
        }
        if (myNews.length <= 5) {
            $("#myNewsCount").html("我的快讯(" + myNews.length + ")");
            $(".show-all-news").addClass("hide");
        }
        if (myNews.length > 5) {
            $("#myNewsCount").html("我的快讯(" + myNews.length + ")");
            if (!$("#showMyAll i").hasClass("fa-angle-up")) {
                $("#myNewsHead").find("tr:gt(4)").addClass("hide");
            }
            $(".show-all-news").removeClass("hide");
        }
    },

    /**
     * 首页信息展示切换
     * @param show 切换首页展示(true)和信息展示(false)
     */
    toggleIndexInfo: function (show) {
        if (show) {
            $("#setting-storage").attr("data-set-type", "all").attr("data-set-val", "");
            $("#create_mynews").attr("data-user-val", "").attr("data-user-type", "");
            $(".mynews").removeClass("hide");
            $(".recommendnews").removeClass("hide");
            $(".settingnews").addClass("hide");
            $(".newsinfo").addClass("hide");
        } else {
            $(".mynews").addClass("hide");
            $(".recommendnews").addClass("hide");
            $(".settingnews").removeClass("hide");
            $(".newsinfo").removeClass("hide");
            $(".search-clear").show();
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
        $("#search-input").val(name);
        jindowin.toggleIndexInfo(false);
        switch (group) {
            case "股票":
            case "stock":
                this.buildStockInfo(name);
                break;
            case "行业":
            case "industry":
                this.buildIndustryInfo(name);
                break;
            case "概念":
            case "section":
                this.buildConceptInfo(name);
                break;
            case "热点事件":
            case "hotevent":
                this.buildHoteventInfo(name);
                break;
            default:
                $("#showInfos").html('');
                break;
        }
    },

    /**
     * 构建股票信息
     */
    buildStockInfo: function (name) {
        var gpHtml = [];
        $("#show_sub_info").html("我们将为您\"" + $("#top-user-exit span").html() + "\"创建每天" + (userSubSetting.startTime / 60) + ":00的快讯");
        var stockcode = name.substring(name.indexOf("(") + 1, name.indexOf(")"));
        $("#setting-storage").attr("data-set-type", "stock").attr("data-set-val", stockcode);
        $("#create_mynews").attr("data-user-val", name).attr("data-user-type", "stock");
        gpHtml.push("<div class=\"gp-infos\">");
        gpHtml.push("<div class=\"gp-hotstock\">");

        jindowin.getIndexStockHeadInfo(stockcode, function () {
        }, function (resultData) {
            if (resultData.status === 1) {
                gpHtml.push("<div class=\"container\">");
                gpHtml.push("  <div class=\"col-md-3\">");
                gpHtml.push("       <h3 style=\"font-weight: 600;\">" + name + "</h3>");
                gpHtml.push("  </div>");
                gpHtml.push("  <div class=\"col-md-1\">");
                gpHtml.push("     <h3><i class=\"icon iconfont\" id='stock_emotion'>&#xf013b;</i></h3>");
                gpHtml.push("  </div>");
                gpHtml.push("  <div class=\"col-md-4\">");
                gpHtml.push("<h3 class='stock-money'></h3>");
                gpHtml.push("  </div>");
                gpHtml.push("  <div class=\"col-md-2 text-right\">");
                gpHtml.push("    <h5>" + resultData.result.subscribe_num.toNewNumber() + "人订阅</h5>");
                gpHtml.push("  </div>");
                gpHtml.push("  <div class=\"col-md-2 text-right\">");
                gpHtml.push("    <a class=\"btn btn-raised btn-info btn-sm info-share\" style=\"background-color: #0068b7;\">分享</a>");
                gpHtml.push("  </div>");
                gpHtml.push("</div>");

                gpHtml.push("<hr>");
                gpHtml.push("<h3 style=\"padding-bottom: 10px;\">资讯预览</h3>");
                gpHtml.push("<div class=\"container\"><table class=\"table\">");
                gpHtml.push("<tr>");
                gpHtml.push("<td>查看热度:" + resultData.result.follow_percent.toPercent() + "</td>");
                gpHtml.push("<td>搜索热度:" + resultData.result.search_percent.toPercent() + "</td>");
                gpHtml.push("<td>关注热度:" + resultData.result.visit_percent.toPercent() + "</td>");
                gpHtml.push("</tr>");
                gpHtml.push("<tr>");
                gpHtml.push("<td>查看增量:" + resultData.result.follow_add.toPercent() + "</td>");
                gpHtml.push("<td>搜索增量:" + resultData.result.search_add.toPercent() + "</td>");
                gpHtml.push("<td>关注增量:" + resultData.result.visit_add.toPercent() + "</td>");
                gpHtml.push("</tr>");
                gpHtml.push("</table></div>");
            }
        });

        gpHtml.push("</div>");
        gpHtml.push("<div class=\"gp-xw\"></div>");

        gpHtml.push("</div>");
        $("#showInfos").html(gpHtml.join(''));
        jindowin.getIndexStockDetail(stockcode, 0, function () {
            jindowin.showLoading($(".gp-xw"));
        }, function (resultData) {
            if (resultData.status === 1) {
                var html = [];
                var emotionTips = "<div class='stock_emo_tips'>" +
                    "<label class='em_up'><img src='imgs/em_up.png'><span>" + Util.toPercent(resultData.p_rate) + "</span></label>" +
                    "<label class='em_down'><img src='imgs/em_down.png'><span>" + Util.toPercent(resultData.n_rate) + "</span></label>" +
                    "</div>";
                if (resultData.result.length > 0) {
                    for (var i = 0; i < resultData.result.length; i++) {
                        html.push("<div class=\"row\">");
                        html.push("<div class=\"col-md-12\">");
                        html.push("<h4>" + resultData.result[i].type + "</h4>");
                        html.push("<hr style=\"margin-top:0; \">");
                        html.push("</div>");
                        html.push("<div class=\"col-md-12\" id='" + resultData.result[i].id + "'>");
                        html.push("<div class=\"col-md-9\">");
                        html.push("<div class=\"list-news-top\">");
                        html.push("<a href='detail.php?id=" + resultData.result[i].id + "&date=" + resultData.result[i].time + "' target='_blank'><h4>" + resultData.result[i].title + "</h4></a>");
                        html.push("</div>");
                        html.push("<div class=\"list-news-content\">");
                        if (resultData.result[i].detail.length > 0) {
                            html.push("<p>" + (resultData.result[i].detail.length > 120 ? resultData.result[i].detail.substr(0, 100).replace('\n', '') : resultData.result[i].detail).replace('\n', '') + "");
                            html.push("……<a href='detail.php?id=" + resultData.result[i].id + "&date=" + resultData.result[i].time + "' target='_blank'><i class='fa fa-link text-info'></i>详情</a></p>");
                        }
                        html.push("</div>");
                        html.push("<div class=\"list-news-bottom\">");
                        html.push("<div class=\"col-sm-7 text-left\">");
                        html.push("<label>来源：" + resultData.result[i].from + "&nbsp;&nbsp; " + resultData.result[i].time + "</label>");
                        html.push("</div>");
                        html.push("<div class=\"col-sm-5 text-right\">");
                        html.push("<label>");
                        html.push("<i class=\"icon iconfont look-up\" data-set-id=\"" + resultData.result[i].id + "\" data-set-date=\"" + resultData.result[i].time + "\">&#xe61e;</i><span>" + resultData.result[i].up + "</span>");
                        html.push("<i class=\"icon iconfont look-down\" data-set-id=\"" + resultData.result[i].id + "\" data-set-date=\"" + resultData.result[i].time + "\">&#xe61d;</i><span>" + resultData.result[i].down + "</span>");
                        html.push("<i class=\"icon iconfont transmit-news\" data-set-id=\"" + resultData.result[i].id + "\" data-set-date=\"" + resultData.result[i].time + "\">&#xe610;</i><span>" + resultData.result[i].transmit_count + "</span>");
                        html.push("</label></div></div></div>");
                        html.push("<div class=\"col-md-3 text-center list-news-pic\"><img src=\"" + resultData.result[i].imgsrc + "\"></div></div></div></div>");
                    }
                } else {
                    html.push('');
                }
                $(".gp-xw").html(html.join(''));
                sinaData.getSinaStockData(stockcode, function (resultSinaData) {
                    var diff = resultSinaData.currentmoney - resultSinaData.yesterdayclose;
                    var showResult = "";
                    if (diff > 0) {
                        showResult = "¥" + resultSinaData.currentmoney + "<span style='font-size: 12px;padding-left: 15px'>+" + diff.toFixed(2) + "&nbsp;&nbsp;(+" + (diff / resultSinaData.yesterdayclose * 100).toFixed(2) + "%)</span>";
                        $(".stock-money").html(showResult).css({color: "#d32f2f"});
                    } else {
                        showResult = "¥" + resultSinaData.currentmoney + "<span style='font-size: 12px;padding-left: 15px'>" + diff.toFixed(2) + "&nbsp;&nbsp;(" + (diff / resultSinaData.yesterdayclose * 100).toFixed(2) + "%)</span>";
                        $(".stock-money").html(showResult).css({color: "#249587"});
                    }
                });
                $("img").one("error", function () {
                    $(this).attr("src", "imgs/news_default_1.png");
                });
                $("#stock_emotion").bind("mouseenter", function () {
                    jindowin.showTips($(this), {msg: emotionTips, side: 3, time: 1});
                });
                jindowin.bindNewsBottomBtn();
            }
        });
    },

    /**
     * 构建行业信息
     */
    buildIndustryInfo: function (name) {
        var hyHtml = [];
        $("#show_sub_info").html("我们将为您\"" + $("#top-user-exit span").html() + "\"创建每天" + (userSubSetting.startTime / 60) + ":00的快讯");
        $("#setting-storage").attr("data-set-type", "industry").attr("data-set-val", name);
        $("#create_mynews").attr("data-user-val", name).attr("data-user-type", "industry");
        hyHtml.push("<div class=\"hy-infos\">");
        hyHtml.push("<div class=\"hy-hotstock\">");

        jindowin.getIndexIndustryHeadInfo(name, function () {
        }, function (resultData) {
            if (resultData.status === 1) {
                hyHtml.push("<div class=\"container\">");
                hyHtml.push("  <div class=\"col-md-2\">");
                hyHtml.push("       <h3 style=\"font-weight: 600;\">" + name + "</h3>");
                hyHtml.push("  </div>");
                hyHtml.push("  <div class=\"col-md-1\">");
                hyHtml.push("     <h3><i class=\"icon iconfont\" id='industry_emotion'>&#xf013b;</i></h3>");
                hyHtml.push("  </div>");
                hyHtml.push("  <div class=\"col-md-5\">");
                hyHtml.push("    <h3></h3>");
                hyHtml.push("  </div>");
                hyHtml.push("  <div class=\"col-md-2 text-right\">");
                hyHtml.push("    <h5>" + resultData.result.subscribe_num.toNewNumber() + "人订阅</h5>");
                hyHtml.push("  </div>");
                hyHtml.push("  <div class=\"col-md-2 text-right\">");
                hyHtml.push("    <a class=\"btn btn-raised btn-info btn-sm info-share\" style=\"background-color: #0068b7;\">分享</a>");
                hyHtml.push("  </div>");
                hyHtml.push("</div>");
                hyHtml.push("<hr>");
                //<editor-fold desc="热门股票">
                hyHtml.push("<h3 style=\"padding-bottom: 10px;\">资讯预览</h3>");
                hyHtml.push("                                <h4>金融热门股票</h4>");
                hyHtml.push("                                <div class=\"container hot-stock\">");
                for (var i = 0; i < resultData.result.stock.length; i++) {
                    hyHtml.push("<div class=\"col-md-4\">");
                    hyHtml.push("<div class=\"panel panel-default\">");
                    hyHtml.push("<div class=\"panel-heading\">" + resultData.result.stock[i].name + "(" + resultData.result.stock[i].code + ")</div>");
                    hyHtml.push("<div class=\"panel-body\">");
                    hyHtml.push("<table class=\"table text-left\">");
                    hyHtml.push("<tr>");
                    hyHtml.push("<td>查看：" + resultData.result.stock[i].visit_percent.toPercent() + "</td>");
                    hyHtml.push("<td>查看增量：" + resultData.result.stock[i].visit_add.toPercent() + "</td>");
                    hyHtml.push("</tr>");
                    hyHtml.push("<tr>");
                    hyHtml.push("<td>搜索：" + resultData.result.stock[i].search_percent.toPercent() + "</td>");
                    hyHtml.push("<td>搜索增量：" + resultData.result.stock[i].search_add.toPercent() + "</td>");
                    hyHtml.push("</tr>");
                    hyHtml.push("<tr>");
                    hyHtml.push("<td>关注：" + resultData.result.stock[i].follow_percent.toPercent() + "</td>");
                    hyHtml.push("<td>关注增量：" + resultData.result.stock[i].follow_add.toPercent() + "</td>");
                    hyHtml.push("</tr>");
                    hyHtml.push("</table>");
                    hyHtml.push("</div></div></div>");
                }
                hyHtml.push("</div>");
                //</editor-fold>
            }
        });

        hyHtml.push("</div>");
        hyHtml.push("<div class=\"hy-xw\"></div>");
        hyHtml.push("</div>");
        $("#showInfos").html(hyHtml.join(''));

        jindowin.getIndexIndustryDetail(name, 0, function () {
            jindowin.showLoading($(".hy-xw"));
        }, function (resultData) {
            if (resultData.status === 1) {
                var html = [];
                var emotionTips = "<div class='stock_emo_tips'>" +
                    "<label class='em_up'><img src='imgs/em_up.png'><span>" + Util.toPercent(resultData.p_rate) + "</span></label>" +
                    "<label class='em_down'><img src='imgs/em_down.png'><span>" + Util.toPercent(resultData.n_rate) + "</span></label>" +
                    "</div>";
                if (resultData.result.length > 0) {
                    for (var i = 0; i < resultData.result.length; i++) {
                        html.push("<div class=\"row\">");
                        html.push("<div class=\"col-md-12\">");
                        html.push("<h4>" + resultData.result[i].type + "</h4>");
                        html.push("<hr style=\"margin-top:0; \">");
                        html.push("</div>");
                        html.push("<div class=\"col-md-12\" id='" + resultData.result[i].id + "'>");
                        html.push("<div class=\"col-md-9\">");
                        html.push("<div class=\"list-news-top\">");
                        html.push("<a href='detail.php?id=" + resultData.result[i].id + "&date=" + resultData.result[i].time + "' target='_blank'><h4>" + resultData.result[i].title + "</h4></a>");
                        html.push("</div>");
                        html.push("<div class=\"list-news-content\">");
                        if (resultData.result[i].detail.length > 0) {
                            html.push("<p>" + (resultData.result[i].detail.length > 120 ? resultData.result[i].detail.substr(0, 100).replace('\n', '') : resultData.result[i].detail).replace('\n', '') + "");
                            html.push("……<a href='detail.php?id=" + resultData.result[i].id + "&date=" + resultData.result[i].time + "' target='_blank'><i class='fa fa-link text-info'></i>详情</a></p>");
                        }
                        html.push("</div>");
                        html.push("<div class=\"list-news-bottom\">");
                        html.push("<div class=\"col-md-7 text-left\">");
                        html.push("<label>来源：" + resultData.result[i].from + "&nbsp;&nbsp; " + resultData.result[i].time + "</label>");
                        html.push("</div>");
                        html.push("<div class=\"col-md-5 text-right\">");
                        html.push("<label>");
                        html.push("<i class=\"icon iconfont look-up\" data-set-id=\"" + resultData.result[i].id + "\" data-set-date=\"" + resultData.result[i].time + "\">&#xe61e;</i><span>" + resultData.result[i].up + "</span>");
                        html.push("<i class=\"icon iconfont look-down\" data-set-id=\"" + resultData.result[i].id + "\" data-set-date=\"" + resultData.result[i].time + "\">&#xe61d;</i><span>" + resultData.result[i].down + "</span>");
                        html.push("<i class=\"icon iconfont transmit-news\" data-set-id=\"" + resultData.result[i].id + "\" data-set-date=\"" + resultData.result[i].time + "\">&#xe610;</i><span>" + resultData.result[i].transmit_count + "</span>");
                        html.push("</label>");
                        html.push("</div>");
                        html.push("</div>");
                        html.push("</div>");
                        html.push("<div class=\"col-md-3 text-center list-news-pic\">");
                        html.push("<img src=\"" + resultData.result[i].imgsrc + "\">");
                        html.push("</div>");
                        html.push("</div>");
                        html.push("</div>");
                    }
                }
                else {
                    html.push('');
                }
                $(".hy-xw").html(html.join(''));
                $("img").one("error", function () {
                    $(this).attr("src", "imgs/news_default_2.png");
                });
                $("#industry_emotion").bind("mouseenter", function () {
                    jindowin.showTips($(this), {msg: emotionTips, side: 2, time: 1});
                });
                jindowin.bindNewsBottomBtn();
            }
        });
    },

    /**
     * 构建概念信息
     */
    buildConceptInfo: function (name) {
        var gnHtml = [];
        $("#show_sub_info").html("我们将为您\"" + $("#top-user-exit span").html() + "\"创建每天<span id='c_stime'>" + (userSubSetting.startTime / 60) + ":00</span>的快讯");
        $("#setting-storage").attr("data-set-type", "section").attr("data-set-val", name);
        $("#create_mynews").attr("data-user-val", name).attr("data-user-type", "section");
        gnHtml.push("<div class=\"gn-infos\">");
        gnHtml.push("<div class=\"gn-hotstock\">");

        jindowin.getIndexSectionHeadInfo(name, null, function (resultData) {
            if (resultData.status === 1) {
                gnHtml.push("<div class=\"container\">");
                gnHtml.push("  <div class=\"col-md-2\">");
                gnHtml.push("       <h3 style=\"font-weight: 600;\">" + name + "</h3>");
                gnHtml.push("  </div>");
                gnHtml.push("  <div class=\"col-md-1\">");
                gnHtml.push("     <h3><i class=\"icon iconfont\" id='section_emotion'>&#xf013b;</i></h3>");
                gnHtml.push("  </div>");
                gnHtml.push("  <div class=\"col-md-5\">");
                gnHtml.push("    <h3></h3>");
                gnHtml.push("  </div>");
                gnHtml.push("  <div class=\"col-md-2 text-right\">");
                gnHtml.push("    <h5>" + resultData.result.subscribe_num.toNewNumber() + "人订阅</h5>");
                gnHtml.push("  </div>");
                gnHtml.push("  <div class=\"col-md-2 text-right\">");
                gnHtml.push("    <a class=\"btn btn-raised btn-info btn-sm info-share\" style=\"background-color: #0068b7;\">分享</a>");
                gnHtml.push("  </div>");
                gnHtml.push("</div>");
                gnHtml.push("<hr>");
                //<editor-fold desc="热门股票">
                gnHtml.push("<h3 style=\"padding-bottom: 10px;\">资讯预览</h3>");
                gnHtml.push("<h4>金融热门股票</h4>");
                gnHtml.push("<div class=\"container hot-stock\">");
                for (var i = 0; i < resultData.result.stock.length; i++) {
                    gnHtml.push("<div class=\"col-lg-4\">");
                    gnHtml.push("<div class=\"panel panel-default\">");
                    gnHtml.push("<div class=\"panel-heading\">" + resultData.result.stock[i].name + "(" + resultData.result.stock[i].code + ")</div>");
                    gnHtml.push("<div class=\"panel-body\">");
                    gnHtml.push("<table class=\"table text-left\">");
                    gnHtml.push("<tr>");
                    gnHtml.push("<td>查看：" + resultData.result.stock[i].visit_percent.toPercent() + "</td>");
                    gnHtml.push("<td>查看增量：" + resultData.result.stock[i].visit_add.toPercent() + "</td>");
                    gnHtml.push("</tr>");
                    gnHtml.push("<tr>");
                    gnHtml.push("<td>搜索：" + resultData.result.stock[i].search_percent.toPercent() + "</td>");
                    gnHtml.push("<td>搜索增量：" + resultData.result.stock[i].search_add.toPercent() + "</td>");
                    gnHtml.push("</tr>");
                    gnHtml.push("<tr>");
                    gnHtml.push("<td>关注：" + resultData.result.stock[i].follow_percent.toPercent() + "</td>");
                    gnHtml.push("<td>关注增量：" + resultData.result.stock[i].follow_add.toPercent() + "</td>");
                    gnHtml.push("</tr>");
                    gnHtml.push("</table></div></div></div>");
                }
                gnHtml.push("</div>");
                //</editor-fold>
            }
        });

        gnHtml.push("</div>");
        gnHtml.push("<div class=\"hy-xw\"></div>");
        gnHtml.push("</div>");
        $("#showInfos").html(gnHtml.join(''));

        jindowin.getIndexSectionDetail(name, 0, function () {
            jindowin.showLoading($(".hy-xw"));
        }, function (resultData) {
            if (resultData.status === 1) {
                var html = [];
                var emotionTips = "<div class='stock_emo_tips'>" +
                    "<label class='em_up'><img src='imgs/em_up.png'><span>" + Util.toPercent(resultData.p_rate) + "</span></label>" +
                    "<label class='em_down'><img src='imgs/em_down.png'><span>" + Util.toPercent(resultData.n_rate) + "</span></label>" +
                    "</div>";
                if (resultData.result.length > 0) {
                    for (var i = 0; i < resultData.result.length; i++) {
                        html.push("<div class=\"row\">");
                        html.push("<div class=\"col-md-12\">");
                        html.push("<h4>" + resultData.result[i].type + "</h4>");
                        html.push("<hr style=\"margin-top:0; \">");
                        html.push("</div>");
                        html.push("<div class=\"col-md-12\" id='" + resultData.result[i].id + "'>");
                        html.push("<div class=\"col-md-9\">");
                        html.push("<div class=\"list-news-top\">");
                        html.push("<a href='detail.php?id=" + resultData.result[i].id + "&date=" + resultData.result[i].time + "' target='_blank'><h4>" + resultData.result[i].title + "</h4></a>");
                        html.push("</div>");
                        html.push("<div class=\"list-news-content\">");
                        if (resultData.result[i].detail.length > 0) {
                            html.push("<p>" + (resultData.result[i].detail.length > 120 ? resultData.result[i].detail.substr(0, 100).replace('\n', '') : resultData.result[i].detail).replace('\n', '') + "");
                            html.push("……<a href='detail.php?id=" + resultData.result[i].id + "&date=" + resultData.result[i].time + "' target='_blank'><i class='fa fa-link text-info'></i>详情</a></p>");
                        }
                        html.push("</div>");
                        html.push("<div class=\"list-news-bottom\">");
                        html.push("<div class=\"col-md-7 text-left\">");
                        html.push("<label>来源：" + resultData.result[i].from + "&nbsp;&nbsp; " + resultData.result[i].time + "</label>");
                        html.push("</div>");
                        html.push("<div class=\"col-md-5 text-right\">");
                        html.push("<label>");
                        html.push("<i class=\"icon iconfont look-up\" data-set-id=\"" + resultData.result[i].id + "\" data-set-date=\"" + resultData.result[i].time + "\">&#xe61e;</i><span>" + resultData.result[i].up + "</span>");
                        html.push("<i class=\"icon iconfont look-down\" data-set-id=\"" + resultData.result[i].id + "\" data-set-date=\"" + resultData.result[i].time + "\">&#xe61d;</i><span>" + resultData.result[i].down + "</span>");
                        html.push("<i class=\"icon iconfont transmit-news\" data-set-id=\"" + resultData.result[i].id + "\" data-set-date=\"" + resultData.result[i].time + "\">&#xe610;</i><span>" + resultData.result[i].transmit_count + "</span>");
                        html.push("</label>");
                        html.push("</div>");
                        html.push("</div>");
                        html.push("</div>");
                        html.push("<div class=\"col-md-3 text-center list-news-pic\">");
                        html.push("<img src=\"" + resultData.result[i].imgsrc + "\">");
                        html.push("</div>");
                        html.push("</div>");
                        html.push("</div>");
                    }
                }
                else {
                    html.push('');
                }
                $(".hy-xw").html(html.join(''));
                $("img").one("error", function () {
                    $(this).attr("src", "imgs/news_default_2.png");
                });
                $("#section_emotion").bind("mouseenter", function () {
                    jindowin.showTips($(this), {msg: emotionTips, side: 2, time: 1});
                });
                jindowin.bindNewsBottomBtn();
            }
        });
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
                jindowin.showLoading($('#gp-container'));
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
                                var pageEnd = i == 0 ? split_len : ((i + 1) * split_len);
                                if (pageStart > result.stock.length) break;
                                stockHtml += ' <div class="col-md-6 ' + (i >= 2 ? "hide" : "") + '"><table class="table table-hover"><tbody>';
                                for (var j = pageStart; j < pageEnd; j++) {
                                    if (!result.stock[j]) break;
                                    var colorI = Math.floor((Math.random() * colorData.length));
                                    stockHtml += "<tr id='" + result.stock[j].stock_code + "'>";
                                    stockHtml += "<td><label class='list-head-text' style='background-color: " + colorData[colorI] + "'>" + (result.stock[j].stock_name).substring(result.stock[j].stock_name.length - 2) + "</label></td>";
                                    stockHtml += "<td onclick=\"jindowin.searchResultShow('" + result.stock[j].stock_name + "(" + result.stock[j].stock_code + ")','stock')\"><span>" + result.stock[j].stock_name + "(" + result.stock[j].stock_code + ")</span></td>";
                                    stockHtml += "<td><i class='fa fa-plus' data-user-val='" + result.stock[j].stock_code + "' data-user-type='stock'></i></td>";
                                    stockHtml += "</tr>";
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
     * 股票-资讯预览
     * @param stockcode
     * @param beforeFn
     * @param backFn
     */
    getIndexStockHeadInfo: function (stockcode, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_stock_headinfo.php",
            dataType: "json",
            type: "post",
            async: false,
            data: {stockcode: stockcode},
            beforeSend: function () {
                beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
            }
        });
    },

    /**
     * 获取股票详细信息
     * @param name
     * @param beforeFn
     * @param backFn
     */
    getIndexStockDetail: function (name, page, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_news.php",
            dataType: "json",
            type: "post",
            data: {stock_code: name, news_type: 1, page: page},
            beforeSend: function () {
                beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
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
                jindowin.showLoading($('#hy-container'));
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
                                    var colorI = Math.floor((Math.random() * colorData.length));
                                    industryHtml += "<tr id='" + result.industry[j].hy_name + "'>";
                                    industryHtml += "<td><label class='list-head-text' style='background-color: " + colorData[colorI] + "'>" + (result.industry[j].hy_name).substring(result.industry[j].hy_name.length - 2) + "</label></td>";
                                    industryHtml += "<td onclick=\"jindowin.searchResultShow('" + result.industry[j].hy_name + "','industry')\"><span>" + result.industry[j].hy_name + "</span></td>";
                                    industryHtml += "<td><i class='fa fa-plus' data-user-val='" + result.industry[j].hy_name + "' data-user-type='industry'></i></td>";
                                    industryHtml += "</tr>";
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
     * 行业-热门股票
     * @param hyname
     * @param beforeFn
     * @param backFn
     */
    getIndexIndustryHeadInfo: function (name, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_industry_headinfo.php",
            dataType: "json",
            type: "post",
            async: false,
            data: {hyname: name},
            beforeSend: function () {
                beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
            }
        });
    },

    /**
     * 获取行业详细信息
     * @param name 行业名
     * @param page 页数
     * @param beforeFn 请求前执行函数
     * @param backFn   请求完成执行函数
     */
    getIndexIndustryDetail: function (name, page, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_news.php",
            dataType: "json",
            type: "post",
            data: {hy_name: name, news_type: 2, page: page},
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
            }
        });
    },
    /**
     * 概念-热门股票
     * @param name
     * @param page
     * @param beforeFn
     * @param backFn
     */
    getIndexSectionHeadInfo: function (name, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_industry_headinfo.php",
            dataType: "json",
            type: "post",
            async: false,
            data: {gnname: name},
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
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
                jindowin.showLoading($('#gn-container'));
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
                                    var colorI = Math.floor((Math.random() * colorData.length));
                                    sectionHtml += "<tr id='" + result.section[j].gn_name + "'>";
                                    sectionHtml += "<td><label class='list-head-text' style='background-color: " + colorData[colorI] + "'>" + (result.section[j].gn_name).substring(result.section[j].gn_name.length - 2) + "</label></td>";
                                    sectionHtml += "<td onclick=\"jindowin.searchResultShow('" + result.section[j].gn_name + "','industry')\"><span>" + result.section[j].gn_name + "</span></td>";
                                    sectionHtml += "<td><i class='fa fa-plus' data-user-val='" + result.section[j].gn_name + "' data-user-type='industry'></i></td>";
                                    sectionHtml += "</tr>";
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
     * 获取概念详细信息
     * @param name
     * @param page
     * @param beforeFn
     * @param backFn
     */
    getIndexSectionDetail: function (name, page, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_news.php",
            dataType: "json",
            type: "post",
            data: {section: name, news_type: 3, page: page},
            beforeSend: function () {
                beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
            }
        });
    },

    /**
     * 股票
     * /取消订阅
     * 注:此代码可以和行业、概念重构为一套代码，目前由于数据量大，循环时大量执行循环查找操作，性能不高，暂时舍弃
     */
    stockFollowInfo: function () {
        $("#gp-container table i").each(function () {
            var $this = $(this);
            $($this).click(function () {
                if ($($this).hasClass("fa-check")) {
                    jindowin.delSubscribe($($this).attr("data-user-type"), $($this).attr("data-user-val"), function () {
                        $($this).addClass("fa-spin");
                    }, function (resultData) {
                        $($this).removeClass("fa-spin");
                        if (resultData.status === -1) {
                            $("#login-dialog").css("top", jindowin.docHeight / 2 - 165 + "px").modal();
                        }
                        if (resultData.status === 1) {
                            jindowin.checkOrNot($($this));
                            $("#myNewsHead tbody").find("tr").eq(5).removeClass("hide");
                            $("#myNewsHead").find("i[data-set-val='" + $($this).attr("data-user-val") + "']").parent().parent().remove();
                            jindowin.getMyNewsCount();
                            $.globalMessenger().post({
                                message: '取消订阅【股票】【' + $($this).parent().prev().html() + '】成功',
                                type: 'success',
                                showCloseButton: true,
                                hideAfter: 2
                            });
                        }
                    });
                    return;
                } else {
                    jindowin.addSubscribe(userSubSetting.startTime, userSubSetting.endTime, userSubSetting.timeinval, $($this).attr("data-user-val"), null, null, function () {
                        $($this).addClass("fa-spin");
                    }, function (resultData) {
                        $($this).removeClass("fa-spin");
                        if (resultData.status === -1) {
                            $("#login-dialog").css("top", jindowin.docHeight / 2 - 165 + "px").modal();
                            return;
                        }
                        if (resultData.status === 1) {
                            var html = [];
                            html.push("<tr>");
                            html.push("<td><a>" + $($this).parent().prev().html() + "</a></td>");
                            html.push("<td class=\"text-right\">");
                            html.push("<i class=\"fa fa-pencil\" data-set-type='stock' data-set-val='" + $($this).attr("data-user-val") + "'></i>");
                            html.push("<i class=\"fa fa-times\" data-set-type='stock' data-set-val='" + $($this).attr("data-user-val") + "'></i>");
                            html.push("</td>");
                            html.push("</tr>");
                            if ($("#myNewsHead tbody tr").length === 0) {
                                $("#myNewsHead tbody").html(html.join(''));
                            } else {
                                $("#myNewsHead tbody tr:first-child").before(html.join(''));
                            }
                            $.globalMessenger().post({
                                message: '订阅【股票】【' + $($this).parent().prev().html() + '】成功',
                                type: 'success',
                                showCloseButton: true,
                                hideAfter: 2
                            });
                            jindowin.checkOrNot($($this));
                            jindowin.getMyNewsCount();
                            jindowin.bindSubscribeDel();
                            jindowin.bindSubscribeEdit();
                        }
                    });
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
            var $this = $(this);
            $($this).click(function () {
                if ($($this).hasClass("fa-check")) {
                    jindowin.delSubscribe($($this).attr("data-user-type"), $($this).attr("data-user-val"), function () {
                        $($this).addClass("fa-spin");
                    }, function (resultData) {
                        $($this).removeClass("fa-spin");
                        if (resultData.status === -1) {
                            $("#login-dialog").css("top", jindowin.docHeight / 2 - 165 + "px").modal();
                        }
                        if (resultData.status === 1) {
                            jindowin.checkOrNot($($this));
                            $("#myNewsHead tbody").find("tr").eq(5).removeClass("hide");
                            $("#myNewsHead").find("i[data-set-val='" + $($this).attr("data-user-val") + "']").parent().parent().remove();
                            jindowin.getMyNewsCount();
                            $.globalMessenger().post({
                                message: '取消订阅【行业】【' + $($this).parent().prev().html() + '】成功',
                                type: 'success',
                                showCloseButton: true,
                                hideAfter: 2
                            });
                        }
                    });
                    return;
                } else {
                    jindowin.addSubscribe(userSubSetting.startTime, userSubSetting.endTime, userSubSetting.timeinval, null, $($this).attr("data-user-val"), null, function () {
                        $($this).addClass("fa-spin");
                    }, function (resultData) {
                        $($this).removeClass("fa-spin");
                        if (resultData.status === -1) {
                            $("#login-dialog").css("top", jindowin.docHeight / 2 - 165 + "px").modal();
                            return;
                        }
                        if (resultData.status === 1) {
                            var html = [];
                            html.push("<tr>");
                            html.push("<td><a>" + $($this).parent().prev().html() + "</a></td>");
                            html.push("<td class=\"text-right\">");
                            html.push("<i class=\"fa fa-pencil\" data-set-type='industry' data-set-val='" + $($this).attr("data-user-val") + "'></i>");
                            html.push("<i class=\"fa fa-times\" data-set-type='industry' data-set-val='" + $($this).attr("data-user-val") + "'></i>");
                            html.push("</td>");
                            html.push("</tr>");
                            if ($("#myNewsHead tbody tr").length === 0) {
                                $("#myNewsHead tbody").html(html.join(''));
                            } else {
                                $("#myNewsHead tbody tr:first-child").before(html.join(''));
                            }
                            jindowin.checkOrNot($($this));
                            jindowin.getMyNewsCount();
                            jindowin.bindSubscribeDel();
                            jindowin.bindSubscribeEdit();
                            $.globalMessenger().post({
                                message: '订阅【行业】【' + $($this).parent().prev().html() + '】成功',
                                type: 'success',
                                showCloseButton: true,
                                hideAfter: 2
                            });
                        }
                    });
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
            var $this = $(this);
            $($this).click(function () {
                if ($($this).hasClass("fa-check")) {
                    jindowin.delSubscribe($($this).attr("data-user-type"), $($this).attr("data-user-val"), function () {
                        $($this).addClass("fa-spin");
                    }, function (resultData) {
                        $($this).removeClass("fa-spin");
                        if (resultData.status === -1) {
                            $("#login-dialog").css("top", jindowin.docHeight / 2 - 165 + "px").modal();
                        }
                        if (resultData.status === 1) {
                            jindowin.checkOrNot($($this));
                            $("#myNewsHead tbody").find("tr").eq(5).removeClass("hide");
                            $("#myNewsHead").find("i[data-set-val='" + $($this).attr("data-user-val") + "']").parent().parent().remove();
                            jindowin.getMyNewsCount();
                            $.globalMessenger().post({
                                message: '取消订阅【概念】【' + $($this).parent().prev().html() + '】成功',
                                type: 'success',
                                showCloseButton: true,
                                hideAfter: 2
                            });
                        }
                    });
                    return;
                } else {
                    jindowin.addSubscribe(userSubSetting.startTime, userSubSetting.endTime, userSubSetting.timeinval, null, null, $($this).attr("data-user-val"), function () {
                        $($this).addClass("fa-spin");
                    }, function (resultData) {
                        $($this).removeClass("fa-spin");
                        if (resultData.status === -1) {
                            $("#login-dialog").css("top", jindowin.docHeight / 2 - 165 + "px").modal();
                            return;
                        }
                        if (resultData.status === 1) {
                            var html = [];
                            html.push("<tr>");
                            html.push("<td><a>" + $($this).parent().prev().html() + "</a></td>");
                            html.push("<td class=\"text-right\">");
                            html.push("<i class=\"fa fa-pencil\" data-set-type='section' data-set-val='" + $($this).attr("data-user-val") + "'></i>");
                            html.push("<i class=\"fa fa-times\" data-set-type='section' data-set-val='" + $($this).attr("data-user-val") + "'></i>");
                            html.push("</td>");
                            html.push("</tr>");
                            if ($("#myNewsHead tbody tr").length === 0) {
                                $("#myNewsHead tbody").html(html.join(''));
                            } else {
                                $("#myNewsHead tbody tr:first-child").before(html.join(''));
                            }
                            jindowin.checkOrNot($($this));
                            jindowin.getMyNewsCount();
                            jindowin.bindSubscribeDel();
                            jindowin.bindSubscribeEdit();
                            $.globalMessenger().post({
                                message: '订阅【概念】【' + $($this).parent().prev().html() + '】成功',
                                type: 'success',
                                showCloseButton: true,
                                hideAfter: 2
                            });
                        }
                    });
                    return;
                }
            })
        });
    },

    /**
     * 用户登录
     */
    userLogin: function () {
        var userEmail = $("#login-email").val();
        var userPwd = $("#login-pwd").val();
        var autoLogin = $("#cb-autologin").is(":checked");
        $.ajax({
            url: "ajax/ajax_user_login.php",
            dataType: "json",
            type: "post",
            cache: false,
            data: {user_name: userEmail, password: userPwd, autologin: autoLogin, user_type: 1},
            beforeSend: function () {
            },
            success: function (resultData) {
                if (resultData.status !== 1) {
                    $.globalMessenger().post({
                        message: resultData.result,
                        type: 'error',
                        showCloseButton: true,
                        hideAfter: 3
                    });
                } else {
                    $("#login-dialog").modal("hide");
                    // $("#top-user-name").html(resultData.result.user_name);
                    // $("#top-user-name").attr("id", "top-user-exit");
                    // jindowin.getMyNewsCount();
                    window.location.reload();
                }
            }
        })
    },

    /**
     * 用户注册
     */
    userRegister: function () {
        var userEmail = $("#register-email").val();
        var userPwd1 = $("#register-pwd-1").val();
        var userPwd2 = $("#register-pwd-2").val();
        if (userPwd1 !== userPwd2) {
            $.globalMessenger().post({message: '两次密码不同', type: 'error', showCloseButton: true, hideAfter: 2});
            return;
        }
        $.ajax({
            url: "ajax/ajax_user_register.php",
            dataType: "json",
            type: "post",
            data: {username: userEmail, password1: userPwd1, password2: userPwd2},
            beforeSend: function () {
            },
            success: function (result) {
                if (result.status === 1) {
                    $.globalMessenger().post({
                        message: '系统已为您创建筋斗云快讯的账号，并已将验证电子邮件发送至【"' + userEmail + '"】',
                        type: 'success',
                        showCloseButton: true,
                        hideAfter: 2
                    });
                } else {
                    $.globalMessenger().post({
                        message: result.result,
                        type: 'error',
                        showCloseButton: true,
                        hideAfter: 2
                    });
                }
            }
        })
    },

    /**
     * 显示加载图形
     * @param obj
     */
    showLoading: function (obj) {
        $(obj).html("<div class=\"spinner\"><div class=\"double-bounce1\"></div><div class=\"double-bounce2\"></div></div><style>.spinner{width:30px;height:30px;position:relative;margin:100px auto}.double-bounce1,.double-bounce2{width:100%;height:100%;border-radius:50%;background-color:#005cb7;opacity:0.6;position:absolute;top:0;left:0;-webkit-animation:bounce 2.0s infinite ease-in-out;animation:bounce 2.0s infinite ease-in-out}.double-bounce2{-webkit-animation-delay:-1.0s;animation-delay:-1.0s}@-webkit-keyframes bounce{0%,100%{-webkit-transform:scale(0.0)}50%{-webkit-transform:scale(1.0)}}@keyframes bounce{0%,100%{transform:scale(0.0);-webkit-transform:scale(0.0)}50%{transform:scale(1.0);-webkit-transform:scale(1.0)}}</style>");
    },

    /**
     * 添加用户订阅
     * @param stime     每天订阅开始时间
     * @param etime     每天订阅结束时间
     * @param timeinval 订阅的时间间隔
     * @param stockcode 关注的股票代码
     * @param section   关注的概念信息
     * @param industry  关注的行业信息
     */
    addSubscribe: function (stime, etime, timeinval, stockcode, industry, section, beforeFn, backFn) {
        var submitData = {
            start_time: stime,
            end_time: etime,
            time_inval: timeinval,
            stock_code: stockcode,
            section: section,
            industry: industry
        };
        $.ajax({
            url: "ajax/ajax_add_subscribe.php",
            dataType: "json",
            type: "post",
            cache: false,
            data: submitData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (result) {
                backFn && backFn(result);
            }
        });
    },

    /**
     * 取消用户订阅
     * @param stockcode 关注的股票代码
     * @param section   关注的概念信息
     * @param industry  关注的行业信息
     */
    delSubscribe: function (deltype, delval, beforeFn, backFn) {
        var submitData = {stock_code: "", industry: "", section: ""};
        switch (deltype) {
            case "stock":
                submitData.stock_code = delval;
                break;
            case "industry":
                submitData.industry = delval;
                break;
            case "section":
                submitData.section = delval;
                break;
        }
        $.ajax({
            url: "ajax/ajax_delete_subscribe.php",
            dataType: "json",
            type: "post",
            cache: false,
            data: submitData,
            beforeSend: function () {
                beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
            }
        });
    },

    /**
     * 查询当前登录用户的所有订阅
     */
    querySubscribe: function () {
        $.ajax({
            url: "ajax/ajax_query_subscribe.php",
            dataType: "json",
            type: "post",
            beforeSend: function () {
                jindowin.showLoading($("#myNewsHead"));
            }, success: function (resultData) {
                console.info(resultData);
                var html = [];
                if (resultData.status === 1) {
                    html.push("<tbody>");
                    if (resultData.stock.length > 0) {
                        for (var i = 0; i < resultData.stock.length; i++) {
                            var stockName = resultData.stock[i].stock_name;
                            var stockCode = resultData.stock[i].stock_code;
                            html.push("<tr>");
                            html.push("<td><a onclick=\"jindowin.searchResultShow('" + stockName + "(" + stockCode + ")','stock')\">" + stockName + "(" + stockCode + ")</a></td>");
                            html.push("<td class=\"text-right\">");
                            html.push("<i class=\"fa fa-pencil\" data-set-type='stock' data-set-val='" + stockCode + "'></i>");
                            html.push("<i class=\"fa fa-times\" data-set-type='stock' data-set-val='" + stockCode + "'></i>");
                            html.push("</td>");
                            html.push("</tr>");
                            $("#gp-container").find("i[data-user-val='" + stockCode + "']").removeClass("fa-plus").addClass("fa-check").css("color", "gray").parent().parent().css("background-color", "#f5f5f5");
                        }
                    }
                    if (resultData.industry.length > 0) {
                        for (var i = 0; i < resultData.industry.length; i++) {
                            var industryName = resultData.industry[i].industry_name;
                            html.push("<tr>");
                            html.push("<td><a onclick=\"jindowin.searchResultShow('" + industryName + "','industry')\">" + industryName + "</a></td>");
                            html.push("<td class=\"text-right\">");
                            html.push("<i class=\"fa fa-pencil\" data-set-type='industry' data-set-val='" + industryName + "'></i>");
                            html.push("<i class=\"fa fa-times\" data-set-type='industry' data-set-val='" + industryName + "'></i>");
                            html.push("</td>");
                            html.push("</tr>");
                            $("#hy-container").find("i[data-user-val='" + industryName + "']").removeClass("fa-plus").addClass("fa-check").css("color", "gray").parent().parent().css("background-color", "#f5f5f5");
                        }
                    }
                    if (resultData.section.length > 0) {
                        for (var i = 0; i < resultData.section.length; i++) {
                            var sectionName = resultData.section[i].section_name;
                            html.push("<tr>");
                            html.push("<td><a onclick=\"jindowin.searchResultShow('" + sectionName + "','section')\">" + sectionName + "</a></td>");
                            html.push("<td class=\"text-right\">");
                            html.push("<i class=\"fa fa-pencil\" data-set-type='section' data-set-val='" + sectionName + "'></i>");
                            html.push("<i class=\"fa fa-times\" data-set-type='section' data-set-val='" + sectionName + "'></i>");
                            html.push("</td>");
                            html.push("</tr>");
                            $("#gn-container").find("i[data-user-val='" + sectionName + "']").removeClass("fa-plus").addClass("fa-check").css("color", "gray").parent().parent().css("background-color", "#f5f5f5");
                        }
                    }
                    html.push("</tbody>");
                } else {
                    html.push('');
                }
                $("#myNewsHead").html(html.join(''));

                jindowin.bindSubscribeDel();
                jindowin.bindSubscribeEdit();
                jindowin.getMyNewsCount();
            }
        });
    },

    /**
     * 订阅按钮的订阅与非订阅状态
     * @param $i
     */
    checkOrNot: function ($i) {
        if ($($i).hasClass("fa-check")) {
            $($i).removeClass("fa-check").addClass("fa-plus").css("color", "lightgray");
            $($i).parent().parent().css("background-color", "#ffffff");
            return;
        } else {
            $($i).removeClass("fa-plus").addClass("fa-check").css("color", "gray");
            $($i).parent().parent().css("background-color", "#f5f5f5");
            return;
        }
    },

    /**
     * 绑定我的订阅中的删除事件
     */
    bindSubscribeDel: function () {
        $("#myNewsHead tbody tr td:last-child i[class='fa fa-times']").on("click", function (e) {
            var $this = $(this);
            var dataSetType = $($this).attr("data-set-type");
            var dataSetVal = $($this).attr("data-set-val");
            jindowin.delSubscribe(dataSetType, dataSetVal, function () {
                $($this).addClass("fa-spin");
            }, function (resultData) {
                $($this).removeClass("fa-spin");
                if (resultData.status === -1) {
                    $("#login-dialog").modal({backdrop: 'static', keyboard: false});
                    return;
                }
                if (resultData.status === 1) {
                    $($this).parent().parent().fadeOut("normal", function () {
                        $("#myNewsHead tbody").find("tr").eq(5).removeClass("hide");
                        $(this).remove();
                        jindowin.getMyNewsCount();
                        $.globalMessenger().post({
                            message: '订阅【' + $($this).parent().prev().find("a").html() + '】已删除.',
                            type: 'success',
                            showCloseButton: true,
                            hideAfter: 2
                        });
                    })
                }
            });
            e.stopPropagation();
        })
    },

    /**
     * 绑定我的订阅中的编辑事件
     */
    bindSubscribeEdit: function () {
        $("#myNewsHead tbody tr td:last-child i[class='fa fa-pencil']").on("click", function (e) {
            var $this = $(this);
            var dataSetType = $($this).attr("data-set-type");
            var dataSetVal = $($this).attr("data-set-val");
            $("#setting-storage").attr("data-set-type", dataSetType).attr("data-set-val", dataSetVal);
            $("#complete-dialog").modal("show");
            e.stopPropagation();
        })
    },

    /**
     * 显示Tips
     * @param obj
     * @param option
     */
    showTips: function (obj, option) {
        $(obj).tips({
            msg: option.msg,    //你的提示消息  必填
            side: option.side,  //提示窗显示位置  1，2，3，4 分别代表 上右下左 默认为1（上） 可选
            color: option.color, //提示文字色 默认为白色 可选
            bg: option.bg,//提示窗背景色 默认为白色 可选
            time: option.time,//自动关闭时间 默认2秒 设置0则不自动关闭 可选
            x: option.x,//横向偏移  正数向右偏移 负数向左偏移 默认为0 可选
            y: option.y//纵向偏移  正数向下偏移 负数向上偏移 默认为0 可选
        })
    },

    /**
     * 新闻看涨看跌
     * @param newsid 新闻ID
     * @param date 新闻时间
     * @param types 1-看涨2-看跌
     * @param beforeFn
     * @param backFn
     */
    lookUpAndDown: function (newsid, newsdate, types, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_set_news.php",
            dataType: "json",
            type: "post",
            cache: false,
            data: {news_id: newsid, newsdate: newsdate, commit_type: types},
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
            }
        });
    },
    /**
     * 新闻列表底部看涨\看跌\分享按钮功能
     */
    bindNewsBottomBtn: function () {
        $(".list-news-bottom .text-right .look-up").each(function () {
            var $this = $(this);
            $this.click(function () {
                var newsid = $($this).attr("data-set-id");
                var newstime = $($this).attr("data-set-date");
                jindowin.lookUpAndDown(newsid, newstime, 1, null, function (updownResult) {
                    if (updownResult.status === -1) {
                        $("#login-dialog").modal("show");
                        return;
                    }
                    if (updownResult.status === 1) {
                        $($this).next("span").html(updownResult.result[0].up);
                    }
                });
            });
        });
        $(".list-news-bottom .text-right .look-down").each(function () {
            var $this = $(this);
            $this.click(function () {
                var newsid = $($this).attr("data-set-id");
                var newstime = $($this).attr("data-set-date");
                jindowin.lookUpAndDown(newsid, newstime, 2, null, function (updownResult) {
                    if (updownResult.status === -1) {
                        $("#login-dialog").modal("show");
                        return;
                    }
                    if (updownResult.status === 1) {
                        $($this).next("span").html(updownResult.result[0].up);
                    }
                });
            });
        });
        $(".list-news-bottom .text-right .transmit-news").each(function () {
            var $this = $(this);
            var newsId = $($this).attr("data-set-id");
            var newsDate = $($this).attr("data-set-date");
            var shareUrl = "http://" + location.host + "/detail.php?id=" + newsId + "|" + newsDate;
            var shareTitle = $("#" + newsId).find("h4").html();
            var shareContent = $("#" + newsId).find(".list-news-content>p").html();
            if (shareContent && shareContent !== "") {
                if (shareContent.length >= 120) {
                    shareContent = shareContent.substring(0, 120);
                }
            } else {
                shareContent = shareTitle;
            }
            var shareTips = "<div class='news-share'><i class=\"icon iconfont weibo-share\">&#xe606;</i><i class=\"icon iconfont tweibo-share\">&#xe65c;</i><i class=\"icon iconfont qqzone-share\">&#xe686;</i></div>";
            $($this).click(function () {
                $($this).tips({
                    msg: shareTips,
                    side: 3,
                    time: 1,
                    color: "#999",
                    bg: "rgba(238,238,238,0.5)",
                    y: 8
                });
                $(".weibo-share").bind("click", function (e) {
                    newsShare.weiboShare({wb_url: shareUrl, wb_appkey: "129266167", wb_title: shareTitle});
                    e.stopPropagation();
                });
                $(".tweibo-share").bind("click", function (e) {
                    newsShare.tencentWeiBoShare({
                        wb_url: shareUrl,
                        wb_appkey: '',
                        wb_title: shareTitle,
                        wb_pic: '',
                        wb_site: ''
                    });
                    e.stopPropagation();
                });
                $(".qqzone-share").bind("click", function (e) {
                    newsShare.qzoneShare({
                        url: shareUrl,
                        desc: shareContent,
                        summary: shareContent,
                        title: shareTitle,
                        site: "筋斗云"
                    });
                    e.stopPropagation();
                });
            });
        });
    }
}

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
 * 未登录时创建快讯激活
 */
$("#create_mynews").bind("click", function (e) {
    var $this = $(this);
    if ($("#show_sub_info").length > 0) {
        var stime = userSubSetting.startTime;
        var etime = userSubSetting.endTime;
        var timeinval = userSubSetting.timeinval;
        var dataType = $this.attr("data-user-type");
        var dataValue = $this.attr("data-user-val");

        jindowin.addSubscribe(stime, etime, timeinval, dataType === "stock" ? dataValue.substring(dataValue.indexOf("(") + 1, dataValue.indexOf(")")) : "", dataType === "industry" ? dataValue : "", dataType === "section" ? dataValue : "", null, function (subResult) {
            if (subResult.status === 1) {
                var html = [];
                html.push("<tr>");
                html.push("<td><a onclick=\"jindowin.searchResultShow('" + dataValue + "','" + dataType + "')\">" + dataValue + "</a></td>");
                html.push("<td class=\"text-right\">");
                html.push("<i class=\"fa fa-pencil\" data-set-type='" + dataType + "' data-set-val='" + dataValue + "'></i>");
                html.push("<i class=\"fa fa-times\" data-set-type='" + dataType + "' data-set-val='" + dataValue + "'></i>");
                html.push("</td>");
                html.push("</tr>");
                if ($("#myNewsHead tbody tr").length === 0) {
                    $("#myNewsHead tbody").html(html.join(''));
                } else {
                    $("#myNewsHead tbody tr:first-child").before(html.join(''));
                }
                jindowin.getMyNewsCount();
                jindowin.bindSubscribeDel();
                jindowin.toggleIndexInfo(true);
            } else {
                $.globalMessenger().post({message: '已创建该快讯订阅', type: 'error', showCloseButton: true, hideAfter: 2});
            }
        });
    } else {
        var receiveEmail = $("#receive_email").val();
        if (receiveEmail !== "" && Util.regEmail(receiveEmail)) {
            $.globalMessenger().post({
                message: '订阅信息已发送至您的邮箱【' + receiveEmail + '】',
                type: 'success',
                showCloseButton: true,
                hideAfter: 5
            });
        } else {
            $.globalMessenger().post({message: '请输入正确的邮箱地址', type: 'error', showCloseButton: true, hideAfter: 2});
        }
    }
    e.stopPropagation();
});

/**
 * 我的快讯-查看所有
 */
$("#showMyAll").bind("click", function (e) {
    jindowin.showorhide($(this));
    e.stopPropagation();
});

/**
 * 快讯推荐-股票-查看所有
 */
$("#rec-gp-all").bind("click", function (e) {
    jindowin.showorhide($(this));
    e.stopPropagation();
});

/**
 * 快讯行业-股票-查看所有
 */
$("#rec-hy-all").bind("click", function (e) {
    jindowin.showorhide($(this));
    e.stopPropagation();
});

/**
 * 快讯概念-股票-查看所有
 */
$("#rec-gn-all").bind("click", function (e) {
    jindowin.showorhide($(this));
    e.stopPropagation();
});

/**
 * 设置快讯-确定
 */
$("#settingOk").bind("click", function (e) {
    jindowin.settings();
    e.stopPropagation();
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
$("#search-input").bind("input propertychange", function (e) {
    if ($(this).val() === "") {
        $(".search-clear").hide();
        jindowin.toggleIndexInfo(true);
    } else {
        $(".search-clear").show();
    }
    e.stopPropagation();
});
/**
 * 搜索框清空按钮
 */
$(".search-clear i").bind("click", function (e) {
    $("#search-input").val("");
    $(".search-clear").hide();
    jindowin.toggleIndexInfo(true);
    e.stopPropagation();
})
/**
 * 微信图标点击事件
 */
$("#wechat").bind("click", function (e) {
    var wechatTop = jindowin.docHeight / 2 - 110;
    $("#wechat-dialog").css("top", wechatTop + "px")
    $("#wechat-dialog").modal();
    e.stopPropagation();
});


/**
 * 显示选项按钮事件
 */
$(".show-my-setting").bind("click", function (e) {
    $("#complete-dialog").modal();
    e.stopPropagation();
});

/**
 * 绑定登录按钮事件
 */
$("#btn-login").bind("click", function (e) {
    jindowin.userLogin();
    e.stopPropagation();
});

/**
 * 绑定注册按钮事件
 */
$("#btn-register").bind("click", function (e) {
    jindowin.userRegister();
    e.stopPropagation();

});
/**
 * 绑定头部登录按钮
 */
$("#top-user-name").bind("click", function (e) {
    $("#login-dialog").css("top", jindowin.docHeight / 2 - 165 + "px").modal();
    e.stopPropagation();
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
        onClickAfter: function (node, a, item) {
            if (item.display !== "") {
                jindowin.searchResultShow(item.display, item.group);
            }
        },
        onSubmit: function (node, a, item) {
            if (item.display !== "") {
                jindowin.searchResultShow(item.display, item.group);
            }
        }
    },
    debug: true
});

/**
 * 数字增长值显示
 * @returns {string}
 */
Number.prototype.toPercent = function () {
    if (this > 0) {
        return "<span class=\"text-danger\">" + (Math.round(this.toFixed(6) * 10000) / 100).toFixed(2) + '%' + " ↑</span>";
    } else {
        return "<span class=\"text-success\">" + (Math.round(this.toFixed(6) * 10000) / 100).toFixed(2) + '%' + " ↓</span>";
    }
};
/**
 * 数字转换成xx万/xx千万/xx亿格式
 * @returns {string}
 */
Number.prototype.toNewNumber = function () {
    if (typeof(this) !== "undefined") {
        if (this > 10000 && this < 10000000) {
            return (this / 10000).toFixed(2) + "万";
        }
        if (this > 10000000 && this < 100000000) {
            return (this / 10000000).toFixed(2) + "千万";
        }
        if (this > 100000000) {
            return (this / 100000000).toFixed(2) + "亿";
        }
    }
    return this.toString();
}
/**
 *股票数字转换为代码
 * @returns {string}
 */
String.prototype.toStockCode = function () {
    if (this) {
        var sub = this.toString().substr(0, 1);
        if (sub === "5" || sub == "6") {
            return "sh" + this;
        } else if (sub === "0") {
            return "sz" + this;
        }
    }
}
$(function () {
    /**
     * 初始化提示插件
     */
    $._messengerDefaults = {
        extraClasses: 'messenger-fixed messenger-theme-air  messenger-on-bottom messenger-on-right',
        singleton: true,
        hideAfter: 2
    };
})
