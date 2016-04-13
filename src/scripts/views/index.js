
var React = require("react");
var ReactDOM = require("react-dom");

var Util = require("../utils/tool.js");
var Router = require("../utils/router.js");

var Menu = require("antd/lib/menu");
var Icon = require("antd/lib/icon");


//全局导出
window.Syp = {
	util:Util,
	router:Router
}

$(function(){
	var menuItemUrl = {
		"2-1":"/product/list",
		"2-2":"/product/detail"
	}
	init();

	function init(){
		Router.initHistory();
		getMenu();
	}	

	/**
	 * 获取菜单
	 * @return {[type]} [description]
	 */
	function getMenu(){
		// todo ajax
		var menuArr = [
			{
				id:"1",
				name:"概况",
				sub:[]
			},
			{
				id:"2",
				name:"管理",
				sub:[
					{
						id:"2-1",
						name:"产品管理",
						url:"/user/list",
						sub:[]
					},{
						id:"2-2",
						name:"信息点管理",
						sub:[]
					},{
						id:"2-3",
						name:"内容管理",
						sub:[]
					}
				]
			},
			{
				id:"3",
				name:"精准化营销",
				sub:[
					{
						id:"3-1",
						name:"营销管理",
						sub:[]
					},{
						id:"3-2",
						name:"统计分析",
						sub:[]
					}
				]
			},
			{
				id:"4",
				name:"高效推广",
				sub:[
					{
						id:"4-1",
						name:"推广管理",
						sub:[]
					},{
						id:"4-2",
						name:"统计分析",
						sub:[]
					}
				]
			},
			{
				id:"5",
				name:"设置",
				sub:[
					{
						id:"5-1",
						name:"权限设置",
						sub:[]
					},{
						id:"5-2",
						name:"账户充值",
						sub:[]
					}
				]
			}
		];

		renderMenu(menuArr);
	}

	/**
	 * 渲染菜单
	 * @param  {Array} menuArr 菜单项集合
	 * @return {[type]}         [description]
	 */
	function renderMenu(menuArr){
		
		var Slider = React.createClass({
			getInitialState:function(){
				return {
					currentItem:"",
					openItems:[]
				}
			},
			render:function(){
				var subMenus = $.map(menuArr,function(menu){
					//是否含有子项
					if(menu.sub instanceof Array===true && menu.sub.length>0){
						var items = $.map(menu.sub,function(item){
							return (
								<Menu.Item key={item.id}>{item.name}</Menu.Item>
							);
						});
						return (
							<Menu.SubMenu key={menu.id} title={<span><Icon type="mail"/> <span>{menu.name}</span></span>} children={items}>
							</Menu.SubMenu>
						)
					}else{
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
			onChangeOpen:function(sub){
				//仅展开当前选中目录
				this.setState({
					openItems:(sub.open?[sub.key]:[])
				});
			},
			onSelect:function(item){
				Router.gotoUrl(menuItemUrl[item.key]);
			}
		});


		ReactDOM.render(<Slider/>,document.getElementById("sy-menu"));
	}
});




