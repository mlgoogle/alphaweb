<?php

/**
 * Created by Lee.
 * Date: 2016/4/10 0020 9:41
 * Description:工具类
 */
class UtilityTools
{
    /**
     * 转换股票代码
     * @param string $stockcode 股票代码
     * @return string 返回新代码
     */
    public static function changeStockCode($stockcode)
    {
        if (!empty($stockcode)) {
            $head = substr($stockcode, 0, 1);
            switch ($head) {
                case "5":
                case "6":
                case "9":
                    return "sh" . $stockcode;
                    break;
                case "0":
                case "2":
                    return "sz" . $stockcode;
                    break;
                case "3":
                    return "sz" . $stockcode;
                    break;
                case "4":
                    return $stockcode;
                    break;
                default :
                    return $stockcode;
            }
        }
    }

    /**
     * 获取新浪股票数据
     * @param $stockCode 股票代码
     * @return array 返回数组数据
     */
    public static function getSinaData($stockCode)
    {
        $url = "http://hq.sinajs.cn/list=" . self::changeStockCode($stockCode);
        $result = mb_convert_encoding(RequestUtil::get($url),"utf-8","gbk");
        $sinaData = explode('=', $result);
        if (!empty($sinaData[1]) && !strstr($sinaData[1], "FAILED")) {
            $valArr = explode(',', $sinaData[1]);
            return $valArr;
        }
        return null;
    }
}