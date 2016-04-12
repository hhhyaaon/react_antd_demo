var gulp = require("gulp");
var browserify = require("gulp-browserify");
var watchify = require("watchify");
var react = require("gulp-react");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
var minify = require("gulp-minify-css");
var autoPrefix = require("gulp-autoPrefixer");
var babel = require ("gulp-babel");
var source = require("vinyl-source-stream");
var changed = require("gulp-changed");
var browserSync = require("browser-sync").create();


var path = require("path");
var rename = require("gulp-rename");
var assign = require("lodash.assign");



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


//jsx
gulp.task("jsx",function(){
	return gulp.src(path.join(__dirname,src.js,"/**/*.js"))
		//.pipe(babel({presets:["es2015"]}))
		//.pipe(browserify())
		//.pipe(react())
		.pipe(changed(path.join(__dirname,dist.js)))
		.pipe(browserify(
			{
				transform:["reactify"]
			}
		))
		.pipe(uglify())
		.pipe(gulp.dest(path.join(__dirname,dist.js)))
});


//less
gulp.task("less",function(){
	return gulp.src(path.join(__dirname,src.css,"/**/*.less"))
		.pipe(less())
		.pipe(autoPrefix())
		.pipe(minify())
		.pipe(gulp.dest(path.join(__dirname,dist.css)))
});


//html
gulp.task("tpl",["index"],function(){
	return gulp.src(path.join(__dirname,src.html,"/**/*.html"))
		.pipe(gulp.dest(path.join(__dirname,dist.html)))
});

//index.html
gulp.task("index",function(){
	return gulp.src(path.join(__dirname,src.index))
		.pipe(gulp.dest(path.join(__dirname,dist.index)))
});

//server
gulp.task("connect",function(){
	browserSync.init({
		server:{
			baseDir:path.join(__dirname,"/dist/")
		}
	});
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


gulp.task("watch",function(){
	var watchArr = [];

	watchArr.push(gulp.watch(path.join(__dirname,dist.js,"/**/*.js"),browserSync.reload));
	watchArr.push(gulp.watch(path.join(__dirname,dist.css,"/**/*.css"),browserSync.reload));
	watchArr.push(gulp.watch(path.join(__dirname,"./dist/**/*.html"),browserSync.reload));

	watchArr.forEach(function(watch,i){
		watch.on("change",function(e){
			console.log("["+e.type+"]",e.path.replace(__dirname,""));
		});
	});
	
});


//可执行任务

gulp.task("lib",["antd"]);

gulp.task("default",["jsx","less","tpl","lib"],function(){
	console.log("default finish");
});

gulp.task("server",["watch","default","connect"]);