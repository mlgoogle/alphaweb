<?php
/**
 * Created by Lee.
 * Date: 2016/4/20 0020 9:33
 * Description:获取新浪接口股票数据
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
$stock_code=isset($_POST['stock_code']) ? $_POST['stock_code'] : "";
$url = "http://hq.sinajs.cn/list=".$stock_code;
$result = RequestUtil::get($url);