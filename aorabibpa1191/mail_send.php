<?php 
if($_POST["name"]=="" || $_POST["email"] == "" || $_POST["msg"] == ""){
	header("Location:/aorabibpa1191/mail_error.html");
	return false;
}
$body_mail = "
名前：".$_POST["name"]."
メールアドレス：".$_POST["email"]."
本文：".nl2br($_POST["msg"])."";

mb_language("Japanese");
mb_internal_encoding("UTF-8");
$headers = "From:".mb_encode_mimeheader (mb_convert_encoding("ikumi","ISO-2022-JP","AUTO"))."<orangemittoo@gmail.com> \n";
mb_send_mail("orangemittoo@gmail.com","ジャマイチへのメール",$body_mail,$headers);
header("Location:/aorabibpa1191/mail_finish.html");
 ?>