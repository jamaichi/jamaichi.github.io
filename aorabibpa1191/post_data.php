<?php 
function post_data($str,$name,$flg=false,$length=255){
	//$str		:	POSTデータ
	//$name		:	input type="hidden"要素のname属性の値
	//$length	:	文字数
	//$flg		:	必須要素かを示す　true：必須
	
	global $errorFlag;
	
	//WindowsのCRLF改行をLF改行に変更
	$str = str_replace("\r\n","\n",$str);
	//MACのCR改行をLF改行に変更
	$str = str_replace("\r","\n",$str);
	//実態参照を「<」、「>」、「&」、「"」、「'」に変更
	$str = html_entity_decode($str,ENT_QUOTES);
	//「<」、「>」、「&」、「"」、「'」を実態参照に変更
	$str = htmlspecialchars($str,ENT_QUOTES);
	
	
	//文字数チェック
	if(mb_strlen($str)>$length){
		$errorFlag = true;
		print '<span style="color:#c00">文字数が長すぎです。</span>';
		return;
	}
	//必須チェック
	if($flg and $str==""){
		$errorFlag = true;
		print '<span style="color:#c00">入力してください。</span>';
		return;
	}
	
	//画面に出力
	print nl2br($str);
	//hidden要素を設定
	print '<input type="hidden" name="'.$name.'" value="'.$str.'" />';
}

 ?>