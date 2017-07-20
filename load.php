<?php
$limit = 10;
$url = "http://twitter.com/statuses/user_timeline/jamaichi.xml";
$photoxml = file_get_contents($url);
echo $photoxml;
?> 