var React = require("react");
var ReactDOM = require("react-dom");
var Antd = require("antd");
var Spin = Antd.Spin;


var Util = {
	config:{
		loadingCount:0
	},
	showLoading:function(){
		ReactDOM.render(<Spin/>,document.getElementById("sy-loading"));
	},
	hideLoading:function(){

	}
	
};


module.exports = Util;