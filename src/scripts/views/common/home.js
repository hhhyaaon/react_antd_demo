
var React = require("react");
var ReactDOM = require("react-dom");

var PartView_Home = React.createClass({
	render:function(){
		return (<h1>Welcome</h1>);
	}
});
console.log($("#view_home"));
ReactDOM.render(<PartView_Home/>,document.getElementById("view_home"));
//module.exports = PartView_Home;



