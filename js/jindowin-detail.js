jQuery(function ($) {
    $.material.init();
    $(".look-up i").click(function () {
        var $this = $(this);
        if (!$this.hasClass("look-up-hover") && !$(".look-down i").hasClass("look-down-hover")) {
            var id = $($this).attr("data-set-id");
            var newsdate = $($this).attr("data-set-date");
            jindowin.lookUpAndDown(id, newsdate, 1, function () {
            }, function (resultData) {
                if (resultData.status === 1) {
                    $($this).next("p").html(resultData.result[0].up + "人看涨");
                    $($this).addClass("look-up-hover");
                }
            });
        }
    });
    $(".look-down i").click(function () {
        var $this = $(this);
        if (!$this.hasClass("look-up-hover") && !$(".look-up i").hasClass("look-up-hover")) {
            var id = $($this).attr("data-set-id");
            var newsdate = $($this).attr("data-set-date");
            jindowin.lookUpAndDown(id, newsdate, 2, function () {
            }, function (resultData) {
                if (resultData.status === 1) {
                    $($this).next("p").html(resultData.result[0].down + "人看跌");
                    $($this).addClass("look-down-hover")
                }
            });
        }
    });
    $(".detail-right i").each(function () {
        var $this = $(this);
        var $type = $(this).attr("data-user-type");
        var $val = $($this).attr("data-user-val");
        $($this).click(function () {
            if ($this.hasClass("fa fa-plus")) {
                jindowin.addSubscribe(userSubSetting.startTime, userSubSetting.endTime, userSubSetting.timeinval, $type === "stock" ? $val : null, $type === "industry" ? $val : null, $type === "section" ? $val : null, function () {
                    $($this).addClass("fa-spin");
                }, function (resultData) {
                    $($this).removeClass("fa-spin");
                    if (resultData.status === -1) {
                        $("#login-dialog").css("top", jindowin.docHeight / 2 - 165 + "px").modal();
                        return;
                    }
                    if (resultData.status === 1) {
                        jindowin.checkOrNot($($this));
                    }
                });
            } else {
                jindowin.delSubscribe($type, $val, function () {
                    $($this).addClass("fa-spin");
                }, function (resultData) {
                    $($this).removeClass("fa-spin");
                    if (resultData.status === -1) {
                        $("#login-dialog").css("top", jindowin.docHeight / 2 - 165 + "px").modal();
                    }
                    if (resultData.status === 1) {
                        jindowin.checkOrNot($($this));
                    }
                });
            }
        });
    });
    $(".news-like").click(function(){
        $(this).tips({
            msg:"敬请期待",
            side: 3,
            time:1,
            color:"#999",
            bg:"rgba(238,238,238,0.5)",
            y:-5
        })
    })
    $(".news-unlike").click(function(){
        $(this).tips({
            msg:"敬请期待",
            side: 3,
            time:1,
            color:"#999",
            bg:"rgba(238,238,238,0.5)",
            y:-5
        })
    })
    $(".news-share").click(function(){
        $(this).tips({
            msg:"敬请期待",
            side: 3,
            time:1,
            color:"#999",
            bg:"rgba(238,238,238,0.5)",
            y:-5
        })
    })
});