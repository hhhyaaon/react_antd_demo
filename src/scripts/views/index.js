
import React from "react";
import ReactDOM from "react-dom";

import _Util from "../utils/tool.js";
import _Router from "../utils/router.js";
import Menu from "antd/lib/menu";
import Icon from "antd/lib/icon";

let Router = new _Router();
let Util = _Util;

window.Syp = {
	util: Util,
	router: Router
}

const menuItemUrl = {
	"2-1": "/product/list",
	"2-2": "/product/detail"
}

init();

function init() {
	Router.initHistory();
	renderMenu();
}


/**
 * 渲染菜单
 * @param  {Array} menuArr 菜单项集合
 * @return {[type]}         [description]
 */
function renderMenu() {

	let Slider = React.createClass({
		getInitialState() {
			return {
				menuArr: [],
				currentItem: "",
				openItems: []
			}
		},
		componentDidMount() {
			const menuArr = [
				{
					id: "1",
					name: "概况",
					sub: []
				},
				{
					id: "2",
					name: "管理",
					sub: [
						{
							id: "2-1",
							name: "产品管理",
							url: "/user/list",
							sub: []
						}, {
							id: "2-2",
							name: "信息点管理",
							sub: []
						}, {
							id: "2-3",
							name: "内容管理",
							sub: []
						}
					]
				},
				{
					id: "3",
					name: "精准化营销",
					sub: [
						{
							id: "3-1",
							name: "营销管理",
							sub: []
						}, {
							id: "3-2",
							name: "统计分析",
							sub: []
						}
					]
				},
				{
					id: "4",
					name: "高效推广",
					sub: [
						{
							id: "4-1",
							name: "推广管理",
							sub: []
						}, {
							id: "4-2",
							name: "统计分析",
							sub: []
						}
					]
				},
				{
					id: "5",
					name: "设置",
					sub: [
						{
							id: "5-1",
							name: "权限设置",
							sub: []
						}, {
							id: "5-2",
							name: "账户充值",
							sub: []
						}
					]
				}
			];
			this.setState({
				menuArr: menuArr
			});
		},
		render() {
			var subMenus = $.map(this.state.menuArr, function (menu) {
				//是否含有子项
				if (menu.sub instanceof Array === true && menu.sub.length > 0) {
					var items = $.map(menu.sub, function (item) {
						return (
							<Menu.Item key={item.id}>{item.name}</Menu.Item>
						);
					});
					return (
						<Menu.SubMenu key={menu.id} title={<span><Icon type="mail"/> <span>{menu.name}</span></span>} children={items}>
						</Menu.SubMenu>
					)
				} else {
					return (
						<Menu.Item key={menu.id} >
							<Icon type="mail"/>
							<span>{menu.name}
							</span>
						</Menu.Item>
					)
				}
			});
			return (
				<Menu
					mode="inline"
					openKeys={this.state.openItems}
					onOpen={this.onChangeOpen}
					onClose={this.onChangeOpen}
					onSelect={this.onSelect}
					onClick={this.onClick}
					>{subMenus}</Menu>
			)
		},
		onChangeOpen(sub) {
			//仅展开当前选中目录
			this.setState({
				openItems: (sub.open ? [sub.key] : [])
			});
		},
		onSelect(item) {
			Router.gotoUrl(menuItemUrl[item.key]);
		}
	});


	ReactDOM.render(<Slider/>, document.getElementById("sy-menu"));
}



