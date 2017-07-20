var maintenanceFlag = false;
var twitterFlag = false;
var css_File_Default = '/css/base.css';
var cssFile_IPhone = '/css/ip_base.css';

var $L = new function(){

	var method = {};

	method.agent = new function(){
		var agentObj;
		var ua = navigator.userAgent.toLowerCase();
		return {
			agent : navigator.userAgent,
			isIE : ua.match(/msie/),
			isIE6 : ua.match(/msie＼s6.0/),
			isIE7 : ua.match(/msie＼s7.0/),
			isIE8 : ua.match(/msie＼s8.0/),
			isFF : ua.match(/firefox/),
			isOpera : ua.match(/opera/),
			isSafari : ua.match(/safari/) && !ua.match(/chrome/),
			isChrome : ua.match(/safari/) && ua.match(/chrome/)
		};
	}
	

	method.background = {
		elm : $('<div />'),
		set : function(color,alpha){
			//color	:	String	:	def:'#000000'
			//alpha	:	String	:	def:'.6'
			var color = color || '#000000';
			var alpha = alpha || '.6';
		
			var height,position,alphaIE;
			if(method.agent.isIE){
				height = $(window).height()+$(window).scrollTop();
				position = 'absolute';
				alphaIE = String(alpha).split('.')[1]+'0';
			}else{
				height = '100%';
				position = 'fixed';
			}
			this.elm.css({
				'background':color,
				'opacity':alpha,
				'position':position,
				'height':height,
				'width':'100%',
				'left':'0px',
				'top':'0px',
				'z-index':'9999',
				'-moz-opacity':alpha,
				'filter' : 'alpha(opacity='+alphaIE+')',
				'display':'none'
			}).prependTo(document.body).fadeIn('first');
		},
		close : function(){
			this.elm.fadeOut('first',function(){
				$(this).remove()
			});
		}
	}
	
	method.setPosition = function(elm){
		elm.css({
			'top':$(window).height()/2-elm.height()/2+$(window).scrollTop(),
			'left':$(window).width()/2-elm.width()/2+$(window).scrollLeft()
		})
	}
	
	return method;
}

var pastData = {};
pastData.open = function(type){
	var urldata;
	var outDom;
	var btn;
	switch(type){
		case 'info':
			urldata = '/pastinfo.html';
			outDom = $('#Past_Info .output');
			btn = $('#Past_Info p');
			break;
		case 'live':
			urldata = '/pastlive.html';
			outDom = $('#Past_Live .output');
			btn = $('#Past_Live p');
			break;
	}
	
	$.ajax({
		url : urldata,
		cache:false,
		success:function(res){
			outDom.html(res);
			btn.css({'display':'none'})
		},
		error:function(res,e){
			outDom.html('エラー<br />'+e);
		}
	})
};
pastData.close = function(type){
	var outDom;
	var btn;
	switch(type){
		case 'info':;
			outDom = $('#Past_Info .output');
			btn = $('#Past_Info p');
			break;
		case 'live':
			outDom = $('#Past_Live .output');
			btn = $('#Past_Live p');
			break;
	};
	outDom.html('');
	btn.css({'display':'block'})
	
}

$(document).ready(function(e){
	//メンテナンス中
	if(maintenanceFlag){
		$(document.body).html($('<p></p>').css({'width':'320px','margin':'auto'}).append($('<img />').attr({'src':'/images/maintaining.gif','alt':'メンテナンス中'})))
	}
	
	//NextLive
	var date = new Date();
	$('#Live .section h3').each(function(i,obj){
		var liveInfo = $('#Live .section')[i].innerHTML;
		var lDate = obj.firstChild.data.split(':')[0];
		var yy = lDate.split('年')[0];
		var mm = lDate.substr(lDate.indexOf('年')+1,lDate.indexOf('月')-lDate.indexOf('年')-1)-1;
		var dd = lDate.substr(lDate.indexOf('月')+1,lDate.indexOf('日')-lDate.indexOf('月')-1);
		var nextLiveDate = new Date(
			yy,
			mm,
			dd,
			23,
			59,
			59
		);
		//console.log(nextLive+':'+date)
		//console.log(nextLive<date)
		if(nextLiveDate>date){
			$('#NextLiveInfo').html(liveInfo);
			
			return false;
		}else{
			$('#NextLiveInfo').html('ライブ予定はありません。');
		}
	});
	
	//Copyright
	$('#Copy').html('Copyright &copy;'+new Date().getFullYear()+' ジャマイチ All Rights Reserved.');
	
	//TwitterAreaをマウスオーバーしているかを示すFlag
	$('#TwitterArea').mouseover(function(){
		twitterFlag = true;
	}).mouseout(function(){
		twitterFlag = false;
	});
	$(document).scroll(function(e){
		if(twitterFlag){
			e.preventDefault();
		}
	})
});

//For iPhone
//WebKitDetect.isMobile()
if(WebKitDetect.isMobile()){
	//ビューポートメタタグを設定
	//<meta name = "viewport" content = "width = 700">
	$('<meta />').attr({'name':'viewport','content':'width = device-width'}).appendTo($('head'));
	//CSSを切り替え
	$('link').each(function(i,obj){
		if(obj.href.indexOf(css_File_Default)!=-1){
			obj.href=cssFile_IPhone;
			return false;
		};
	});
};

//NextLive
$(document).ready(function(){
	
});

//Copyright
$(document).ready(function(){
	
});

//TwitterAreaをマウスオーバーしているかを示すFlag
$(document).ready(function(){
	
	
})

/*
$(document).ready(function(){
	$.ajax({
	   type: "POST",
	   url: "/load.php",
	   dataType : "xml",
	   complete : function(res){
	   		console.log($(res).find());
			$(res).find("status").each(function(){
				console.log($(this))
			});
	   }
	 });
})
*/


















