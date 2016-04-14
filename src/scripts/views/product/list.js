var React = require("react");
var ReactDOM = require("react-dom");
var Table = require("antd/lib/table");
var Row = require("antd/lib/row");
var Col = require("antd/lib/col");
var Button = require("antd/lib/button");
var ButtonGrup = Button.Group;


$(function() {

    var url = {
        ProductEdit: "/product/edit",
        ProductDetail: "/product/detail"
    }

    var SearchBar = null;

    init();


    function init() {
        renderPage();
        getPdts();
        //测试页面卸载
        console.log("router", Syp.router);
        Syp.router.beforePageUnload(function(dst, cur) {
            console.warn("目标页面：", dst, "当前页面：", cur);
            // return false;
        });
    }


    function renderPage() {
        SearchBar = ReactDOM.render(
            <div>
                <Row>
                    <Col span="18">
                        <Button
                            type="primary"
                            size="large"
                            onClick={function() { Syp.router.gotoUrl(url.ProductEdit) } }>新增
                        </Button>
                        <ButtonGrup size="large">
                            <Button type="ghost">启用</Button>
                            <Button type="ghost">禁用</Button>
                        </ButtonGrup>
                    </Col>
                    <Col span="6">

                    </Col>
                </Row>
            </div>,
            document.getElementById("btns_wrapper"));
    }


	/**
	 * 获取产品列表
	 * @return {[type]} [description]
	 */
    function getPdts() {
        // todo ajax
        var pdts = [{
            id: "1",
            name: "达克宁",
            commonName: "硝酸咪康挫散",
            createTime: 1460360969953,
            creater: "王花花",
            state: 1
        }, {
                id: "2",
                name: "息斯敏",
                commonName: "阿司咪挫片",
                createTime: 1424360969953,
                creater: "胡毛毛",
                state: 2
            }, {
                id: "3",
                name: "吗丁啉",
                commonName: "多潘立酮片",
                createTime: 1460360935953,
                creater: "何狗狗",
                state: 2
            }, {
                id: "4",
                name: "派瑞松",
                commonName: "阿斯杀星片",
                createTime: 1460360977953,
                creater: "李猫猫",
                state: 1
            }, {
                id: "5",
                name: "派瑞松1",
                commonName: "阿斯杀星片",
                createTime: 1460360977953,
                creater: "李猫猫",
                state: 1
            }, {
                id: "6",
                name: "派瑞松2",
                commonName: "阿斯杀星片",
                createTime: 1460360977953,
                creater: "李猫猫",
                state: 1
            }, {
                id: "7",
                name: "派瑞松",
                commonName: "阿斯杀星片",
                createTime: 1460360447953,
                creater: "李猫猫",
                state: 2
            }, {
                id: "8",
                name: "派瑞asd松",
                commonName: "阿斯杀星片",
                createTime: 1460362277953,
                creater: "李猫猫",
                state: 1
            }, {
                id: "9",
                name: "派as瑞松",
                commonName: "阿斯杀星片",
                createTime: 1477360977953,
                creater: "李猫猫",
                state: 2
            }, {
                id: "10",
                name: "派瑞dd松",
                commonName: "阿斯杀星片",
                createTime: 1460990977953,
                creater: "李猫猫",
                state: 1
            }];

        renderPdts(pdts);
    }

	/**
	 * 渲染产品列表
	 * @param  {Array} pdts 产品列表数据源
	 * @return {[type]}      [description]
	 */
    function renderPdts(pdts) {
        var columns = [{
            title: "产品",
            dataIndex: "name",
            key: "name"
        }, {
                title: "通用名",
                dataIndex: "commonName",
                key: "commonName"
            }, {
                title: "创建时间",
                dataIndex: "createTime",
                key: "createTime",
                render: function(val) {
                    return new Date(val).toString();
                },
                // },
                sorter: function(a, b) {
                    console.log(a, b);
                    return a.createTime - b.createTime;
                }
            }, {
                title: "创建人",
                dataIndex: "creater",
                key: "creater"
            }, {
                title: "状态",
                dataIndex: "state",
                key: "state"
            }];

        //设置行选中属性
        var rowSelection = {
            onChange: function(selectedRowKeys, selectedRows) {
                console.log("onChange", arguments);
            },
            onSelect: function(record, selected, selectedRows) {
                console.log("onSelect", arguments);
            },
            onSelectAll: function(selected, selectedRows, changeRows) {
                console.log("onSelectAll", arguments);
            }
        }

        //设置分页
        var pagination = $.extend(true, Syp.util.config.pagination, {
            onChange: function() {
                console.log("pagination OnChange", arguments);
            }
        });

        ReactDOM.render(
            <Table
                dataSource={pdts}
                columns={columns}
                rowKey={function(r) { return r.id; } }
                rowSelection={rowSelection}
                pagination={pagination}
                onRowClick={function(r) { Syp.router.gotoUrl(url.ProductDetail, { id: r.id }); } }
                bordered />,
            document.getElementById("tb_pdt")
        );
    }


});