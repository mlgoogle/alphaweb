<?php
/**
 * Created by Lee.
 * Date: 2016/4/15 0015 15:53
 * Description:
 */
$md5Password=md5("123456");
echo $md5Password."\r\n";
$a=substr($md5Password,0,2);
$b=substr($md5Password,2,12);
$c=substr($md5Password,14,16);
$d=substr($md5Password,30,2);
echo $new=$a.chr(rand(97, 122)).$b.chr(rand(97, 122)).$c.chr(rand(97, 122)).$d;