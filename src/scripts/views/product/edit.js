import React from "react";
import ReactDOM from "react-dom";
import Antd from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Form  from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
const FormItem = Form.Item;


let _Form = null;
let _Btn_submit = null;

init();

function init() {
    renderButton();
    renderForm();
}

function renderButton() {
    
    _Btn_submit = React.createClass({
        render: function () {
            return (
                <Button
                    type="primary"
                    onClick = {this.save}>保存</Button>
            );
        },
        save(){
            console.log("_Form",_Form);
            //$.ajax();
        }
    });
    ReactDOM.render(
      <_Btn_submit/>,
      document.getElementById("btn_submit")  
    );
}


function renderForm() {
    _Form = React.createClass({
        getInitialState() {
            return {
                formData: {}
            }
        },
        render: function () {
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
            };
            const { getFieldProps } = this.props.form;
            return (
                <Form horizontal>
                    <Row>
                        <Col span="12">
                            <FormItem
                                label="商品名称（品牌）："
                                {...formItemLayout}
                                {...getFieldProps("name")}>
                                <Input type="text"/>
                            </FormItem>
                            <FormItem
                                label="英文名称："
                                {...formItemLayout}
                                {...getFieldProps("engName")}>
                                <Input type="text"/>
                            </FormItem>
                            <FormItem
                                label="通用名："
                                {...formItemLayout}
                                {...getFieldProps("commonName")}>
                                <Input type="text"/>
                            </FormItem>
                            <FormItem
                                label="价格："
                                {...formItemLayout}
                                {...getFieldProps("price")}>
                                <Input type="text"/>
                            </FormItem>
                            <FormItem
                                label="医保类型："
                                {...formItemLayout}>
                                <Input type="text"/>
                            </FormItem>
                            <FormItem
                                label="上市时间："
                                {...formItemLayout}>
                                <Input type="text"/>
                            </FormItem>
                            <FormItem
                                label="关联科室："
                                {...formItemLayout}>
                                <Input type="text"/>
                            </FormItem>
                            <FormItem
                                label="成分："
                                {...formItemLayout}>
                                <Input type="text"/>
                            </FormItem>
                            <FormItem
                                label="学术文献："
                                {...formItemLayout}>
                                <Input type="text"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            );
        }
    });
    _Form = Form.create({})(_Form);
    ReactDOM.render(
        <_Form/>,
        document.getElementById("form_pdt")
    )
}



