var $L = new function(){

	var method = {};
	//var docTest = document;
	
	/* --------------------------------------------- */
	// ▼ユーザーエージェント
	/* --------------------------------------------- */
	method.agent = new function(){
		var agentObj;
		var ua = navigator.userAgent.toLowerCase();
		return {
			agent : navigator.userAgent,
			isIE : ua.match(/msie/),
			isIE6 : ua.match(/msie¥s6.0/),
			isIE7 : ua.match(/msie¥s7.0/),
			isIE8 : ua.match(/msie¥s8.0/),
			isFF : ua.match(/firefox/),
			isOpera : ua.match(/opera/),
			isSafari : ua.match(/safari/) && !ua.match(/chrome/),
			isChrome : ua.match(/safari/) && ua.match(/chrome/)
		}
		
	}
	
	
	/* --------------------------------------------- */
	// ▼イベントリスナー
	/* --------------------------------------------- */
	
	//条件分岐はJS解析時の一回のみにする
	var listener;

	if(document.addEventListener){
		listener=function(element,eventType,listener,capture){

			//イベントハンドラ
			var handler = function(event){
				listener.call(element,getEvent(event,element,instance))
			}
			
			//返却されるオブジェクト
			var instance = {
				isActive : true,
				remove : function(){
					element.removeEventListener(eventType,handler,capture);
					instance.isActive = false;
				},
				restart : function(){
					element.addEventListener(eventType,handler,capture);
					instance.isActive = true;
				}
			}
			
			element.addEventListener(eventType,handler,false);
			return instance;
		}
	}else if(document.attachEvent){
		listener = function(element,eventType,listener){
			 // 実際に呼ばれるイベントハンドラ
			 var handler = function(){
			         listener.call(element, getEvent(window.event, element, instance));
			 };
			 // 返却されるオブジェクト
			 var instance = {
			         isActive : true,
			         remove : function(){
			                 instance.isActive=false;
			                 element.detachEvent('on' + eventType, handler);
			         },
			         restart : function(){
			                 instance.isActive=true;
			                 element.attachEvent('on' + eventType, handler);
			         }
			 };
			 element.attachEvent('on' + eventType, handler);
			 return instance;
	        };
	}
	
	//▼リスナー用の関数
	var getEvent = function(e, element, listener){
		return {
			 //      property        :               value(DOM)                      || value(IE)
			 _event                  :               e,
			 //      イベント関連のプロパティ
			 type                    :               e.type,
			 target                  :               e.target                        || e.srcElement,
			 currentTarget   :               element,
			 relatedTarget   :               e.relatedTarget         || e.fromElement ? e.fromElement : e.toElement,
			 eventPhase              :               e.eventPhase            || e.srcElement == element ? 2 : 3,
			 //      座標関連のプロパティ
			 clientX                 :               e.clientX,
			 clientY                 :               e.clientY,
			 screenX                 :               e.screenX,
			 screenY                 :               e.screenY,
			 //      キーイベント関連のプロパティ
			 altKey                  :               e.altKey,
			 ctrlKey                 :               e.ctrlKey,
			 shiftKey                :               e.shiftKey,
			 keyCode                 :               e.keyCode,
			 //      イベントがkeydownの場合、キー名を返却します。
			 get_keyChar             :               function(){
			                                                         return KeyEvent.get_keyChar(this);
			 },
			 //      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			 //      DOM互換のデフォルト動作抑止メソッドおよびイベント伝播抑止メソッドです。
			 //      stopは、preventDefaultとstopPropagationを同時に実行します。
			 //      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			 preventDefault  :               function(){
			                                                         e.preventDefault ? e.preventDefault() : e.returnValue = false ;
			 },
			 stopPropagation :               function(){
			                                                         e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
			 },
			 stop                    :               function(){
			                                                         this.preventDefault();
			                                                         this.stopPropagation();
			 }
		}
	}
	
	/* --------------------------------------------- */
	// ▼getElementById
	/* --------------------------------------------- */
	method.id = function(id){
		return document.getElementById(id);
	}
	/* --------------------------------------------- */
	// ▼getElementByTagName
	/* --------------------------------------------- */
	method.tag = function(tag,parent){
		//tag : String : タグネーム
		//parent : Object : 親DOM要素　※省略可
		var parent = typeof parent == 'string' ? method.id(parent):parent||document;
		return parent.getElementsByTagName(tag);
	}
	/* --------------------------------------------- */
	// ▼getComputedStyle 
	/* --------------------------------------------- */
	method.getStyle = function(element){
		//element : Object : 取得するDOM要素
		return element.currentStyle || document.defaultView.getComputedStyle(element,'');
	}
	/* --------------------------------------------- */
	// ▼getClass //classノードを配列で取得 
	/* --------------------------------------------- */
	method.getClass = function(className,tag,parent){
		//className : String : クラスネーム
		//tag : String : classNameが設定されているタグ名　※省略可
		//parent : Object : 上位DOM要素　※省略可
		
		tag = tag || '*';
		parent = parent || document;
		
		
		//返却する配列
		var elements = [];
		
		//class一致するかを精査する関数
		var isMember = function(targetClass){
			//クラスが設定されていなければreturn false
			if(!targetClass) return false;
			//classNameとHITすればtrue
			if(targetClass == className) return true;
			
			//複数クラスが設定されている場合の処理
			var whiteSpace = ' ';
			//複数でない場合はreturn false
			//console.log(targetClass+'='+whiteSpace+'='+targetClass.indexOf(whiteSpace))
			if(targetClass.indexOf(whiteSpace) == -1) return false;
			//複数の場合
			var sp = targetClass.split(whiteSpace);
			for(var i=0,len = sp.length;i<len;i++){
				if(arguments.callee(sp[i])) return true;
			}
			return false;
		}

		
		//該当する要素を取得
		var all =  method.tag(tag,parent);
		for(var i=0,len = all.length;i<len;i++){
			if(isMember(all[i].className)){
				elements.push(all[i])
			}
		}
		return elements;
		
	}
	
	/* --------------------------------------------- */
	// ▼ get_geom　//windowのサイズを返す
	/* --------------------------------------------- */
	method.get_geom = function(){
		var e	=	document.documentElement;
		var b	=	document.body;
		var sW	=	'scrollWidth';
		var sH	=	'scrollHeight';
		var cW	=	'clientWidth';
		var cH	=	'clientHeight';
		var sL	=	'scrollLeft';
		var sT	=	'scrollTop';
		var flag = (e[cW] == 0);
		//	評価中
		return {
			width			:	flag ?	Math.max(b[sW], b[cW])	:	Math.max((e[sW]	||	b[sW]), (e[cW] || b[cW])),
			height			:	flag ?	Math.max(b[sH], b[cH])	:	Math.max((e[sH]	||	b[sH]), (e[cH] || b[cH])),
			top				:	b[sT] 												||	e[sT],
			left			:	b[sL]												||	e[sL],
			clientWidth		:	flag ?	b[cW]					:	(e[cW]||b[cW]),
			clientHeight	:	flag ?	b[cH]					:	(e[cH]||b[cH])
		};
	}
	
	/* ------------------------------------------------*/
	//HTTP通信
	/* ------------------------------------------------*/
	method.http = {
		_factories : [
					function(){return new XMLHttpRequest();},
					function(){return new ActiveXObject("Msxml2.XMLHTTP");},
					function(){return new ActiveObject("Microsoft.XMLHTTP")}
				],
					
		_factory : null,
			
		newRequest : function(){
			if(this._factory != null) return this._factory();
			
			for(var i = 0;i < this._factories.length;i++){
				try{
					var factory = this._factories[i];
					var request = factory();
					if(request != null){
						this._factory = factory;
						return request;
					}
				}
				catch(e){
					continue;
				}
			}
			//エラー処理

			this._factory = function(){
				throw new Error("XMLHttpRequest not supported");
			}
			this._factory();
		},
		
		dataRequest : function(url,callback){
			var request = this.newRequest();
			request.onreadystatechange = function(){
				if(request.readyState==4 && request.status == 200){
					callback(request)
				}
			}
			request.open("GET",url);
			request.send(null);
		}
	}
	
	/* ------------------------------------------------*/
	//Cookieコンストラクタ
	/* ------------------------------------------------*/
	method.Cookie = function(name){
		this.$name = name;
		var allcookies = document.cookie;
		if(allcookies == '') return;
		
		var cookies = allcookies.split('; ');
		var cookie = null;
		for(var i = 0;i < cookies.length;i++){
			if(cookies[i].substring(0,name.length + 1) == (name + '=')){
				cookie = cookies[i];
				break;
			}
		}
		if(cookie == null) return;
		
		var cookieval = cookie.substring(name.length+1);
		
		var a = cookieval.split('&');
		for(var i = 0;i < a.length;i++){
			a[i] = a[i].split(':');
		}
		for(var i = 0;i < a.length;i++){
			this[a[i][0]] = decodeURIComponent(a[i][1]);
		}
	}

	method.Cookie.prototype.store = function(daysToLive,path,domain,secure){
		
		var cookieval = '';
		for(var prop in this){
			if((prop.charAt(0) == '$') || (typeof this[prop]) == 'function'){continue};
			if(cookieval != '') cookieval += '&';
			cookieval += prop + ':' + encodeURIComponent(this[prop]);
		}
		
		var cookie = this.$name + '=' +cookieval;
		if(daysToLive || daysToLive ==0){
			cookie += ';max-age=' + (daysToLive*24*60*60);
		}
		if(path) cookie += ';path=' + path;
		if(domain) cookie += ';domain=' + domain;
		if(secure) cookie += ';secure=' + secure;
		document.cookie = cookie;
		
	}
	method.Cookie.prototype.remove = function(path,domain,secure){
		for(var prop in this){
			if(prop.charAt(0) != '$' && typeof this[prop] != 'function')
			delete this[prop]
		}
		this.store(0,path,domain,secure)
	}
	
	/* ------------------------------------------------*/
	//フェードイン・アウト
	/* ------------------------------------------------*/
	method.Fade = function(id,alpha){
		//id:String ターゲットのID
		//alpha:String IN:stop値 / OUT:start値
		this.id = (typeof id == 'string')? method.id(id) : id;
		this.alpha = alpha;	
		this.ieAlpha=(this.alpha != 1)? this.alpha.split('.')[1] + '0':'100';
		this.stopAlpha_opera = this.alpha + 0;
	}
	method.Fade.prototype.fadeIn = function(value,func){
		//value:String 透過の早さ
		//func：Function　alpha処理後に実行　[省略可]
		var instance = this;
		this.value = value;
		this.ieValue=(this.value != 1)? (this.value.length == 4)?this.value.charAt(3):this.value.split('.')[1] + '0':'100';
		this.func = func;
		this.id.style.opacity = 0;
		this.id.style.filter = 'alpha(style=0, opacity=0)';
		this.id.style.display = 'block';
		if(method.ns){
				if(this.func){this.func.apply(this,[])}
			}else if(method.ie){
				var counter = 0;
				var __closeAlpha = function(){
					instance.id.style.filter = 'alpha(style=0, opacity='+ counter +')';
					if(counter >= instance.ieAlpha){
						clearInterval(closeAlphaId);
						if(instance.func){instance.func.apply(instance,[])}
					}
					counter -= -instance.ieValue;
				}
				var closeAlphaId = setInterval(__closeAlpha,5);
			}else{
				//alert(instance.id + '¥n' + instance.id.style.opacity + '¥nstopAlpha_opera:' + instance.stopAlpha_opera);
				var __openAlpha = function(){
					instance.id.style.opacity -= -instance.value;
					//alert('instance.id.style.opacity：' + instance.id.style.opacity + '¥n' + 'instance.value:' + instance.value)
					if(instance.id.style.opacity >= instance.alpha || instance.id.style.opacity >= instance.stopAlpha_opera){
						clearInterval(openAlphaId);
						if(instance.func){instance.func.apply(instance,[])}
					}
				}
				var openAlphaId = setInterval(__openAlpha,5);
			}
	}
	method.Fade.prototype.fadeOut = function(value,func){
		//value:String 透過の早さ
		//func：Function　alpha処理後に実行　[省略可]
		var instance = this;
		this.value = value;
		this.ieValue=(this.value != 1)? (this.value.length == 4)?this.value.charAt(3):this.value.split('.')[1] + '0':'100';
		this.func = func;
		instance.id.style.opacity = this.alpha;
		instance.id.style.filter = 'alpha(style=0, opacity=' + this.ieAlpha +')';
		if(method.ns){
				this.id.style.display = 'none';
				if(this.func){this.func.apply(this,[])}
			}else if(method.ie){
				var counter = instance.ieAlpha;
				var __closeAlpha = function(){
					instance.id.style.filter = 'alpha(style=0, opacity='+ counter +')';
					if(counter <= 0){
						clearInterval(closeAlphaId);
						if(instance.func){instance.func.apply(instance,[])}
					}
					counter -= instance.ieValue;
				}
				var closeAlphaId = setInterval(__closeAlpha,5);
			}else{
				//alert(id + '¥n' + instance.id.style.opacity + '¥nstopAlpha_opera:' + stopAlpha_opera);
				var __closeAlpha = function(){
					instance.id.style.opacity -= instance.value;
					if(instance.id.style.opacity <= 0){
						clearInterval(closeAlphaId);
						if(instance.func){instance.func.apply(instance,[])}
					}
				}
				var closeAlphaId = setInterval(__closeAlpha,5);
			}
	}
	
	method.addEventListener = listener
	return method;
}