$ = require("jquery");
var React = require("react");
var ReactDOM = require("react-dom");

var Router = require("../utils/router.js");

var Antd = require("antd");
var Row = Antd.Row;
var Col = Antd.Col;

console.log("Antd",Antd);

//import "antd/lib/index.css";

$(function(){
	init();

	function init(){
		Router.initHistory();
		renderLayout();
		getMenu();
	}	

	/**
	 * 渲染页面
	 * @return {[type]}
	 */
	function renderLayout(){
		// ReactDOM.render(
		// 	<div className="">
		// 		<Row>
		// 			<Col span="12">.col-12</Col>
		// 			<Col span="12">.col-12</Col>
		// 		</Row>
		// 	</div>,
		// 	document.getElementById("container")
		// )
	}

	function getMenu(){
		// todo ajax
		var menus = [
			{
				id:"1",
				name:"用户管理",
				sub:[
					{
						id:"1-1",
						name:"用户子级",
						sub:[]
					}
				]
			},
			{
				id:"2",
				name:"产品管理",
				sub:[]
			}
		];
	}
})


