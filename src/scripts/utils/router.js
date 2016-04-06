var router = (function(){
	"use strict";

	var Path = require("path");
	var ReactDOM = require("react-dom");
	var ViewPath = Path.join("/","./views");


	var _initHistory = require("history/lib/createBrowserHistory");//注册H5 History
	var History = null;

	//-------------
	var homePath = "/common/home";
	var curPath = "";
	var dstPath = "";

	function initHistory(pathname){
		History = _initHistory()||{};
		curPath = pathname||homePath;

		//注册跳转前执行事件
		History.listenBefore(function(transition){
			console.log("listenBefore");
			_unloadPage(transition.pathname);
		});

		//注册跳转后执行事件
		History.listen(function(transition){
			console.log("listen");
			if(!transition.pathname||$.trim(transition.pathname)==="/"){
				gotoUrl(homePath);	
			}else{

				curPath = transition.pathname;
				//跳转指定页面
				_loadPage(curPath);
			}
		});
	}

	/**
	* 跳转指定页面
	* 
	*/
	function gotoUrl(url,queryObj,isReplace){
		var queryString = "";
		if(queryObj!=null && !$.isPlainObject(queryObj)){
			var queryArr = [];
			$.each(queryObj,function(key,val){
				queryArr.push(key+"="+val);
			});
			queryString = "?"+queryArr.join("&");
		}

		History.push({
			pathname:url,
			search:queryString,
			action:isReplace===true?"REPLACE":"PUSH",
			state:{
				url:url,
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
			success:function(html){
				$("#app").html(html);
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