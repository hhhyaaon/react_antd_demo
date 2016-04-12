var fs = require("fs");
var path = require("path");

var res = [];
var count = 0;
var rootPath = path.join(__dirname,"../src/");
var jsDir = path.join(rootPath,"./scripts");

function getFile(dir){
	var files = fs.readdirSync(jsDir);
	for(i in files){
		var fname = path.join(jsDir,files[i]);
		var stat = fs.lstatSync(fname); 
		if(stat.isDirectory()){
			console.log(fname);
			console.log(count++);
			getFile(fname);
		}else{
			res.push(fname);
		}
	}
}

getFile(jsDir);

console.log(res);



