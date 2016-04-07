var React = require("react");
var ReactDOM = require("react-dom");
var Antd = require("antd");

var Spin = Antd.Spin;
var Modal = Antd.Modal;


var Util = {
	config:{
		/**
		 * 当前loading数
		 * @type {Number}
		 */
		loadingCount:0
	},
	/**
	 * 显示loading框
	 * @return {[type]} 
	 */
	showLoading:function(){
		if(Util.config.loadingCount<=0){
			ReactDOM.render(
				<div className="sy-loadingwrap">
					<Spin size="large"></Spin>
				</div>,
				document.getElementById("sy-loading")
			);
		}
		Util.config.loadingCount++;
	},
	/**
	 * 隐藏loading框
	 * @return {[type]} 
	 */
	hideLoading:function(){
		var loadingCount = Util.config.loadingCount;
		if(Util.config.loadingCount===1){
			ReactDOM.unmountComponentAtNode(document.getElementById("sy-loading"));
		}
		if(Util.config.loadingCount>0){
			Util.config.loadingCount--;
		}
	},

	/**
	 * 显示提示框
	 * 调用方式Util.showDialog.xxx(content,okCb,cfg);
	 * @param {ReactDOM，String} [content] [弹出内容] 
	 * @param {Function} [okCb] [点击确定是回调函数] 
	 * @param {Object} [cfg] [Modal配置项] 
	 *
	 * Dialog类型：
	 * success:成功
	 * error:失败
	 * info:提示信息
	 * confirm:确认
	 */
	showDialog:(function(){
		var mode = {
			success:{title:"成功"},
			error:{title:"失败"},
			info:{title:"信息"},
			confirm:{title:"确认"}
		}
		var returnModal = {};

		$.each(mode,function(key,val){
			returnModal[key] = function(content,okCb,cfg){
				Modal[key]($.extend(true,{
					title:val.title,
					content:content,
					onOk:typeof okCb==="function"?okCb:$.noop
				},cfg));
			} 
		});
		return returnModal;
	}())
};
module.exports = Util;