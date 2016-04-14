<?php
/**
 * Created by Lee.
 * Date: 2016/4/5 0005 17:00
 * Description:新闻看涨看跌
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/JindowinConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() != 1) {
    print_r(json_encode(array("status" => -1, "result" => "用户未登录")));
    return;
}
$news_id = isset($_POST["news_id"]) ? $_POST["news_id"] : "";
$commit_type = isset($_POST["commit_type"]) ? $_POST["commit_type"] : "";
$date = isset($_POST["newsdate"]) ? $_POST["newsdate"] : "";

if (empty($news_id) || empty($commit_type) || empty($date)) {
    print_r(json_encode(array("status" => 0, "result" => "参数错误")));
    return;
}
$url = JindowinConfig::$requireUrl . "news/1/set_news.fcgi";
$result = RequestUtil::get($url,
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION['token'],
        "news_id" => $news_id,
        "commit_type" => $commit_type,
        "date" => urlencode($date)
    ));
print_r($result);