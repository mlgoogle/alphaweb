/**
 * 工具类
 * @type {{regEmail: Util.regEmail}}
 */
var Util={
    /**
     * 验证邮箱
     * @param email
     * @returns {boolean}
     */
    regEmail: function (email) {
        var myreg =/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        if (!myreg.test(email)) {
            return false;
        }
        return true;
    },
    /**
     * 获取queryString参数
     * @param query
     * @returns {*}
     */
    queryString:function(query){
        var search = window.location.search + '';
        if (search.charAt(0) != '?') {
            return undefined;
        }
        else {
            search = search.replace('?', '').split('&');
            for (var i = 0; i < search.length; i++) {
                if (search[i].split('=')[0] == query) {
                    return decodeURI(search[i].split('=')[1]);
                }
            }
            return undefined;
        }
    },
    /**
     * 转换百分比
     * @param data
     * @returns {string}
     */
    toPercent:function(data){
        var strData = (parseFloat(data)*100).toFixed(2);
        var ret = strData.toString()+"%";
        return ret;
    }
}