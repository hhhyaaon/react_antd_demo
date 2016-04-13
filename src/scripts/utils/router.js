var router = (function(){
	var Path = require("path");
	var ReactDOM = require("react-dom");
	var _History = require("history/lib/createBrowserHistory");//注册H5 History
	var Util = require("./tool.js");

	var ViewPath = Path.join("/","./view");

	var History = null;
	//-------------
	var homePath = "/common/home";
	var curPath = "";
	var dstPath = "";

	function initHistory(pathname){
		History = _History.createHistory()||{};

		console.warn("_History",_History);

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
				dstPath = homePath;	
			}else{
				dstPath = pathname;
			}
			//跳转指定页面
			_loadPage(dstPath);
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
				queryArr.push(key+"="+ encodeURIComponent(val));
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

	/**
	 * 获取url查询参数
	 * @param  {object} url查询参数对象
	 * @return {[type]}     [description]
	 */
	function getQuery(url){
		url = url == null ? window.location.href : url;
        var search = url.substring(url.lastIndexOf("?") + 1);
        var obj = {};
        var reg = /([^?&=]+)=([^?&=#]*)/g;

        search.replace(reg, function (rs, $1, $2) {
            var name = decodeURIComponent($1);
            var val = decodeURIComponent($2);

            //类型装换
            if ($.trim(val).toLowerCase() === true.toString()) {
                val = true;
            }else if($.trim(val).toLowerCase() === false.toString()){
				val = false;
            } else if ($.isNumeric(val)) {
                val = (Number(val));
            } else {
                val = String(val);
            }

            obj[name] = val;

            return rs;
        })

        return obj;
	}

	function getLocation(){
		var url = window.loacation;
	}

	/**
	 * 加载子页面
	 * @param  {string} url 目标子页面路径
	 * @return {[type]}     [description]
	 */
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
				dstPath = "";
				curPath = url;
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