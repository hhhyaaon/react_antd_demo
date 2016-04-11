var router = (function(){
	"use strict";

	var Path = require("path");
	var ReactDOM = require("react-dom");
	var _initHistory = require("history/lib/createBrowserHistory");//注册H5 History
	var Util = require("./tool.js");

	var ViewPath = Path.join("/","./view");

	var History = null;
	//-------------
	var homePath = "/common/home";
	var curPath = "";
	var dstPath = "";

	function initHistory(pathname){
		History = _initHistory()||{};
		curPath = pathname||homePath;

		console.warn(History);

		//注册跳转前执行事件
		History.listenBefore(function(transition){
			console.log("listenBefore",transition);
			_unloadPage(transition.pathname);
		});

		//注册跳转后执行事件
		History.listen(function(transition){
			console.log("listen",transition);
			var pathname = transition.state&&transition.state.pathname;
			if(!pathname||$.trim(pathname)==="/"){
				gotoUrl(homePath,{a:11});	
			}else{
				//跳转指定页面
				_loadPage(pathname);
			}
		});
		
	}

	/**
	* 跳转指定页面
	*/
	function gotoUrl(url,queryObj,isReplace){
		var queryString = "";

		if(queryObj!=null && $.isPlainObject(queryObj)){
			var queryArr = [];
			$.each(queryObj,function(key,val){
				queryArr.push(key+"="+val);
			});
			queryString = "?"+queryArr.join("&");
		}

		History.push({
			pathname:"/?"+url+queryString,
			action:isReplace===true?"REPLACE":"PUSH",
			state:{
				pathname:url,
				query:queryObj,
				search:queryString
			}        
		});	
	}

	function getQuery(){
		//History.
	}

	function _loadPage(url){
		if(url==null || url.length===0) return;
		$.ajax({
			type:"get",
			url:Path.join(ViewPath,url)+".html",
			dateType:"html",
			beforeSend:function(){
				Util.showLoading();
			},
			success:function(html){
				Util.hideLoading();
				$("#sy-ctn").html(html);
			},
			error:function(){
				console.error("获取页面失败");
			}
		});

	}

	function _unloadPage(pathname){
		//todo
	}

	return {
		initHistory:initHistory,
		gotoUrl:gotoUrl,
		getQuery:getQuery
	}


}());

module.exports = router;