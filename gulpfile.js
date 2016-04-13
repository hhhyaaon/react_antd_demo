'use strict';

//pacakage
var gulp = require("gulp");
var connect = require("gulp-connect");
var rename = require("gulp-rename");
var browserify = require("browserify");
var react = require("gulp-react");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
var reactify = require("gulp-reactify");


var minify = require("gulp-minify-css");
var autoPrefix = require("gulp-autoPrefixer");
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var changed = require('gulp-changed');
var watchify = require('watchify');
var es = require("event-stream");
var fs = require("fs");
var factor = require("factor-bundle");
var glob = require("glob");
var mkdirp = require("mkdirp");
var path = require("path");

var src = {
	index:"./src/index.html",
	js:"./src/scripts",
	css:"./src/styles",
	html:"./src/views",
	lib:"./src/libs"
}

var dist = {
	index:"./dist",
	js:"./dist/js",
	css:"./dist/css",
	html:"./dist/view",
	lib:"./dist/lib"
}


// browserify

// 输入路径表达式
var inputsExpr = path.join(__dirname,src.js,"/**/*");


// 输入输出路径
var input_dir =  path.join(__dirname,src.js);
var output_dir = path.join(dist.js);

// 输入输出文件map
var inputs = glob.sync(inputsExpr,{nodir:true});
var outputs = inputs.map(function(file){
	return file.replace("src/scripts",output_dir)
});

mkdirp.sync(output_dir);


gulp.task("jsxBrowserify",function(){
		browserify({
			entries:inputs,
			transform:["reactify"],
			extensions: ['js', 'jsx']
		})
		.plugin(factor,{output:outputs})
		.bundle()
		.pipe(source("common.js"))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(output_dir))
	});


//jsx
gulp.task("jsx",function(){
	return gulp.src(path.join(__dirname,src.js,"/**/*.js"))
		.pipe(changed(path.join(__dirname,dist.js)))
		.pipe(browserify(
			{
				transform:["reactify"]
			}
		)
		.on("prebundle",function(bundler){
			bundler.require("antd");
			// bundler.require("react");
			// bundler.require("react-dom");
		})
		)
		// .pipe(uglify())
		.pipe(gulp.dest(path.join(__dirname,dist.js)))
});




//less
gulp.task("less",function(){
	return gulp.src(path.join(__dirname,src.css,"/**/*.less"))
		.pipe(changed(path.join(__dirname,dist.css)))
		.pipe(less())
		.pipe(autoPrefix())
		.pipe(minify())
		.pipe(gulp.dest(path.join(__dirname,dist.css)))
});


//html
gulp.task("tpl",["index"],function(){
	return gulp.src(path.join(__dirname,src.html,"/**/*.html"))
		.pipe(changed(path.join(__dirname,dist.html)))
		.pipe(gulp.dest(path.join(__dirname,dist.html)))
});

//index.html
gulp.task("index",function(){
	return gulp.src(path.join(__dirname,src.index))
		.pipe(gulp.dest(path.join(__dirname,dist.index)))
});

//antd
gulp.task("antd",function(){
	return gulp.src("./node_modules/antd/style/index.less")
		.pipe(less())
		.pipe(autoPrefix())
		.pipe(minify())
		.pipe(rename(function(p){
			p.basename = "antd";
		}))
		.pipe(gulp.dest(path.join(__dirname,dist.lib,"./antd/")))
});

//lib
gulp.task("lib",["antd"]);



gulp.task("build",["jsxBrowserify","less","tpl","lib"],function(){
	console.log("build finish");
});


gulp.task("aliasCombo",function(){
	return gulp.src(path.join(__dirname,dist.lib,"./antd/"))
	aliasCombo(
	{
		paths:{
			"antd":path.join(__dirname,dist.lib,"./antd/")
		}
	})
});


// 用于dev的gulp，开发时使用,watch同样会调用build
gulp.task("watch",["build"],function(){
	    browserSync({
        notify: false,
        logPrefix: 'BS',
        server: ['dist']
    });

gulp.watch(path.join(__dirname,src.js,"/**/*.js"),["jsxBrowserify",reload]);
gulp.watch(path.join(__dirname,src.css,"/**/*.less"),["less",reload]);
gulp.watch(path.join(__dirname,src.html,"/**/*.html"),["tpl",reload]);
gulp.watch(path.join(__dirname,src.index),["index",reload]);

});
