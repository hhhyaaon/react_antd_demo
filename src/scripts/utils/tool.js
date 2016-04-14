var React = require("react");
var ReactDOM = require("react-dom");

var Spin = require("antd/lib/spin");
var Modal = require("antd/lib/modal");

var Util = {

	/**
	 * 列表页每页显示条数
	 * @type {Number}
	 */
    listPageSize: 8,
	/**
	* 当前loading数
	* @type {Number}
	*/
    loadingCount: 0,


	/**
	 * 显示loading框
	 * @return {[type]} 
	 */
    showLoading: function() {
        if (Util.loadingCount <= 0) {
            ReactDOM.render(
                <div className="sy-loadingwrap">
                    <Spin size="large"></Spin>
                </div>,
                document.getElementById("sy-loading")
            );
        }
        Util.loadingCount++;
    },
	/**
	 * 隐藏loading框
	 * @return {[type]} 
	 */
    hideLoading: function() {
        Util.loadingCount--;
        if (Util.loadingCount === 0) {
            ReactDOM.unmountComponentAtNode(document.getElementById("sy-loading"));
        }

    },
    /**
	 * 删除所有loading框
	 * @return {[type]} 
	 */
    closeLoading: function() {
        Util.loadingCount = 0;
        Util.hideLoading();
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
    showDialog: (function() {
        var mode = {
            success: { title: "成功" },
            error: { title: "失败" },
            info: { title: "信息" },
            confirm: { title: "确认" }
        }
        var returnModal = {};

        $.each(mode, function(key, val) {
            returnModal[key] = function(content, okCb, cfg) {
                Modal[key]($.extend(true, {
                    title: val.title,
                    content: content,
                    onOk: typeof okCb === "function" ? okCb : $.noop
                }, cfg));
            }
        });
        return returnModal;
    } ()),

    /**
	 * 删除所有dialog
	 * @return {[type]} 
	 */
    closeDialog: function() {
        $.each($(".ant-modal-container"), function(i, ele) {
            ReactDOM.unmountComponentAtNode(ele);
        });

    }
};

$.extend(true, Util, {
	/**
	 * antd 组件config
	 * @type {Object}
	 */
    config: {
		/**
		 * 分页插件config
		 * @type {Object}
		 */
        pagination: {
            size: "small",
            total: 0,
            pageSize: Util.listPageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: $.noop
        }
    }
})


module.exports = Util;