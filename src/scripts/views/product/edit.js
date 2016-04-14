var React = require("react");
var ReactDOM = require("react-dom");
var Antd = require("antd");
var Button = require("antd/lib/button");
var Form = require("antd/lib/form");
var FormItem = Form.Item;
var Input = require("antd/lib/input");

$(function(){
	init();

	function init(){
		initForm();
	}
    
    function initForm(){
        var Pdt = React.createClass({
            render:function(){
                return (
                    <Form>
                        <FormItem>
                            <Input type="text"/>
                        </FormItem>
                    </Form>
                );
            }
        });
        ReactDOM.render(
            <Pdt/>,
            document.getElementById("form_pdt")
        )
    }
    
});
