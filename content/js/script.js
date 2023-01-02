!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):"object"==typeof exports?factory(require("jquery")):factory(window.jQuery||window.Zepto)}(function($){var mfp,_prevStatus,_document,_prevContentType,_wrapClasses,_currPopupType,MagnificPopup=function(){},_isJQ=!!window.jQuery,_window=$(window),_mfpOn=function(name,f){mfp.ev.on("mfp"+name+".mfp",f)},_getEl=function(className,appendTo,html,raw){var el=document.createElement("div");return el.className="mfp-"+className,html&&(el.innerHTML=html),raw?appendTo&&appendTo.appendChild(el):(el=$(el),appendTo&&el.appendTo(appendTo)),el},_mfpTrigger=function(e,data){mfp.ev.triggerHandler("mfp"+e,data),mfp.st.callbacks&&(e=e.charAt(0).toLowerCase()+e.slice(1),mfp.st.callbacks[e]&&mfp.st.callbacks[e].apply(mfp,$.isArray(data)?data:[data]))},_getCloseBtn=function(type){return type===_currPopupType&&mfp.currTemplate.closeBtn||(mfp.currTemplate.closeBtn=$(mfp.st.closeMarkup.replace("%title%",mfp.st.tClose)),_currPopupType=type),mfp.currTemplate.closeBtn},_checkInstance=function(){$.magnificPopup.instance||((mfp=new MagnificPopup).init(),$.magnificPopup.instance=mfp)};MagnificPopup.prototype={constructor:MagnificPopup,init:function(){var appVersion=navigator.appVersion;mfp.isIE7=-1!==appVersion.indexOf("MSIE 7."),mfp.isIE8=-1!==appVersion.indexOf("MSIE 8."),mfp.isLowIE=mfp.isIE7||mfp.isIE8,mfp.isAndroid=/android/gi.test(appVersion),mfp.isIOS=/iphone|ipad|ipod/gi.test(appVersion),mfp.supportsTransition=function(){var s=document.createElement("p").style,v=["ms","O","Moz","Webkit"];if(void 0!==s.transition)return!0;for(;v.length;)if(v.pop()+"Transition"in s)return!0;return!1}(),mfp.probablyMobile=mfp.isAndroid||mfp.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),_document=$(document),mfp.popupsCache={}},open:function(data){var i;if(!1===data.isObj){mfp.items=data.items.toArray(),mfp.index=0;var item,items=data.items;for(i=0;i<items.length;i++)if((item=items[i]).parsed&&(item=item.el[0]),item===data.el[0]){mfp.index=i;break}}else mfp.items=$.isArray(data.items)?data.items:[data.items],mfp.index=data.index||0;if(!mfp.isOpen){mfp.types=[],_wrapClasses="",data.mainEl&&data.mainEl.length?mfp.ev=data.mainEl.eq(0):mfp.ev=_document,data.key?(mfp.popupsCache[data.key]||(mfp.popupsCache[data.key]={}),mfp.currTemplate=mfp.popupsCache[data.key]):mfp.currTemplate={},mfp.st=$.extend(!0,{},$.magnificPopup.defaults,data),mfp.fixedContentPos="auto"===mfp.st.fixedContentPos?!mfp.probablyMobile:mfp.st.fixedContentPos,mfp.st.modal&&(mfp.st.closeOnContentClick=!1,mfp.st.closeOnBgClick=!1,mfp.st.showCloseBtn=!1,mfp.st.enableEscapeKey=!1),mfp.bgOverlay||(mfp.bgOverlay=_getEl("bg").on("click.mfp",function(){mfp.close()}),mfp.wrap=_getEl("wrap").attr("tabindex",-1).on("click.mfp",function(e){mfp._checkIfClose(e.target)&&mfp.close()}),mfp.container=_getEl("container",mfp.wrap)),mfp.contentContainer=_getEl("content"),mfp.st.preloader&&(mfp.preloader=_getEl("preloader",mfp.container,mfp.st.tLoading));var modules=$.magnificPopup.modules;for(i=0;i<modules.length;i++){var n=modules[i];n=n.charAt(0).toUpperCase()+n.slice(1),mfp["init"+n].call(mfp)}_mfpTrigger("BeforeOpen"),mfp.st.showCloseBtn&&(mfp.st.closeBtnInside?(_mfpOn("MarkupParse",function(e,template,values,item){values.close_replaceWith=_getCloseBtn(item.type)}),_wrapClasses+=" mfp-close-btn-in"):mfp.wrap.append(_getCloseBtn())),mfp.st.alignTop&&(_wrapClasses+=" mfp-align-top"),mfp.fixedContentPos?mfp.wrap.css({overflow:mfp.st.overflowY,overflowX:"hidden",overflowY:mfp.st.overflowY}):mfp.wrap.css({top:_window.scrollTop(),position:"absolute"}),(!1===mfp.st.fixedBgPos||"auto"===mfp.st.fixedBgPos&&!mfp.fixedContentPos)&&mfp.bgOverlay.css({height:_document.height(),position:"absolute"}),mfp.st.enableEscapeKey&&_document.on("keyup.mfp",function(e){27===e.keyCode&&mfp.close()}),_window.on("resize.mfp",function(){mfp.updateSize()}),mfp.st.closeOnContentClick||(_wrapClasses+=" mfp-auto-cursor"),_wrapClasses&&mfp.wrap.addClass(_wrapClasses);var windowHeight=mfp.wH=_window.height(),windowStyles={};if(mfp.fixedContentPos&&mfp._hasScrollBar(windowHeight)){var s=mfp._getScrollbarSize();s&&(windowStyles.marginRight=s)}mfp.fixedContentPos&&(mfp.isIE7?$("body, html").css("overflow","hidden"):windowStyles.overflow="hidden");var classesToadd=mfp.st.mainClass;return mfp.isIE7&&(classesToadd+=" mfp-ie7"),classesToadd&&mfp._addClassToMFP(classesToadd),mfp.updateItemHTML(),_mfpTrigger("BuildControls"),$("html").css(windowStyles),mfp.bgOverlay.add(mfp.wrap).prependTo(mfp.st.prependTo||$(document.body)),mfp._lastFocusedEl=document.activeElement,setTimeout(function(){mfp.content?(mfp._addClassToMFP("mfp-ready"),mfp._setFocus()):mfp.bgOverlay.addClass("mfp-ready"),_document.on("focusin.mfp",mfp._onFocusIn)},16),mfp.isOpen=!0,mfp.updateSize(windowHeight),_mfpTrigger("Open"),data}mfp.updateItemHTML()},close:function(){mfp.isOpen&&(_mfpTrigger("BeforeClose"),mfp.isOpen=!1,mfp.st.removalDelay&&!mfp.isLowIE&&mfp.supportsTransition?(mfp._addClassToMFP("mfp-removing"),setTimeout(function(){mfp._close()},mfp.st.removalDelay)):mfp._close())},_close:function(){_mfpTrigger("Close");var classesToRemove="mfp-removing mfp-ready ";if(mfp.bgOverlay.detach(),mfp.wrap.detach(),mfp.container.empty(),mfp.st.mainClass&&(classesToRemove+=mfp.st.mainClass+" "),mfp._removeClassFromMFP(classesToRemove),mfp.fixedContentPos){var windowStyles={marginRight:""};mfp.isIE7?$("body, html").css("overflow",""):windowStyles.overflow="",$("html").css(windowStyles)}_document.off("keyup.mfp focusin.mfp"),mfp.ev.off(".mfp"),mfp.wrap.attr("class","mfp-wrap").removeAttr("style"),mfp.bgOverlay.attr("class","mfp-bg"),mfp.container.attr("class","mfp-container"),!mfp.st.showCloseBtn||mfp.st.closeBtnInside&&!0!==mfp.currTemplate[mfp.currItem.type]||mfp.currTemplate.closeBtn&&mfp.currTemplate.closeBtn.detach(),mfp._lastFocusedEl&&$(mfp._lastFocusedEl).focus(),mfp.currItem=null,mfp.content=null,mfp.currTemplate=null,mfp.prevHeight=0,_mfpTrigger("AfterClose")},updateSize:function(winHeight){if(mfp.isIOS){var zoomLevel=document.documentElement.clientWidth/window.innerWidth,height=window.innerHeight*zoomLevel;mfp.wrap.css("height",height),mfp.wH=height}else mfp.wH=winHeight||_window.height();mfp.fixedContentPos||mfp.wrap.css("height",mfp.wH),_mfpTrigger("Resize")},updateItemHTML:function(){var item=mfp.items[mfp.index];mfp.contentContainer.detach(),mfp.content&&mfp.content.detach(),item.parsed||(item=mfp.parseEl(mfp.index));var type=item.type;if(_mfpTrigger("BeforeChange",[mfp.currItem?mfp.currItem.type:"",type]),mfp.currItem=item,!mfp.currTemplate[type]){var markup=!!mfp.st[type]&&mfp.st[type].markup;_mfpTrigger("FirstMarkupParse",markup),mfp.currTemplate[type]=!markup||$(markup)}_prevContentType&&_prevContentType!==item.type&&mfp.container.removeClass("mfp-"+_prevContentType+"-holder");var newContent=mfp["get"+type.charAt(0).toUpperCase()+type.slice(1)](item,mfp.currTemplate[type]);mfp.appendContent(newContent,type),item.preloaded=!0,_mfpTrigger("Change",item),_prevContentType=item.type,mfp.container.prepend(mfp.contentContainer),_mfpTrigger("AfterChange")},appendContent:function(newContent,type){mfp.content=newContent,newContent?mfp.st.showCloseBtn&&mfp.st.closeBtnInside&&!0===mfp.currTemplate[type]?mfp.content.find(".mfp-close").length||mfp.content.append(_getCloseBtn()):mfp.content=newContent:mfp.content="",_mfpTrigger("BeforeAppend"),mfp.container.addClass("mfp-"+type+"-holder"),mfp.contentContainer.append(mfp.content)},parseEl:function(index){var type,item=mfp.items[index];if(item.tagName?item={el:$(item)}:(type=item.type,item={data:item,src:item.src}),item.el){for(var types=mfp.types,i=0;i<types.length;i++)if(item.el.hasClass("mfp-"+types[i])){type=types[i];break}item.src=item.el.attr("data-mfp-src"),item.src||(item.src=item.el.attr("href"))}return item.type=type||mfp.st.type||"inline",item.index=index,item.parsed=!0,mfp.items[index]=item,_mfpTrigger("ElementParse",item),mfp.items[index]},addGroup:function(el,options){var eHandler=function(e){e.mfpEl=this,mfp._openClick(e,el,options)};options||(options={});var eName="click.magnificPopup";options.mainEl=el,options.items?(options.isObj=!0,el.off(eName).on(eName,eHandler)):(options.isObj=!1,options.delegate?el.off(eName).on(eName,options.delegate,eHandler):(options.items=el,el.off(eName).on(eName,eHandler)))},_openClick:function(e,el,options){if((void 0!==options.midClick?options.midClick:$.magnificPopup.defaults.midClick)||2!==e.which&&!e.ctrlKey&&!e.metaKey){var disableOn=void 0!==options.disableOn?options.disableOn:$.magnificPopup.defaults.disableOn;if(disableOn)if($.isFunction(disableOn)){if(!disableOn.call(mfp))return!0}else if(_window.width()<disableOn)return!0;e.type&&(e.preventDefault(),mfp.isOpen&&e.stopPropagation()),options.el=$(e.mfpEl),options.delegate&&(options.items=el.find(options.delegate)),mfp.open(options)}},updateStatus:function(status,text){if(mfp.preloader){_prevStatus!==status&&mfp.container.removeClass("mfp-s-"+_prevStatus),text||"loading"!==status||(text=mfp.st.tLoading);var data={status:status,text:text};_mfpTrigger("UpdateStatus",data),status=data.status,text=data.text,mfp.preloader.html(text),mfp.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),mfp.container.addClass("mfp-s-"+status),_prevStatus=status}},_checkIfClose:function(target){if(!$(target).hasClass("mfp-prevent-close")){var closeOnContent=mfp.st.closeOnContentClick,closeOnBg=mfp.st.closeOnBgClick;if(closeOnContent&&closeOnBg)return!0;if(!mfp.content||$(target).hasClass("mfp-close")||mfp.preloader&&target===mfp.preloader[0])return!0;if(target===mfp.content[0]||$.contains(mfp.content[0],target)){if(closeOnContent)return!0}else if(closeOnBg&&$.contains(document,target))return!0;return!1}},_addClassToMFP:function(cName){mfp.bgOverlay.addClass(cName),mfp.wrap.addClass(cName)},_removeClassFromMFP:function(cName){this.bgOverlay.removeClass(cName),mfp.wrap.removeClass(cName)},_hasScrollBar:function(winHeight){return(mfp.isIE7?_document.height():document.body.scrollHeight)>(winHeight||_window.height())},_setFocus:function(){(mfp.st.focus?mfp.content.find(mfp.st.focus).eq(0):mfp.wrap).focus()},_onFocusIn:function(e){if(e.target!==mfp.wrap[0]&&!$.contains(mfp.wrap[0],e.target))return mfp._setFocus(),!1},_parseMarkup:function(template,values,item){var arr;item.data&&(values=$.extend(item.data,values)),_mfpTrigger("MarkupParse",[template,values,item]),$.each(values,function(key,value){if(void 0===value||!1===value)return!0;if((arr=key.split("_")).length>1){var el=template.find(".mfp-"+arr[0]);if(el.length>0){var attr=arr[1];"replaceWith"===attr?el[0]!==value[0]&&el.replaceWith(value):"img"===attr?el.is("img")?el.attr("src",value):el.replaceWith('<img src="'+value+'" class="'+el.attr("class")+'" />'):el.attr(arr[1],value)}}else template.find(".mfp-"+key).html(value)})},_getScrollbarSize:function(){if(void 0===mfp.scrollbarSize){var scrollDiv=document.createElement("div");scrollDiv.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(scrollDiv),mfp.scrollbarSize=scrollDiv.offsetWidth-scrollDiv.clientWidth,document.body.removeChild(scrollDiv)}return mfp.scrollbarSize}},$.magnificPopup={instance:null,proto:MagnificPopup.prototype,modules:[],open:function(options,index){return _checkInstance(),(options=options?$.extend(!0,{},options):{}).isObj=!0,options.index=index||0,this.instance.open(options)},close:function(){return $.magnificPopup.instance&&$.magnificPopup.instance.close()},registerModule:function(name,module){module.options&&($.magnificPopup.defaults[name]=module.options),$.extend(this.proto,module.proto),this.modules.push(name)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},$.fn.magnificPopup=function(options){_checkInstance();var jqEl=$(this);if("string"==typeof options)if("open"===options){var items,itemOpts=_isJQ?jqEl.data("magnificPopup"):jqEl[0].magnificPopup,index=parseInt(arguments[1],10)||0;itemOpts.items?items=itemOpts.items[index]:(items=jqEl,itemOpts.delegate&&(items=items.find(itemOpts.delegate)),items=items.eq(index)),mfp._openClick({mfpEl:items},jqEl,itemOpts)}else mfp.isOpen&&mfp[options].apply(mfp,Array.prototype.slice.call(arguments,1));else options=$.extend(!0,{},options),_isJQ?jqEl.data("magnificPopup",options):jqEl[0].magnificPopup=options,mfp.addGroup(jqEl,options);return jqEl};var _hiddenClass,_inlinePlaceholder,_lastInlineElement,_putInlineElementsBack=function(){_lastInlineElement&&(_inlinePlaceholder.after(_lastInlineElement.addClass(_hiddenClass)).detach(),_lastInlineElement=null)};$.magnificPopup.registerModule("inline",{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){mfp.types.push("inline"),_mfpOn("Close.inline",function(){_putInlineElementsBack()})},getInline:function(item,template){if(_putInlineElementsBack(),item.src){var inlineSt=mfp.st.inline,el=$(item.src);if(el.length){var parent=el[0].parentNode;parent&&parent.tagName&&(_inlinePlaceholder||(_hiddenClass=inlineSt.hiddenClass,_inlinePlaceholder=_getEl(_hiddenClass),_hiddenClass="mfp-"+_hiddenClass),_lastInlineElement=el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass)),mfp.updateStatus("ready")}else mfp.updateStatus("error",inlineSt.tNotFound),el=$("<div>");return item.inlineElement=el,el}return mfp.updateStatus("ready"),mfp._parseMarkup(template,{},item),template}}});var _ajaxCur,_removeAjaxCursor=function(){_ajaxCur&&$(document.body).removeClass(_ajaxCur)},_destroyAjaxRequest=function(){_removeAjaxCursor(),mfp.req&&mfp.req.abort()};$.magnificPopup.registerModule("ajax",{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){mfp.types.push("ajax"),_ajaxCur=mfp.st.ajax.cursor,_mfpOn("Close.ajax",_destroyAjaxRequest),_mfpOn("BeforeChange.ajax",_destroyAjaxRequest)},getAjax:function(item){_ajaxCur&&$(document.body).addClass(_ajaxCur),mfp.updateStatus("loading");var opts=$.extend({url:item.src,success:function(data,textStatus,jqXHR){var temp={data:data,xhr:jqXHR};_mfpTrigger("ParseAjax",temp),mfp.appendContent($(temp.data),"ajax"),item.finished=!0,_removeAjaxCursor(),mfp._setFocus(),setTimeout(function(){mfp.wrap.addClass("mfp-ready")},16),mfp.updateStatus("ready"),_mfpTrigger("AjaxContentAdded")},error:function(){_removeAjaxCursor(),item.finished=item.loadError=!0,mfp.updateStatus("error",mfp.st.ajax.tError.replace("%url%",item.src))}},mfp.st.ajax.settings);return mfp.req=$.ajax(opts),""}}});var _imgInterval,_getTitle=function(item){if(item.data&&void 0!==item.data.title)return item.data.title;var src=mfp.st.image.titleSrc;if(src){if($.isFunction(src))return src.call(mfp,item);if(item.el)return item.el.attr(src)||""}return""};$.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var imgSt=mfp.st.image,ns=".image";mfp.types.push("image"),_mfpOn("Open"+ns,function(){"image"===mfp.currItem.type&&imgSt.cursor&&$(document.body).addClass(imgSt.cursor)}),_mfpOn("Close"+ns,function(){imgSt.cursor&&$(document.body).removeClass(imgSt.cursor),_window.off("resize.mfp")}),_mfpOn("Resize"+ns,mfp.resizeImage),mfp.isLowIE&&_mfpOn("AfterChange",mfp.resizeImage)},resizeImage:function(){var item=mfp.currItem;if(item&&item.img&&mfp.st.image.verticalFit){var decr=0;mfp.isLowIE&&(decr=parseInt(item.img.css("padding-top"),10)+parseInt(item.img.css("padding-bottom"),10)),item.img.css("max-height",mfp.wH-decr)}},_onImageHasSize:function(item){item.img&&(item.hasSize=!0,_imgInterval&&clearInterval(_imgInterval),item.isCheckingImgSize=!1,_mfpTrigger("ImageHasSize",item),item.imgHidden&&(mfp.content&&mfp.content.removeClass("mfp-loading"),item.imgHidden=!1))},findImageSize:function(item){var counter=0,img=item.img[0],mfpSetInterval=function(delay){_imgInterval&&clearInterval(_imgInterval),_imgInterval=setInterval(function(){img.naturalWidth>0?mfp._onImageHasSize(item):(counter>200&&clearInterval(_imgInterval),3===++counter?mfpSetInterval(10):40===counter?mfpSetInterval(50):100===counter&&mfpSetInterval(500))},delay)};mfpSetInterval(1)},getImage:function(item,template){var guard=0,onLoadComplete=function(){item&&(item.img[0].complete?(item.img.off(".mfploader"),item===mfp.currItem&&(mfp._onImageHasSize(item),mfp.updateStatus("ready")),item.hasSize=!0,item.loaded=!0,_mfpTrigger("ImageLoadComplete")):++guard<200?setTimeout(onLoadComplete,100):onLoadError())},onLoadError=function(){item&&(item.img.off(".mfploader"),item===mfp.currItem&&(mfp._onImageHasSize(item),mfp.updateStatus("error",imgSt.tError.replace("%url%",item.src))),item.hasSize=!0,item.loaded=!0,item.loadError=!0)},imgSt=mfp.st.image,el=template.find(".mfp-img");if(el.length){var img=document.createElement("img");img.className="mfp-img",item.el&&item.el.find("img").length&&(img.alt=item.el.find("img").attr("alt")),item.img=$(img).on("load.mfploader",onLoadComplete).on("error.mfploader",onLoadError),img.src=item.src,el.is("img")&&(item.img=item.img.clone()),(img=item.img[0]).naturalWidth>0?item.hasSize=!0:img.width||(item.hasSize=!1)}return mfp._parseMarkup(template,{title:_getTitle(item),img_replaceWith:item.img},item),mfp.resizeImage(),item.hasSize?(_imgInterval&&clearInterval(_imgInterval),item.loadError?(template.addClass("mfp-loading"),mfp.updateStatus("error",imgSt.tError.replace("%url%",item.src))):(template.removeClass("mfp-loading"),mfp.updateStatus("ready")),template):(mfp.updateStatus("loading"),item.loading=!0,item.hasSize||(item.imgHidden=!0,template.addClass("mfp-loading"),mfp.findImageSize(item)),template)}}});var hasMozTransform;$.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(element){return element.is("img")?element:element.find("img")}},proto:{initZoom:function(){var image,zoomSt=mfp.st.zoom,ns=".zoom";if(zoomSt.enabled&&mfp.supportsTransition){var openTimeout,animatedImg,duration=zoomSt.duration,getElToAnimate=function(image){var newImg=image.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),transition="all "+zoomSt.duration/1e3+"s "+zoomSt.easing,cssObj={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},t="transition";return cssObj["-webkit-"+t]=cssObj["-moz-"+t]=cssObj["-o-"+t]=cssObj[t]=transition,newImg.css(cssObj),newImg},showMainContent=function(){mfp.content.css("visibility","visible")};_mfpOn("BuildControls"+ns,function(){if(mfp._allowZoom()){if(clearTimeout(openTimeout),mfp.content.css("visibility","hidden"),!(image=mfp._getItemToZoom()))return void showMainContent();(animatedImg=getElToAnimate(image)).css(mfp._getOffset()),mfp.wrap.append(animatedImg),openTimeout=setTimeout(function(){animatedImg.css(mfp._getOffset(!0)),openTimeout=setTimeout(function(){showMainContent(),setTimeout(function(){animatedImg.remove(),image=animatedImg=null,_mfpTrigger("ZoomAnimationEnded")},16)},duration)},16)}}),_mfpOn("BeforeClose"+ns,function(){if(mfp._allowZoom()){if(clearTimeout(openTimeout),mfp.st.removalDelay=duration,!image){if(!(image=mfp._getItemToZoom()))return;animatedImg=getElToAnimate(image)}animatedImg.css(mfp._getOffset(!0)),mfp.wrap.append(animatedImg),mfp.content.css("visibility","hidden"),setTimeout(function(){animatedImg.css(mfp._getOffset())},16)}}),_mfpOn("Close"+ns,function(){mfp._allowZoom()&&(showMainContent(),animatedImg&&animatedImg.remove(),image=null)})}},_allowZoom:function(){return"image"===mfp.currItem.type},_getItemToZoom:function(){return!!mfp.currItem.hasSize&&mfp.currItem.img},_getOffset:function(isLarge){var el,offset=(el=isLarge?mfp.currItem.img:mfp.st.zoom.opener(mfp.currItem.el||mfp.currItem)).offset(),paddingTop=parseInt(el.css("padding-top"),10),paddingBottom=parseInt(el.css("padding-bottom"),10);offset.top-=$(window).scrollTop()-paddingTop;var obj={width:el.width(),height:(_isJQ?el.innerHeight():el[0].offsetHeight)-paddingBottom-paddingTop};return void 0===hasMozTransform&&(hasMozTransform=void 0!==document.createElement("p").style.MozTransform),hasMozTransform?obj["-moz-transform"]=obj.transform="translate("+offset.left+"px,"+offset.top+"px)":(obj.left=offset.left,obj.top=offset.top),obj}}});var _fixIframeBugs=function(isShowing){if(mfp.currTemplate.iframe){var el=mfp.currTemplate.iframe.find("iframe");el.length&&(isShowing||(el[0].src="//about:blank"),mfp.isIE8&&el.css("display",isShowing?"block":"none"))}};$.magnificPopup.registerModule("iframe",{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){mfp.types.push("iframe"),_mfpOn("BeforeChange",function(e,prevType,newType){prevType!==newType&&("iframe"===prevType?_fixIframeBugs():"iframe"===newType&&_fixIframeBugs(!0))}),_mfpOn("Close.iframe",function(){_fixIframeBugs()})},getIframe:function(item,template){var embedSrc=item.src,iframeSt=mfp.st.iframe;$.each(iframeSt.patterns,function(){if(embedSrc.indexOf(this.index)>-1)return this.id&&(embedSrc="string"==typeof this.id?embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length,embedSrc.length):this.id.call(this,embedSrc)),embedSrc=this.src.replace("%id%",embedSrc),!1});var dataObj={};return iframeSt.srcAction&&(dataObj[iframeSt.srcAction]=embedSrc),mfp._parseMarkup(template,dataObj,item),mfp.updateStatus("ready"),template}}});var _getLoopedId=function(index){var numSlides=mfp.items.length;return index>numSlides-1?index-numSlides:index<0?numSlides+index:index},_replaceCurrTotal=function(text,curr,total){return text.replace(/%curr%/gi,curr+1).replace(/%total%/gi,total)};$.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var gSt=mfp.st.gallery,ns=".mfp-gallery",supportsFastClick=Boolean($.fn.mfpFastClick);if(mfp.direction=!0,!gSt||!gSt.enabled)return!1;_wrapClasses+=" mfp-gallery",_mfpOn("Open"+ns,function(){gSt.navigateByImgClick&&mfp.wrap.on("click"+ns,".mfp-img",function(){if(mfp.items.length>1)return mfp.next(),!1}),_document.on("keydown"+ns,function(e){37===e.keyCode?mfp.prev():39===e.keyCode&&mfp.next()})}),_mfpOn("UpdateStatus"+ns,function(e,data){data.text&&(data.text=_replaceCurrTotal(data.text,mfp.currItem.index,mfp.items.length))}),_mfpOn("MarkupParse"+ns,function(e,element,values,item){var l=mfp.items.length;values.counter=l>1?_replaceCurrTotal(gSt.tCounter,item.index,l):""}),_mfpOn("BuildControls"+ns,function(){if(mfp.items.length>1&&gSt.arrows&&!mfp.arrowLeft){var markup=gSt.arrowMarkup,arrowLeft=mfp.arrowLeft=$(markup.replace(/%title%/gi,gSt.tPrev).replace(/%dir%/gi,"left")).addClass("mfp-prevent-close"),arrowRight=mfp.arrowRight=$(markup.replace(/%title%/gi,gSt.tNext).replace(/%dir%/gi,"right")).addClass("mfp-prevent-close"),eName=supportsFastClick?"mfpFastClick":"click";arrowLeft[eName](function(){mfp.prev()}),arrowRight[eName](function(){mfp.next()}),mfp.isIE7&&(_getEl("b",arrowLeft[0],!1,!0),_getEl("a",arrowLeft[0],!1,!0),_getEl("b",arrowRight[0],!1,!0),_getEl("a",arrowRight[0],!1,!0)),mfp.container.append(arrowLeft.add(arrowRight))}}),_mfpOn("Change"+ns,function(){mfp._preloadTimeout&&clearTimeout(mfp._preloadTimeout),mfp._preloadTimeout=setTimeout(function(){mfp.preloadNearbyImages(),mfp._preloadTimeout=null},16)}),_mfpOn("Close"+ns,function(){_document.off(ns),mfp.wrap.off("click"+ns),mfp.arrowLeft&&supportsFastClick&&mfp.arrowLeft.add(mfp.arrowRight).destroyMfpFastClick(),mfp.arrowRight=mfp.arrowLeft=null})},next:function(){mfp.direction=!0,mfp.index=_getLoopedId(mfp.index+1),mfp.updateItemHTML()},prev:function(){mfp.direction=!1,mfp.index=_getLoopedId(mfp.index-1),mfp.updateItemHTML()},goTo:function(newIndex){mfp.direction=newIndex>=mfp.index,mfp.index=newIndex,mfp.updateItemHTML()},preloadNearbyImages:function(){var i,p=mfp.st.gallery.preload,preloadBefore=Math.min(p[0],mfp.items.length),preloadAfter=Math.min(p[1],mfp.items.length);for(i=1;i<=(mfp.direction?preloadAfter:preloadBefore);i++)mfp._preloadItem(mfp.index+i);for(i=1;i<=(mfp.direction?preloadBefore:preloadAfter);i++)mfp._preloadItem(mfp.index-i)},_preloadItem:function(index){if(index=_getLoopedId(index),!mfp.items[index].preloaded){var item=mfp.items[index];item.parsed||(item=mfp.parseEl(index)),_mfpTrigger("LazyLoad",item),"image"===item.type&&(item.img=$('<img class="mfp-img" />').on("load.mfploader",function(){item.hasSize=!0}).on("error.mfploader",function(){item.hasSize=!0,item.loadError=!0,_mfpTrigger("LazyLoadError",item)}).attr("src",item.src)),item.preloaded=!0}}}});var supportsTouch,unbindTouchMove,ns;$.magnificPopup.registerModule("retina",{options:{replaceSrc:function(item){return item.src.replace(/\.\w+$/,function(m){return"@2x"+m})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var st=mfp.st.retina,ratio=st.ratio;(ratio=isNaN(ratio)?ratio():ratio)>1&&(_mfpOn("ImageHasSize.retina",function(e,item){item.img.css({"max-width":item.img[0].naturalWidth/ratio,width:"100%"})}),_mfpOn("ElementParse.retina",function(e,item){item.src=st.replaceSrc(item,ratio)}))}}}}),supportsTouch="ontouchstart"in window,unbindTouchMove=function(){_window.off("touchmove"+ns+" touchend"+ns)},ns=".mfpFastClick",$.fn.mfpFastClick=function(callback){return $(this).each(function(){var lock,timeout,startX,startY,pointerMoved,point,numPointers,elem=$(this);supportsTouch&&elem.on("touchstart"+ns,function(e){pointerMoved=!1,numPointers=1,point=e.originalEvent?e.originalEvent.touches[0]:e.touches[0],startX=point.clientX,startY=point.clientY,_window.on("touchmove"+ns,function(e){point=e.originalEvent?e.originalEvent.touches:e.touches,numPointers=point.length,point=point[0],(Math.abs(point.clientX-startX)>10||Math.abs(point.clientY-startY)>10)&&(pointerMoved=!0,unbindTouchMove())}).on("touchend"+ns,function(e){unbindTouchMove(),pointerMoved||numPointers>1||(lock=!0,e.preventDefault(),clearTimeout(timeout),timeout=setTimeout(function(){lock=!1},1e3),callback())})}),elem.on("click"+ns,function(){lock||callback()})})},$.fn.destroyMfpFastClick=function(){$(this).off("touchstart"+ns+" click"+ns),supportsTouch&&_window.off("touchmove"+ns+" touchend"+ns)},_checkInstance()}),function(){"use strict";var u="undefined"!=typeof window&&void 0!==window.document?window.document:{},e="undefined"!=typeof module&&module.exports,c=function(){for(var e,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],r=0,l=n.length,t={};r<l;r++)if((e=n[r])&&e[1]in u){for(r=0;r<e.length;r++)t[n[0][r]]=e[r];return t}return!1}(),l={change:c.fullscreenchange,error:c.fullscreenerror},n={request:function(t){return new Promise(function(e,n){var r=function(){this.off("change",r),e()}.bind(this);this.on("change",r);var l=(t=t||u.documentElement)[c.requestFullscreen]();l instanceof Promise&&l.then(r).catch(n)}.bind(this))},exit:function(){return new Promise(function(e,n){if(this.isFullscreen){var r=function(){this.off("change",r),e()}.bind(this);this.on("change",r);var l=u[c.exitFullscreen]();l instanceof Promise&&l.then(r).catch(n)}else e()}.bind(this))},toggle:function(e){return this.isFullscreen?this.exit():this.request(e)},onchange:function(e){this.on("change",e)},onerror:function(e){this.on("error",e)},on:function(e,n){var r=l[e];r&&u.addEventListener(r,n,!1)},off:function(e,n){var r=l[e];r&&u.removeEventListener(r,n,!1)},raw:c};c?(Object.defineProperties(n,{isFullscreen:{get:function(){return Boolean(u[c.fullscreenElement])}},element:{enumerable:!0,get:function(){return u[c.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){return Boolean(u[c.fullscreenEnabled])}}}),e?module.exports=n:window.screenfull=n):e?module.exports={isEnabled:!1}:window.screenfull={isEnabled:!1}}(),$(function(){$(".custom-chart").each(function(){const chart=$(this),correctValue=chart.data("correct"),incorrectValue=chart.data("incorrect"),skippedValue=chart.data("skipped");chart.drawDoughnutChart([{title:"correct",value:correctValue,color:"#78b517"},{title:"incorrect",value:incorrectValue,color:"#e74c3c"},{title:"skipped",value:skippedValue,color:"#dddddd"}])})}),function($,undefined){$.fn.drawDoughnutChart=function(data,options){var $this=this,W=$this.width(),H=$this.height(),centerX=W/2,centerY=H/2,cos=Math.cos,sin=Math.sin,PI=Math.PI,settings=$.extend({segmentShowStroke:!1,segmentStrokeWidth:0,baseColor:"none",baseOffset:0,edgeOffset:0,percentageInnerCutout:80,animation:!1,animationSteps:90,animationEasing:"easeInOutExpo",animateRotate:!0,tipOffsetX:-8,tipOffsetY:-45,tipClass:"doughnutTip",summaryClass:"doughnutSummary",summaryTitle:"TOTAL:",summaryTitleClass:"doughnutSummaryTitle",summaryNumberClass:"doughnutSummaryNumber",beforeDraw:function(){},afterDrawed:function(){},onPathEnter:function(e,data){},onPathLeave:function(e,data){}},options),requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)};settings.beforeDraw.call($this);var arr,$svg=$('<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+" "+H+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),$paths=[],easingFunction={linear:function(t){return t},easeInOutExpo:function(t){var v=t<.5?8*t*t*t*t:1-8*--t*t*t*t;return v>1?1:v}}[settings.animationEasing],doughnutRadius=(arr=[H/2,W/2],Math.min.apply(null,arr)-settings.edgeOffset),cutoutRadius=doughnutRadius*(settings.percentageInnerCutout/100),segmentTotal=0,baseDoughnutRadius=doughnutRadius+settings.baseOffset,baseCutoutRadius=cutoutRadius-settings.baseOffset;$(document.createElementNS("http://www.w3.org/2000/svg","path")).attr({d:getHollowCirclePath(baseDoughnutRadius,baseCutoutRadius),fill:settings.baseColor}).appendTo($svg);var $pathGroup=$(document.createElementNS("http://www.w3.org/2000/svg","g"));$pathGroup.attr({opacity:0}).appendTo($svg);for(var drawData,animFrameAmount,cnt,$tip=$('<div class="'+settings.tipClass+'" />').appendTo("body").hide(),summarySize=($tip.width(),$tip.height(),2*(cutoutRadius-(doughnutRadius-cutoutRadius))),$summary=$('<div class="'+settings.summaryClass+'" />').appendTo($this).css({width:summarySize+"px",height:summarySize+"px","margin-left":-summarySize/2+"px","margin-top":-summarySize/2+"px"}),$summaryNumber=($('<p class="'+settings.summaryTitleClass+'">'+settings.summaryTitle+"</p>").appendTo($summary),$('<p class="'+settings.summaryNumberClass+'"></p>').appendTo($summary).css({opacity:0})),i=0,len=data.length;i<len;i++)segmentTotal+=data[i].value,$paths[i]=$(document.createElementNS("http://www.w3.org/2000/svg","path")).attr({"stroke-width":settings.segmentStrokeWidth,stroke:settings.segmentStrokeColor,fill:data[i].color,"data-order":i}).appendTo($pathGroup).on("mouseenter",pathMouseEnter).on("mouseleave",pathMouseLeave).on("mousemove",pathMouseMove);function getHollowCirclePath(doughnutRadius,cutoutRadius){var startX=centerX+cos(-1.57)*doughnutRadius,startY=centerY+sin(-1.57)*doughnutRadius,endX2=centerX+cos(-1.57)*cutoutRadius,endY2=centerY+sin(-1.57)*cutoutRadius,cmd=["M",startX,startY,"A",doughnutRadius,doughnutRadius,0,1,1,centerX+cos(4.7131)*doughnutRadius,centerY+sin(4.7131)*doughnutRadius,"Z","M",centerX+cos(4.7131)*cutoutRadius,centerY+sin(4.7131)*cutoutRadius,"A",cutoutRadius,cutoutRadius,0,1,0,endX2,endY2,"Z"];return cmd=cmd.join(" ")}function pathMouseEnter(e){var order=$(this).data().order;$tip.text(data[order].title+": "+data[order].value).fadeIn(200),settings.onPathEnter.apply($(this),[e,data])}function pathMouseLeave(e){$tip.hide(),settings.onPathLeave.apply($(this),[e,data])}function pathMouseMove(e){$tip.css({top:e.pageY+settings.tipOffsetY,left:e.pageX-$tip.width()/2+settings.tipOffsetX})}function isNumber(n){return!isNaN(parseFloat(n))&&isFinite(n)}function CapValue(valueToCap,maxValue,minValue){return isNumber(maxValue)&&valueToCap>maxValue?maxValue:isNumber(minValue)&&valueToCap<minValue?minValue:valueToCap}return drawData=function(animationDecimal){var startRadius=-PI/2,rotateAnimation=1;if(settings.animation&&settings.animateRotate&&(rotateAnimation=animationDecimal),function(animationDecimal,segmentTotal){$summaryNumber.css({opacity:animationDecimal}).text((segmentTotal*animationDecimal).toFixed(1))}(animationDecimal,segmentTotal),$pathGroup.attr("opacity",animationDecimal),1===data.length&&4.7122<rotateAnimation*(data[0].value/segmentTotal*(2*PI))+startRadius)$paths[0].attr("d",getHollowCirclePath(doughnutRadius,cutoutRadius));else for(var i=0,len=data.length;i<len;i++){var segmentAngle=rotateAnimation*(data[i].value/segmentTotal*(2*PI)),endRadius=startRadius+segmentAngle,largeArc=(endRadius-startRadius)%(2*PI)>PI?1:0,startX=centerX+cos(startRadius)*doughnutRadius,startY=centerY+sin(startRadius)*doughnutRadius,endX2=centerX+cos(startRadius)*cutoutRadius,endY2=centerY+sin(startRadius)*cutoutRadius,endX=centerX+cos(endRadius)*doughnutRadius,endY=centerY+sin(endRadius)*doughnutRadius,startX2=centerX+cos(endRadius)*cutoutRadius,startY2=centerY+sin(endRadius)*cutoutRadius,cmd=["M",startX,startY,"A",doughnutRadius,doughnutRadius,0,largeArc,1,endX,endY,"L",startX2,startY2,"A",cutoutRadius,cutoutRadius,0,largeArc,0,endX2,endY2,"Z"];$paths[i].attr("d",cmd.join(" ")),startRadius+=segmentAngle}},animFrameAmount=settings.animation?1/CapValue(settings.animationSteps,Number.MAX_VALUE,1):1,cnt=settings.animation?0:1,requestAnimFrame(function(){(function(cnt,drawData){var easeAdjustedAnimationPercent=settings.animation?CapValue(easingFunction(cnt),null,0):1;drawData(easeAdjustedAnimationPercent)})(cnt+=animFrameAmount,drawData),cnt<=1?requestAnimFrame(arguments.callee):settings.afterDrawed.call($this)}),$this}}(jQuery);