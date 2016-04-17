import _Path from "path";
import _Util from "./tool.js";
import _CreateHistory from "history/lib/createBrowserHistory";

export default class Router {
    constructor() {
        this._viewPath = _Path.join("/", "./view");
        this._homePath = "/common/home";

        this._History = null;
        this.curPath = "";
        this.dstPath = "";
        //页面卸载前响应事件
        this._beforePageUnloadCb = $.noop;
    }


	/**
	 * 注册路由
	 * 
	 */
    initHistory() {
        let _this = this;
        this._History = _CreateHistory() || {};
        //注册跳转前执行事件
        this._History.listenBefore(function (transition) {
            let pathname = _this.getLocation().pathname;
            _this.dstPath = (transition.state&&transition.state.pathname)||_this._homePath;
            return _this._beforePageUnload();
        });

        //注册跳转后执行事件
        this._History.listen(function (transition) {
            let pathname = _this.getLocation().pathname;
            _this.dstPath = !pathname || $.trim(pathname) === "/" ? _this._homePath : pathname;
            //跳转指定页面
            _this._loadPage(_this.dstPath);
        });
    }

    /**
	 * 跳转指定页面
	 * 
	 * @param pathname 指定页面pathname
	 * @param queryObj 查询参数对象
	 * @param isReplace 是否使用replaceState，默认状态下是pushState，若设置为true，则前一页的历史记录不会被保存
	 */
    gotoUrl(pathname, queryObj, isReplace) {
        var queryString = "";

        if (queryObj != null && $.isPlainObject(queryObj)) {
            var queryArr = [];
            $.each(queryObj, function (key, val) {
                queryArr.push(key + "=" + encodeURIComponent(val));
            });
            queryString = "?" + queryArr.join("&");
        }

        this._History[isReplace === true ? "replace" : "push"]({
            pathname: "/?" + (pathname || "/") + queryString,
            state: {
                pathname: pathname,
                query: queryObj,
                search: queryString
            }
        });
    }

    /**
	 * 获取查询参数对象
	 * 
	 * @param href 截取查询参数的完整url路径
	 * @returns (description)
	 */
    getQuery() {
        return this.getLocation().query;
    }

    /**
	 * 获取Location信息
	 * 
	 * @returns Location对象（pathname,query,search）
	 */
    getLocation() {
        let href = window.location.href;
        //pathname
        let pathnameMatch = window.location.search.match(/(?:\?)([/\w]*)(?:\?|$)/);
        let pathname = pathnameMatch && pathnameMatch.length > 1 ? pathnameMatch[1] : "";
        //search
        let search = href.substring(href.lastIndexOf("?")); //根路径时有问题

        //query
        let query = {};
        search.replace(/([^?&=]+)=([^?&=#]*)/g, function (rs, $1, $2) {
            let name = decodeURIComponent($1);
            let val = decodeURIComponent($2);

            //类型装换
            if ($.trim(val).toLowerCase() === true.toString()) {
                val = true;
            } else if ($.trim(val).toLowerCase() === false.toString()) {
                val = false;
            } else if ($.isNumeric(val)) {
                val = (Number(val));
            } else {
                val = String(val);
            }

            query[name] = val;

            return rs;
        });

        return {
            pathname: pathname,
            query: query,
            search: search
        }
    }


    /**
     * 刷新子页面
     * 
     * @returns (description)
     */
    reload() {
        return this._loadPage(this.curPath);
    }

    beforePageUnload(cb) {
        if (typeof cb === "function") {
            this._beforePageUnloadCb = cb;
        }

    }


	/**
	 * 根据pathname加载指定页面
	 * 
	 * @param pathname 即将跳转的pathname
	 * @returns 跳转后延迟对象
	 */
    _loadPage(pathname) {
        if (pathname == null || pathname.length === 0) return;
        let _this = this;
        return $.ajax({
            type: "get",
            url: _Path.join(_this._viewPath, pathname) + ".html",
            dateType: "html",
            beforeSend: function () {
                _Util.showLoading();
            },
            success: function (resp) {
                _Util.hideLoading();
                // todo 解析resp

                if (_this._beforePageLoad(resp) != false) {
                    $("#sy-ctn").html(resp);
                    _this.curPath = _this.dstPath;
                    //dstPath = "";
                }
            },
            error: function () {
                console.error("获取页面失败");
            }
        });
    }

    /**
     * 根据pathname卸载页面
     * 
     * @param pathname 要卸载的页面pathname
     * @returns (description)
     */
    _unloadPage(pathname) {
        //卸载当前页面组件
        //当页面中包含未加载完毕的项，不可卸载
        if (_Util.loadingCount > 0) return false;
        _Util.closeDialog();
    }


    /**
     * 页面加载前执行事件
     * 
     * @param html 要加载的页面内容
     * @returns return false,阻止页面加载
     */
    _beforePageLoad(html) {
        console.log("[_beforePageLoad] 上一页:", this.curPath, "当前页面:", this.dstPath);
        //todo 全局初始化页面
    }


    /**
     * 页面卸载前执行事件
     * 
     * @returns return false，阻止页面卸载
     */
    _beforePageUnload() {
        console.log("[_beforePageUnload] 当前页面:", this.curPath, "目标页面:", this.dstPath);
        if (this._unloadPage() === false) return false;
        //执行用户定义页面卸载事件,若事件return false 阻止卸载
        if (typeof this._beforePageUnloadCb === "function" && this._beforePageUnloadCb.call(this, this.dstPath, this.curPath) === false) {
            return false
        }else{
            this._beforePageUnloadCb = $.noop;
        }
    }

}