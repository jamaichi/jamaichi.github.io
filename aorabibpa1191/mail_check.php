<?php include('post_data.php') ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html401/loose.dtd">
<html lang="ja">
<head>
<title>ジャマイチ　JAMA-ICHI ex.ジャマイカ一丁目Riddim</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="Content-Language" content="ja">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta name="Description" content="全国のレゲエアーティストとコラボし、ロックステディからルーツ、ダブ、ダンスホールまでこなすレゲエオールラウンドプレイヤーズ！　JAMA-ICHI!!">
<meta name="Keywords" content="JAMA-ICHI ジャマイチ,ジャマイカ一丁目Riddim,ジャマイカ一丁目バンド,レゲエ,ジャマイカン">
<link href="/css/base.css" rel="stylesheet" type="text/css" media="screen,media" />
<link href="/facebox/facebox.css" rel="stylesheet" type="text/css" media="screen,media" />
<script type="text/javascript" src="/js/utility.js"></script>
<script type="text/javascript" src="/js/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="/js/jquery.page-scroller-306.js"></script>
<script type="text/javascript" src="/facebox/facebox.js"></script>
<script type="text/javascript">
jQuery(document).ready(function($) {
  $('a[rel*=facebox]').facebox();
})
</script>
</head>
<body>
<div id="PageTop"></div>
<div id="Header" class="clearfix">
	<h1><img src="/images/jama1.png" class="alpha" width="100" height="61" alt="ジャマイチ JAMA-ICHI ex.ジャマイカ一丁目Riddim" /></h1>
</div>
<div id="Background"></div>


<!-- START #Mail -->
<div class="container" id="Mail">
	<h2><img src="/images/title_mail.gif" alt="Mail" /><span style="padding-left:10px;">入力を確認してください。</span></h2>
	<div class="contents">
		<form action="/aorabibpa1191/mail_send.php" method="post">
			<input type="hidden" name="match" value="email email2" />
			<table>
				<tr><th>名前</th><td><?php post_data($_POST['name'],'name',true) ?></td></tr>
				<tr><th>メールアドレス</th><td><?php 
				$m1 = $_POST['email'];
				$m2 = $_POST['email2'];
				if($m1 == $m2){
					post_data($m1,'email',true);
				}else{
					$errorFlag = true;
					print '<span style="color:#c00">メールアドレスの入力が不正です。</span>';
				}

				?></td></tr>
				<tr><th>本文</th><td><?php post_data($_POST['msg'],'msg',true,5000) ?></td></tr>
			</table>
			<p><input type="button" value="戻る" onclick="history.back()"><?php 
					if(!$errorFlag) print '<input type="submit" value="送信">'; 
			?></p>
		</form>
	</div>
</div>
<!-- //END #Mail -->
<p id="Copy">Copyright &copy;2009 ジャマイチ All Rights Reserved.</p>
<img src="/images/bottom_spacer.gif" width="1" height="300" style="display:block" />
<div id="LinkImage">
	<ul>
		<li><a href="http://www.myspace.com/jamaichi" target="_blank"><img src="/images/banner_234x60_01.gif">myspace</a><br />音源が試聴できます</li>
	</ul>
</div>
<div id="Record"><img src="/images/record.png" width="550" height="550" class="alpha" /></div>
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
var pageTracker = _gat._getTracker("UA-4059597-1");
pageTracker._initData();
pageTracker._trackPageview();
</script>
<!--[if IE 6]>
<script type="text/javascript"> 
	/*Load jQuery if not already loaded*/ if(typeof jQuery == 'undefined'){ document.write("<script type=\"text/javascript\"   src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js\"></"+"script>"); var __noconflict = true; } 
	var IE6UPDATE_OPTIONS = {
		icons_path: "http://static.ie6update.com/hosted/ie6update/images/"
	}
</script>
<script type="text/javascript" src="http://static.ie6update.com/hosted/ie6update/ie6update.js"></script>
<![endif]-->
</body>
</html>