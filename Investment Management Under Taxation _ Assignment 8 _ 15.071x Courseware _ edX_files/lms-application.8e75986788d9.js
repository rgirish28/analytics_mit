function getParameterByName(name){var match=RegExp("[?&]"+name+"=([^&]*)").exec(window.location.search);return match?decodeURIComponent(match[1].replace(/\+/g," ")):null}(function($,JSON){"use strict";function initializeBlockLikes(block_class,initializer,element,requestToken){var requestToken=requestToken||$(element).data("request-token");if(requestToken)var selector="."+block_class+'[data-request-token="'+requestToken+'"]';else var selector="."+block_class;return $(element).immediateDescendents(selector).map(function(idx,elem){return initializer(elem,requestToken)}).toArray()}function elementRuntime(element){var $element=$(element),runtime=$element.data("runtime-class"),version=$element.data("runtime-version"),initFnName=$element.data("init");if(runtime&&version&&initFnName)return new window[runtime]["v"+version];if(runtime||version||initFnName){var elementTag=$("<div>").append($element.clone()).html();console.log("Block "+elementTag+" is missing data-runtime, data-runtime-version or data-init, and can't be initialized")}return null}function initArgs(element){var initargs=$(element).children(".xblock-json-init-args").remove().text();return initargs?JSON.parse(initargs):{}}function constructBlock(element,block_args){var block,$element=$(element),runtime=elementRuntime(element);return block_args.unshift(element),block_args.unshift(runtime),runtime?(block=function(){function Block(){return initFn.apply(this,block_args)}var initFn=window[$element.data("init")];return Block.prototype=initFn.prototype,new Block}(),block.runtime=runtime):block={},block.element=element,block.name=$element.data("name"),block.type=$element.data("block-type"),$element.trigger("xblock-initialized"),$element.data("initialized",!0),$element.addClass("xblock-initialized"),block}var XBlock={Runtime:{},initializeBlock:function(element,requestToken){var $element=$(element),requestToken=requestToken||$element.data("request-token"),children=XBlock.initializeXBlocks($element,requestToken);return $element.prop("xblock_children",children),constructBlock(element,[initArgs(element)])},initializeAside:function(element){var blockUsageId=$(element).data("block-id"),blockElement=$(element).siblings('[data-usage-id="'+blockUsageId+'"]')[0];return constructBlock(element,[blockElement,initArgs(element)])},initializeXBlocks:function(element,requestToken){return initializeBlockLikes("xblock",XBlock.initializeBlock,element,requestToken)},initializeXBlockAsides:function(element,requestToken){return initializeBlockLikes("xblock_asides-v1",XBlock.initializeAside,element,requestToken)},initializeBlocks:function(element,requestToken){return XBlock.initializeXBlockAsides(element,requestToken),XBlock.initializeXBlocks(element,requestToken)}};this.XBlock=XBlock}).call(this,$,JSON),function(){this.AjaxPrefix={addAjaxPrefix:function(jQuery,prefix){return jQuery.postWithPrefix=function(url,data,callback,type){return $.post(""+prefix()+url,data,callback,type)},jQuery.getWithPrefix=function(url,data,callback,type){return $.get(""+prefix()+url,data,callback,type)},jQuery.ajaxWithPrefix=function(url,settings){return null!=settings?$.ajax(""+prefix()+url,settings):(settings=url,settings.url=""+prefix()+settings.url,$.ajax(settings))}}}}.call(this),function(){jQuery.fn.immediateDescendents=function(selector){return this.children().map(function(){var elem;return elem=jQuery(this),elem.is(selector)?this:elem.immediateDescendents(selector).get()})}}.call(this),function(){XBlock.Runtime.v1=function(){function v1(){var _this=this;this.childMap=function(){return v1.prototype.childMap.apply(_this,arguments)},this.children=function(){return v1.prototype.children.apply(_this,arguments)}}return v1.prototype.children=function(block){return $(block).prop("xblock_children")},v1.prototype.childMap=function(block,childName){var child,_i,_len,_ref;for(_ref=this.children(block),_i=0,_len=_ref.length;_len>_i;_i++)if(child=_ref[_i],child.name===childName)return child},v1.prototype.notify=function(){return void 0},v1}()}.call(this),function(){var XProblemDisplay,XProblemGenerator,XProblemGrader,root;XProblemGenerator=function(){function XProblemGenerator(seed,parameters){this.parameters=null!=parameters?parameters:{},this.random=new MersenneTwister(seed),this.problemState={}}return XProblemGenerator.prototype.generate=function(){return console.error("Abstract method called: XProblemGenerator.generate")},XProblemGenerator}(),XProblemDisplay=function(){function XProblemDisplay(state,submission,evaluation,container,submissionField,parameters){this.state=state,this.submission=submission,this.evaluation=evaluation,this.container=container,this.submissionField=submissionField,this.parameters=null!=parameters?parameters:{}}return XProblemDisplay.prototype.render=function(){return console.error("Abstract method called: XProblemDisplay.render")},XProblemDisplay.prototype.updateSubmission=function(){return this.submissionField.val(JSON.stringify(this.getCurrentSubmission()))},XProblemDisplay.prototype.getCurrentSubmission=function(){return console.error("Abstract method called: XProblemDisplay.getCurrentSubmission")},XProblemDisplay}(),XProblemGrader=function(){function XProblemGrader(submission,problemState,parameters){this.submission=submission,this.problemState=problemState,this.parameters=null!=parameters?parameters:{},this.solution=null,this.evaluation={}}return XProblemGrader.prototype.solve=function(){return console.error("Abstract method called: XProblemGrader.solve")},XProblemGrader.prototype.grade=function(){return console.error("Abstract method called: XProblemGrader.grade")},XProblemGrader}(),root="undefined"!=typeof exports&&null!==exports?exports:this,root.XProblemGenerator=XProblemGenerator,root.XProblemDisplay=XProblemDisplay,root.XProblemGrader=XProblemGrader}.call(this),function(){this.Calculator=function(){function Calculator(){this.hintButton=$("#calculator_hint"),this.hintPopup=$(".help"),this.hintsList=this.hintPopup.find(".hint-item"),this.selectHint($("#"+this.hintPopup.attr("aria-activedescendant"))),$(".calc").click(this.toggle),$("form#calculator").submit(this.calculate).submit(function(e){return e.preventDefault()}),this.hintButton.click($.proxy(this.handleClickOnHintButton,this)),this.hintPopup.click($.proxy(this.handleClickOnHintPopup,this)),this.hintPopup.keydown($.proxy(this.handleKeyDownOnHint,this)),$("#calculator_wrapper").keyup($.proxy(this.handleKeyUpOnHint,this)),this.handleClickOnDocument=$.proxy(this.handleClickOnDocument,this)}return Calculator.prototype.KEY={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40},Calculator.prototype.toggle=function(event){var $calc,$calcWrapper,isExpanded,text;return event.preventDefault(),$calc=$(".calc"),$calcWrapper=$("#calculator_wrapper"),text=gettext("Open Calculator"),isExpanded=!1,$("div.calc-main").toggleClass("open"),$calc.hasClass("closed")?$calcWrapper.find("input, a").attr("tabindex",-1):(text=gettext("Close Calculator"),isExpanded=!0,$calcWrapper.find("input, a,").attr("tabindex",0),setTimeout(function(){return $calcWrapper.find("#calculator_input").focus()},100)),$calc.attr({title:text,"aria-expanded":isExpanded}).find(".utility-control-label").text(text),$calc.toggleClass("closed")},Calculator.prototype.showHint=function(){return this.hintPopup.addClass("shown").attr("aria-hidden",!1),$(document).on("click",this.handleClickOnDocument)},Calculator.prototype.hideHint=function(){return this.hintPopup.removeClass("shown").attr("aria-hidden",!0),$(document).off("click",this.handleClickOnDocument)},Calculator.prototype.selectHint=function(element){return(!element||element&&0===element.length)&&(element=this.hintsList.first()),this.activeHint=element,this.activeHint.focus(),this.hintPopup.attr("aria-activedescendant",element.attr("id"))},Calculator.prototype.prevHint=function(){var prev;return prev=this.activeHint.prev(),0===this.activeHint.index()&&(prev=this.hintsList.last()),this.selectHint(prev)},Calculator.prototype.nextHint=function(){var next;return next=this.activeHint.next(),this.activeHint.index()===this.hintsList.length-1&&(next=this.hintsList.first()),this.selectHint(next)},Calculator.prototype.handleKeyDown=function(e){return e.altKey?!0:e.keyCode===this.KEY.ENTER||e.keyCode===this.KEY.SPACE?(this.hintPopup.hasClass("shown")?this.hideHint():(this.showHint(),this.activeHint.focus()),e.preventDefault(),!1):!0},Calculator.prototype.handleKeyDownOnHint=function(e){if(e.altKey)return!0;switch(e.keyCode){case this.KEY.ESC:return this.hideHint(),this.hintButton.focus(),e.stopPropagation(),!1;case this.KEY.LEFT:case this.KEY.UP:return e.shiftKey?!0:(this.prevHint(),e.stopPropagation(),!1);case this.KEY.RIGHT:case this.KEY.DOWN:return e.shiftKey?!0:(this.nextHint(),e.stopPropagation(),!1)}return!0},Calculator.prototype.handleKeyUpOnHint=function(e){switch(e.keyCode){case this.KEY.TAB:if(this.active_element=document.activeElement,!$(this.active_element).parents().is(this.hintPopup))return this.hideHint()}},Calculator.prototype.handleClickOnDocument=function(){return this.hideHint()},Calculator.prototype.handleClickOnHintButton=function(e){return e.stopPropagation(),this.hintPopup.hasClass("shown")?this.hideHint():(this.showHint(),this.activeHint.focus())},Calculator.prototype.handleClickOnHintPopup=function(e){return e.stopPropagation()},Calculator.prototype.calculate=function(){return $.getWithPrefix("/calculate",{equation:$("#calculator_input").val()},function(data){return $("#calculator_output").val(data.result).focus()})},Calculator}()}.call(this),function(){$(function(){var MathJaxProcessor;return MathJaxProcessor=function(){function MathJaxProcessor(inlineMark,displayMark){this.inlineMark=inlineMark||"$",this.displayMark=displayMark||"$$",this.math=null,this.blocks=null}var CODESPAN,MATHSPLIT;return MATHSPLIT=/(\$\$?|\\(?:begin|end)\{[a-z]*\*?\}|\\[\\{}$]|[{}]|(?:\n\s*)+|@@\d+@@)/i,CODESPAN=/(^|[^\\])(`+)([^\n]*?[^`\n])\2(?!`)/gm,MathJaxProcessor.prototype.processMath=function(start,last,preProcess){var block,i,_i,_ref;for(block=this.blocks.slice(start,last+1).join("").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),MathJax.Hub.Browser.isMSIE&&(block=block.replace(/(%[^\n]*)\n/g,"$1<br/>\n")),i=_i=_ref=start+1;last>=_ref?last>=_i:_i>=last;i=last>=_ref?++_i:--_i)this.blocks[i]="";return this.blocks[start]="@@"+this.math.length+"@@",preProcess&&(block=preProcess(block)),this.math.push(block)},MathJaxProcessor.prototype.removeMath=function(text){var block,braces,current,deTilde,end,hasCodeSpans,last,start,_i,_ref;for(text=text||"",this.math=[],start=end=last=null,braces=0,hasCodeSpans=/`/.test(text),hasCodeSpans?(text=text.replace(/~/g,"~T").replace(CODESPAN,function($0){return $0.replace(/\$/g,"~D")}),deTilde=function(text){return text.replace(/~([TD])/g,function($0,$1){return{T:"~",D:"$"}[$1]})}):deTilde=function(text){return text},this.blocks=_split(text.replace(/\r\n?/g,"\n"),MATHSPLIT),current=_i=1,_ref=this.blocks.length;_ref>_i;current=_i+=2)block=this.blocks[current],"@"===block.charAt(0)?(this.blocks[current]="@@"+this.math.length+"@@",this.math.push(block)):start?block===end?braces?last=current:(this.processMath(start,current,deTilde),start=end=last=null):block.match(/\n.*\n/)?(last&&(current=last,this.processMath(start,current,deTilde)),start=end=last=null,braces=0):"{"===block?++braces:"}"===block&&braces&&--braces:block===this.inlineMark||block===this.displayMark?(start=current,end=block,braces=0):"begin"===block.substr(1,5)&&(start=current,end="\\end"+block.substr(6),braces=0);return last&&(this.processMath(start,last,deTilde),start=end=last=null),deTilde(this.blocks.join(""))},MathJaxProcessor.removeMathWrapper=function(_this){return function(text){return _this.removeMath(text)}},MathJaxProcessor.prototype.replaceMath=function(text){var _this=this;return text=text.replace(/@@(\d+)@@/g,function($0,$1){return _this.math[$1]}),this.math=null,text},MathJaxProcessor.replaceMathWrapper=function(_this){return function(text){return _this.replaceMath(text)}},MathJaxProcessor}(),"undefined"!=typeof Markdown&&null!==Markdown?(Markdown.getMathCompatibleConverter=function(postProcessor){var converter,processor;return postProcessor||(postProcessor=function(text){return text}),converter=Markdown.getSanitizingConverter(),"undefined"!=typeof MathJax&&null!==MathJax&&(processor=new MathJaxProcessor,converter.hooks.chain("preConversion",MathJaxProcessor.removeMathWrapper(processor)),converter.hooks.chain("postConversion",function(text){return postProcessor(MathJaxProcessor.replaceMathWrapper(processor)(text))})),converter},Markdown.makeWmdEditor=function(elem,appended_id,imageUploadUrl,postProcessor){var $elem,$wmdPanel,$wmdPreviewContainer,ajaxFileUpload,converter,delayRenderer,editor,imageUploadHandler,initialText,wmdInputId,_append;return $elem=$(elem),$elem.length?($elem.find(".wmd-panel").length||(initialText=$elem.html(),$elem.empty(),_append=appended_id||"",wmdInputId="wmd-input"+_append,$wmdPreviewContainer=$("<div>").addClass("wmd-preview-container").append($("<div>").addClass("wmd-preview-label").text(gettext("Preview"))).append($("<div>").attr("id","wmd-preview"+_append).addClass("wmd-panel wmd-preview")),$wmdPanel=$("<div>").addClass("wmd-panel").append($("<div>").attr("id","wmd-button-bar"+_append)).append($("<label>").addClass("sr").attr("for",wmdInputId).text(gettext("Post body"))).append($("<textarea>").addClass("wmd-input").attr("id",wmdInputId).html(initialText)).append($wmdPreviewContainer),$elem.append($wmdPanel)),converter=Markdown.getMathCompatibleConverter(postProcessor),ajaxFileUpload=function(imageUploadUrl,input,startUploadHandler){return $("#loading").ajaxStart(function(){return $(this).show()}).ajaxComplete(function(){return $(this).hide()}),$("#upload").ajaxStart(function(){return $(this).hide()}).ajaxComplete(function(){return $(this).show()}),$.ajaxFileUpload({url:imageUploadUrl,secureuri:!1,fileElementId:"file-upload",dataType:"json",success:function(data){var error,fileURL;return fileURL=data.result.file_url,error=data.result.error,""!==error?(alert(error),startUploadHandler&&$("#file-upload").unbind("change").change(startUploadHandler),console.log(error)):$(input).attr("value",fileURL)},error:function(data,status,e){return alert(e),startUploadHandler?$("#file-upload").unbind("change").change(startUploadHandler):void 0}})},imageUploadHandler=function(elem,input){return ajaxFileUpload(imageUploadUrl,input,imageUploadHandler)},editor=new Markdown.Editor(converter,appended_id,null,imageUploadHandler),delayRenderer=new MathJaxDelayRenderer,editor.hooks.chain("onPreviewPush",function(text,previewSet){return delayRenderer.render({text:text,previewSetter:previewSet})}),editor.run(),editor):void console.log("warning: elem for makeWmdEditor doesn't exist")}):void 0})}.call(this),function(){this.FeedbackForm=function(){function FeedbackForm(){$("#feedback_button").click(function(){var data;return data={subject:$("#feedback_subject").val(),message:$("#feedback_message").val(),url:window.location.href},$.postWithPrefix("/send_feedback",data,function(){return $("#feedback_div").html("Feedback submitted. Thank you")},"json")})}return FeedbackForm}()}.call(this),function(){AjaxPrefix.addAjaxPrefix(jQuery,function(){return $("meta[name='path_prefix']").attr("content")}),$(function(){return $.ajaxSetup({headers:{"X-CSRFToken":$.cookie("csrftoken")},dataType:"json"}),window.onTouchBasedDevice=function(){return navigator.userAgent.match(/iPhone|iPod|iPad|Android/i)},onTouchBasedDevice()&&$("body").addClass("touch-based-device"),$("#csrfmiddlewaretoken").attr("value",$.cookie("csrftoken")),new Calculator,new FeedbackForm,$("body").hasClass("courseware")&&Courseware.start(),window.submit_circuit=function(circuit_id){return $("input.schematic").each(function(index,el){return el.schematic.update_value()}),schematic_value($("#schematic_"+circuit_id).attr("value")),$.postWithPrefix("/save_circuit/"+circuit_id,{schematic:schematic_value},function(data){return"success"===data.results?alert("Saved"):void 0})},window.postJSON=function(url,data,callback){return $.postWithPrefix(url,data,callback)},$("#login").click(function(){return $('#login_form input[name="email"]').focus(),!1}),$("#signup").click(function(){return $('#signup-modal input[name="email"]').focus(),!1}),Array.prototype.indexOf?void 0:Array.prototype.indexOf=function(obj,start){var ele,i,_i,_len,_ref;for(null==start&&(start=0),_ref=this.slice(start),i=_i=0,_len=_ref.length;_len>_i;i=++_i)if(ele=_ref[i],ele===obj)return i+start;return-1}})}.call(this),function(){$(function(){var isMPInstalled;return"Microsoft Internet Explorer"===window.navigator.appName?(isMPInstalled=function(){var oMP;try{return oMP=new ActiveXObject("MathPlayer.Factory.1"),!0}catch(e){return!1}},"undefined"==typeof MathJax||null===MathJax||isMPInstalled()||$("#mathjax-accessibility-message").attr("aria-hidden","false"),"undefined"!=typeof MathJax&&null!==MathJax&&$("#mathplayer-browser-message").length>0?$("#mathplayer-browser-message").attr("aria-hidden","false"):$("#mathjax-accessibility-message").attr("aria-hidden","true")):void 0})}.call(this),function(){var getTime;getTime=function(){return(new Date).getTime()},this.MathJaxDelayRenderer=function(){function MathJaxDelayRenderer(params){params=params||{},this.maxDelay=params.maxDelay||this.maxDelay,this.bufferId=params.bufferId||bufferId+numBuffers,numBuffers+=1,this.$buffer=$("<div>").attr("id",this.bufferId).css("display","none").appendTo($("body"))}var bufferId,numBuffers;return MathJaxDelayRenderer.prototype.maxDelay=3e3,MathJaxDelayRenderer.prototype.mathjaxRunning=!1,MathJaxDelayRenderer.prototype.elapsedTime=0,MathJaxDelayRenderer.prototype.mathjaxDelay=0,MathJaxDelayRenderer.prototype.mathjaxTimeout=void 0,bufferId="mathjax_delay_buffer",numBuffers=0,MathJaxDelayRenderer.prototype.render=function(params){var delay,elem,preprocessor,previewSetter,renderer,text,_this=this;return elem=params.element,previewSetter=params.previewSetter,text=params.text,null==text&&(text=$(elem).html()),preprocessor=params.preprocessor,params.delay===!1?(null!=preprocessor&&(text=preprocessor(text)),$(elem).html(text),MathJax.Hub.Queue(["Typeset",MathJax.Hub,$(elem).attr("id")])):(this.mathjaxTimeout&&(window.clearTimeout(this.mathjaxTimeout),this.mathjaxTimeout=void 0),delay=Math.min(this.elapsedTime+this.mathjaxDelay,this.maxDelay),renderer=function(){var curTime,prevTime;if(!_this.mathjaxRunning)return prevTime=getTime(),null!=preprocessor&&(text=preprocessor(text)),_this.$buffer.html(text),curTime=getTime(),_this.elapsedTime=curTime-prevTime,"undefined"!=typeof MathJax&&null!==MathJax?(prevTime=getTime(),_this.mathjaxRunning=!0,MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.$buffer.attr("id")],function(){return _this.mathjaxRunning=!1,curTime=getTime(),_this.mathjaxDelay=curTime-prevTime,previewSetter?previewSetter($(_this.$buffer).html()):$(elem).html($(_this.$buffer).html())})):_this.mathjaxDelay=0},this.mathjaxTimeout=window.setTimeout(renderer,delay))},MathJaxDelayRenderer}()}.call(this),function(){var StudentNotes;StudentNotes=function(){function StudentNotes($,el){var events,_this=this;this.onInitNotes=function(event,uri,storage_url,token){return null==uri&&(uri=null),null==storage_url&&(storage_url=null),null==token&&(token=null),StudentNotes.prototype.onInitNotes.apply(_this,arguments)},this._debug&&console.log("student notes init",arguments,this),$(el).data("notes-instance")||(events={"notes:init":this.onInitNotes},$(el).delegate("*",events),$(el).data("notes-instance",this))}return StudentNotes.prototype._debug=!1,StudentNotes.prototype.targets=[],StudentNotes.prototype.onInitNotes=function(event,uri,storage_url,token){var courseid,found,idDUdiv,idUdiv,options,ova,parts,uri_root;return null==uri&&(uri=null),null==storage_url&&(storage_url=null),null==token&&(token=null),event.stopPropagation(),found=this.targets.some(function(target){return target===event.target}),"http"!==uri.substring(0,4)&&(uri_root=window.location.href.split(/#|\?/).shift()||"",uri=uri_root+uri.substring(1)),parts=window.location.href.split("/"),courseid=parts[4]+"/"+parts[5]+"/"+parts[6],idUdiv=$(event.target).parent().find(".idU")[0],idDUdiv=$(event.target).parent().find(".idDU")[0],idUdiv="undefined"!=typeof idUdiv?idUdiv.innerHTML:"",idDUdiv="undefined"!=typeof idDUdiv?idDUdiv.innerHTML:"",options={optionsAnnotator:{permissions:{user:{id:idUdiv,name:idDUdiv},userString:function(user){return user&&user.name?user.name:user},userId:function(user){return user&&user.id?user.id:user}},auth:{token:token},store:{prefix:storage_url,annotationData:{uri:uri},urls:{create:"/create",read:"/read/:id",update:"/update/:id",destroy:"/delete/:id",search:"/search"},loadFromSearch:{limit:1e4,uri:uri,user:idUdiv}}},optionsVideoJS:{techOrder:["html5","flash","youtube"],customControlsOnMobile:!0},optionsOVA:{posBigNew:"none",NumAnnotations:20},optionsRichText:{tinymce:{selector:"li.annotator-item textarea",plugins:"media image insertdatetime link code",menubar:!1,toolbar_items_size:"small",extended_valid_elements:"iframe[src|frameborder|style|scrolling|class|width|height|name|align|id]",toolbar:"insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media rubric | code "}}},found?(0!==Annotator._instances.length&&$(event.target).annotator("destroy"),ova=new OpenVideoAnnotation.Annotator($(event.target),options)):"annotator-viewer"===event.target.id?ova=new OpenVideoAnnotation.Annotator($(event.target),options):this.targets.push(event.target)},StudentNotes}(),$(document).ready(function($){return new StudentNotes($,this)})}.call(this),function(){}.call(this),function(){var __hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};this.LmsRuntime={},LmsRuntime.v1=function(_super){function v1(){return v1.__super__.constructor.apply(this,arguments)}return __extends(v1,_super),v1.prototype.handlerUrl=function(element,handlerName,suffix,query,thirdparty){var courseId,handlerAuth,uri,usageId;return courseId=$(element).data("course-id"),usageId=$(element).data("usage-id"),handlerAuth=thirdparty?"handler_noauth":"handler",uri=URI("/courses").segment(courseId).segment("xblock").segment(usageId).segment(handlerAuth).segment(handlerName),null!=suffix&&uri.segment(suffix),null!=query&&uri.search(query),uri.toString()},v1}(XBlock.Runtime.v1)}.call(this),function($,undefined){var form_ext;$.form_ext=form_ext={ajax:function(options){return $.ajax(options)},handleRemote:function(element){var method=element.attr("method"),url=element.attr("action"),data=element.serializeArray(),options={type:method||"GET",data:data,dataType:"text json",success:function(data,status,xhr){element.trigger("ajax:success",[data,status,xhr])},complete:function(xhr,status){element.trigger("ajax:complete",[xhr,status])},error:function(xhr,status,error){element.trigger("ajax:error",[xhr,status,error])}};return url&&(options.url=url),form_ext.ajax(options)},CSRFProtection:function(xhr){var token=$.cookie("csrftoken");token&&xhr.setRequestHeader("X-CSRFToken",token)}},$.ajaxPrefilter(function(options,originalOptions,xhr){options.crossDomain||form_ext.CSRFProtection(xhr)}),$(document).delegate("form","submit",function(){var form=$(this),remote=form.data("remote")!==undefined;return remote?(form_ext.handleRemote(form),!1):void 0})}(jQuery),$(document).ready(function(){function catchKeyPress(object,event){var itemToFocusIndex,focusedItem=jQuery(":focus"),numberOfMenuItems=menuItems.length,focusedItemIndex=menuItems.index(focusedItem);32==event.which&&(dropdownMenuToggle.click(),event.preventDefault()),27==event.which&&(dropdownMenuToggle.click(),event.preventDefault()),(38==event.which||9==event.which&&event.shiftKey)&&(0===focusedItemIndex?menuItems.last().focus():(itemToFocusIndex=focusedItemIndex-1,menuItems.get(itemToFocusIndex).focus()),event.preventDefault()),(40==event.which||9==event.which)&&(focusedItemIndex==numberOfMenuItems-1?menuItems.first().focus():(itemToFocusIndex=focusedItemIndex+1,menuItems.get(itemToFocusIndex).focus()),event.preventDefault())}var dropdownMenuToggle=$("a.dropdown"),dropdownMenu=$("ul.dropdown-menu"),menuItems=dropdownMenu.find("a");dropdownMenuToggle.toggle(function(){dropdownMenu.addClass("expanded").find("a").first().focus(),dropdownMenuToggle.addClass("active").attr("aria-expanded","true")},function(){dropdownMenu.removeClass("expanded"),dropdownMenuToggle.removeClass("active").attr("aria-expanded","false").focus()}),dropdownMenuToggle.on("keydown",function(event){32==event.which&&(dropdownMenuToggle.click(),event.preventDefault())}),dropdownMenu.on("keydown",function(event){catchKeyPress($(this),event)})}),function($){$.fn.extend({leanModal:function(options){function close_modal(modal_id,e){$("#lean_overlay").fadeOut(200),$("iframe",modal_id).attr("src",""),$(modal_id).css({display:"none"}),"#modal_clone"==modal_id&&$(modal_id).remove(),e.preventDefault()}var defaults={top:100,overlay:.5,closeButton:null,position:"fixed"};if(0==$("#lean_overlay").length){var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay)}return options=$.extend(defaults,options),this.each(function(){var o=options;$(this).click(function(e){$(".modal").hide();var modal_id=$(this).attr("href");if($(modal_id).hasClass("video-modal")){var modal_clone=$(modal_id).clone(!0,!0);modal_clone.attr("id","modal_clone"),$(modal_id).after(modal_clone),modal_id="#modal_clone"}$("#lean_overlay").click(function(e){close_modal(modal_id,e)}),$(o.closeButton).click(function(e){close_modal(modal_id,e)}),$(o.copyEmailButton).click(function(e){close_modal(modal_id,e)});var modal_width=($(modal_id).outerHeight(),$(modal_id).outerWidth());$("#lean_overlay").css({display:"block",opacity:0}),$("#lean_overlay").fadeTo(200,o.overlay),$("iframe",modal_id).attr("src",$("iframe",modal_id).data("src")),$(modal_id).css($(modal_id).hasClass("email-modal")?{width:"80%",height:"80%",position:o.position,opacity:0,"z-index":11e3,left:"10%",top:"10%"}:{position:o.position,opacity:0,"z-index":11e3,left:"50%","margin-left":-(modal_width/2)+"px",top:o.top+"px"}),$(modal_id).show().fadeTo(200,1),$(modal_id).find(".notice").hide().html("");var notice=$(this).data("notice");void 0!==notice&&($notice=$(modal_id).find(".notice"),$notice.show().html(notice),$notice.find("a[rel*=leanModal]").leanModal({top:120,overlay:1,closeButton:".close-modal",position:"absolute"})),window.scrollTo(0,0),e.preventDefault()})})}}),$(document).ready(function($){$("a[rel*=leanModal]").each(function(){if($(this).leanModal({top:120,overlay:1,closeButton:".close-modal",position:"absolute"}),embed=$($(this).attr("href")).find("iframe"),embed.length>0&&embed.attr("src")){var sep=embed.attr("src").indexOf("?")>0?"&":"?";embed.data("src",embed.attr("src")+sep+"autoplay=1&rel=0"),embed.attr("src","")}})})}(jQuery),$(function(){if($(".filter nav").length>0){var offset=$(".filter nav").offset().top;$(window).scroll(function(){return offset<=window.pageYOffset?$(".filter nav").addClass("fixed-top"):offset>=window.pageYOffset?$(".filter nav").removeClass("fixed-top"):void 0})}}),window.isExternal=function(url){var match=url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);return"string"==typeof match[1]&&match[1].length>0&&match[1].toLowerCase()!==location.protocol?!0:"string"==typeof match[2]&&match[2].length>0&&match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"),"")!==location.host?!0:!1},window.rewriteStaticLinks=function(content,from,to){function replacer(match){return match===from?to:match}if(null===from||null===to)return content;fromRe=from.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");var regex=new RegExp("(https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*))?"+fromRe,"g");return content.replace(regex,replacer)};var focusedElementBeforeModal,accessible_modal=function(trigger,closeButtonId,modalId,mainPageId){var focusableElementsString="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";$(trigger).click(function(){focusedElementBeforeModal=$(trigger),$(mainPageId).attr("aria-hidden","true"),$(modalId).attr("aria-hidden","false");var focusableItems=$(modalId).find("*").filter(focusableElementsString).filter(":visible");focusableItems.attr("tabindex","2"),$(closeButtonId).attr("tabindex","1"),$(closeButtonId).focus();var last;last=0!==focusableItems.length?focusableItems.last():$(closeButtonId),last.on("keydown",function(e){var keyCode=e.keyCode||e.which;e.shiftKey||9!==keyCode||(e.preventDefault(),$(closeButtonId).focus())}),$(closeButtonId).on("keydown",function(e){var keyCode=e.keyCode||e.which;e.shiftKey&&9==keyCode&&(e.preventDefault(),last.focus())}),$("#lean_overlay, "+closeButtonId).click(function(){$(mainPageId).attr("aria-hidden","false"),$(modalId).attr("aria-hidden","true"),focusedElementBeforeModal.focus()}),$(".modal").on("keydown",function(e){var keyCode=e.keyCode||e.which;27===keyCode&&(e.preventDefault(),$(closeButtonId).click())});var initialFocus=!0;$(modalId).find("iframe").on("focus",function(){initialFocus&&($(closeButtonId).focus(),initialFocus=!1)})})};$(".nav-skip").click(function(){var href=$(this).attr("href");href&&$(href).attr("tabIndex",-1).focus()}),$(".nav-skip").keypress(function(e){if(13==e.which){var href=$(this).attr("href");href&&$(href).attr("tabIndex",-1).focus()}}),$(function(){var SRAlert;SRAlert=function(){function SRAlert(){$("body").append('<div id="reader-feedback" class="sr" style="display:none" aria-hidden="false" aria-atomic="true" aria-live="assertive"></div>'),this.el=$("#reader-feedback")}return SRAlert.prototype.clear=function(){return this.el.html(" ")},SRAlert.prototype.readElts=function(elts){var feedback="";return $.each(elts,function(idx,value){return feedback+="<p>"+$(value).html()+"</p>\n"}),this.el.html(feedback)},SRAlert.prototype.readText=function(text){return this.el.text(text)},SRAlert}(),window.SR=new SRAlert}),window.location.origin||(window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")),function(_){var interpolate_ntext=function(singular,plural,count,values){var text=1===count?singular:plural;return _.template(text,values,{interpolate:/\{(.+?)\}/g})};this.interpolate_ntext=interpolate_ntext;var interpolate_text=function(text,values){return _.template(text,values,{interpolate:/\{(.+?)\}/g})};this.interpolate_text=interpolate_text}.call(this,_),function(){"use strict";var Logger=function(){var sendRequest,has,listeners={};return sendRequest=function(data,options){var request=$.ajaxWithPrefix?$.ajaxWithPrefix:$.ajax;return options=$.extend(!0,{url:"/event",type:"POST",data:data,async:!0},options),request(options)},has=function(object,propertyName){return{}.hasOwnProperty.call(object,propertyName)},{log:function(eventType,data,element,requestOptions){var callbacks;return element||(element=null),has(listeners,eventType)&&has(listeners[eventType],element)&&(callbacks=listeners[eventType][element],$.each(callbacks,function(index,callback){try{callback(eventType,data,element)}catch(err){console.error({eventType:eventType,data:data,element:element,error:err})}})),sendRequest({event_type:eventType,event:JSON.stringify(data),page:window.location.href},requestOptions)},listen:function(eventType,element,callback){listeners[eventType]=listeners[eventType]||{},listeners[eventType][element]=listeners[eventType][element]||[],listeners[eventType][element].push(callback)},bind:function(){window.onunload=function(){sendRequest({event_type:"page_close",event:"",page:window.location.href},{type:"GET",async:!1})
}}}}();this.Logger=Logger,this.log_event=Logger.log}.call(this);