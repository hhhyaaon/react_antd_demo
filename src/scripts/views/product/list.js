import React from "react";
import ReactDOM from "react-dom";
import Table from "antd/lib/table";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
const ButtonGrup = Button.Group;

const url = {
    ProductEdit: "/product/edit",
    ProductDetail: "/product/detail"
}

// init();


// function init() {
//     //renderSearch();
//     // renderPdts();
//     //renderView();
//     //测试页面卸载
//     Syp.router.beforePageUnload(function (dst, cur) {
//         console.warn("目标页面：", dst, "当前页面：", cur);
//         //return false;
//     });
// }


class SearchBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span="18">
                        <Button
                            type="primary"
                            size="large"
                            onClick={function () { Syp.router.gotoUrl(url.ProductEdit) } }>新增
                        </Button>
                        <ButtonGrup size="large">
                            <Button type="ghost">启用</Button>
                            <Button type="ghost">禁用</Button>
                        </ButtonGrup>
                    </Col>
                    <Col span="6">

                    </Col>
                </Row>
            </div>
        );
    }
}



class Table_Pdt extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    componentDidMount() {
        const pdts = [{
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
        this.setState({
            pdts: pdts
        });
    }
    render() {
        let columns = [{
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
                render: function (val) {
                    return new Date(val).toString();
                },
                sorter: function (a, b) {
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
        let rowSelection = {
            onChange: function (selectedRowKeys, selectedRows) {
                console.log("onChange", arguments);
            },
            onSelect: function (record, selected, selectedRows) {
                console.log("onSelect", arguments);
            },
            onSelectAll: function (selected, selectedRows, changeRows) {
                console.log("onSelectAll", arguments);
            }
        }

        //设置分页
        let pagination = $.extend(true, Syp.util.config.pagination, {
            onChange: function () {
                console.log("pagination OnChange", arguments);
            }
        });
        return (
            <Table
                dataSource={this.state.pdts}
                columns={columns}
                rowKey={function (r) { return r.id; } }
                rowSelection={rowSelection}
                pagination={pagination}
                onRowClick={function (r) { Syp.router.gotoUrl(url.ProductDetail, { id: r.id }); } }
                bordered />
        );
    }
}


class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <section id="pdt_list">
                 <SearchBar></SearchBar>
                 <Table_Pdt></Table_Pdt>
            </section>
        );
    }
}

ReactDOM.render(<View/>, document.getElementById("sy-ctn"));


