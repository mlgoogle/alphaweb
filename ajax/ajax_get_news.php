<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 16:59
 * Description:获取新闻
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/JindowinConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$stock_code = isset($_POST['stock_code']) ? $_POST['stock_code'] : "";
$hy_name = isset($_POST['hy_name']) ? $_POST['hy_name'] : "";
$news_type = isset($_POST['news_type']) ? $_POST['news_type'] : "";
$section = isset($_POST['section']) ? $_POST['section'] : "";
$page = isset($_POST['page']) ? $_POST['page'] : 0;

$url = JindowinConfig::$requireUrl . "/news/1/get_news.fcgi";
$result = RequestUtil::get($url,
    array(
        "user_id" => $_SESSION['user_id'],      //用户唯一标识
        "token" => $_SESSION['token'],          //用户登录标识
        "stock_code" => $stock_code . ',',      //股票代码
        "hy_name" => $hy_name,                  //行业名称
        "section"=>$section,
        "news_type" => $news_type,              //1-股票相关2-行业相关3-板块相关4-研报相关5-全部新闻
        "page" => $page                         //页面号
    ));
$jsonresult = json_decode($result, true);

if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
    return;
}
