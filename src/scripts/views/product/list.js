var React = require("react");
var ReactDOM = require("react-dom");
var Antd = require("antd");
var Table = Antd.Table;

$(function(){

	init();

	function init(){
		getPdts();	
	}

	/**
	 * 获取产品列表
	 * @return {[type]} [description]
	 */
	function getPdts(){
		// todo ajax
		var pdts = [{
			id:"1",
			name:"达克宁",
			commonName:"硝酸咪康挫散",
			createTime:new Date().getTime(),
			creater:"王花花",
			state:1
		},{
			id:"2",
			name:"息斯敏",
			commonName:"阿司咪挫片",
			createTime:new Date().getTime(),
			creater:"胡毛毛",
			state:1
		},{
			id:"3",
			name:"吗丁啉",
			commonName:"多潘立酮片",
			createTime:new Date().getTime(),
			creater:"何狗狗",
			state:1
		},{
			id:"4",
			name:"派瑞松",
			commonName:"阿斯杀星片",
			createTime:new Date().getTime(),
			creater:"李猫猫",
			state:1
		}];

		renderPdts(pdts);
	}

	/**
	 * 渲染产品列表
	 * @param  {Array} pdts 产品列表数据源
	 * @return {[type]}      [description]
	 */
	function renderPdts(pdts){
		var columns = [{
			title:"产品",
			dataIndex:"name",
			key:"name"
		},{
			title:"通用名",
			dataIndex:"commonName",
			key:"commonName"
		},{
			title:"创建时间",
			dataIndex:"createTime",
			key:"createTime",
			render:function(val){
				console.log(arguments,11);
				return new Date(val).toString();
			}
			// },
			// sort:function(a,b){
			// 	console.log(arguments,11);
			// 	//return a.createTime-b.createTime;
			// }
		},{
			title:"创建人",
			dataIndex:"creater",
			key:"creater"
		},{
			title:"状态",
			dataIndex:"state",
			key:"state"
		}];

		//设置行选中属性
		rowSelection = {
			onChange:function(selectedRowKeys, selectedRows){
				console.log("onChange",arguments);
			},
			onSelect:function(record, selected, selectedRows){
				console.log("onSelect",arguments);
			},
			onSelectAll:function(selected, selectedRows, changeRows){
				console.log("onSelectAll",arguments);
			}
		}

		ReactDOM.render(
			<Table 
			dataSource={pdts} 
			columns={columns} 
			rowKey={function(r){return r.id;}}
			rowSelection={rowSelection}
			pagination={{ pageSize: 10 }}
			bordered />,
			document.getElementById("tb_pdt")
		);
	}


});