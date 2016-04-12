var fs = require("fs");
var path = require("path");

var res = [];
var count = 0;
var rootPath =  path.join(__dirname,"../");
var jsDir = path.join(__dirname,"../scripts/");
var distFile = path.join(__dirname,"./getFile_res.js");

function getFile(dir){
	fs.readdir(dir,function(err,subDir){
		if(err){
			handleError(err);
			return;
		}
		subDir.forEach(function(file){
			var tmp = path.join(dir,file);
			fs.stat(tmp,function(e,stat){
				if(e){
					handleError(e);
				}else{
					if(stat.isDirectory()){
						getFile(tmp);
					}else{
						res.push(tmp);
						var index = tmp.indexOf(rootPath);
						var rs = tmp.replace(/\\/g,"\/").substring(index+rootPath.length);
						writeFile(distFile,"./src/"+rs+",\r\n");
					}
				}
				
			})
		});
	});
}

function writeFile(file,str){
	fs.appendFile(file, str, function(err){  
        if(err) handleError(err);
        //fs.close();
    });  
};



function handleError(e){
	console.log("[Error]",e);
}

getFile(jsDir);





