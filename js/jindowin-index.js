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
     * 搜索框的清空按钮操作
     */
    clearIconShowHide: function () {
        var val = $("#search-input").val();
        if (val !== "") {
            $("#search-clear").removeClass("hide");
        } else {
            $("#search-clear").addClass("hide");
        }
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
    jindowin.clearIconShowHide();
});

/**
 * 搜索框清空按钮事件
 */
$("#search-clear").bind("click", function () {
    $("#search-input").val("");
    $("#search-input").focus();
    jindowin.clearIconShowHide();
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

var data = {
    "stock": [
        "招商银行(600036)","这是招商","银行666666","建设银行","招商"
    ],
    "industry": [
        "招商银行(600036)"
    ],
    "concept": [
        "招商银行(600036)"
    ],
    "hotevent": [
        "上海市招商银行", "招商银行倒闭了", "杭州招商银行啦啦啦"
    ]
};
$('#search-input').typeahead({
    minLength: 1,
    maxItem: 20,
    order: "asc",
    hint: true,
    group: [true, "{{group}}"],
    maxItemPerGroup: 5,
    // backdrop: {
    //     "background-color": "#fff"
    // },
    backdrop: false,
    //href: "/beers/{{group}}/{{display}}/",
    dropdownFilter: "all beers",
    emptyTemplate: '未找到 "{{query}}" 的相关信息',
    source: {
        "股票": {
            data: data.stock
        },
        "行业": {
            data: data.industry
        },
        "概念": {
            data: data.concept
        },
        "热点事件": {
            data: data.hotevent
        }
    },
    callback: {
        onClickAfter: function (node, a, item, event) {
            console.log("你选择了\"" + item.group + "\"下的\"" + item.display + "\"");
        }
    },
    debug: true
});
