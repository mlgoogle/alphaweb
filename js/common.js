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
    }
}