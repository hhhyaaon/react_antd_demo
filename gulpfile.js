var gulp = require("gulp");
var browserify = require("browserify");
var watchify = require("watchify");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
var minify = require("gulp-minify-css");
var autoPrefix = require("gulp-autoPrefixer");
var babel = require ("gulp-babel");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var changed = require("gulp-changed");
var browserSync = require("browser-sync").create();


var path = require("path");
var rename = require("gulp-rename");
var assign = require("lodash.assign");
var glob = require("glob");
var factor = require("factor-bundle");
var mkdir = require("mkdirp");



var src = {
	index:"src/index.html",
	js:"src/scripts",
	css:"src/styles",
	html:"src/views",
	lib:"src/libs"
}

var dist = {
	index:"dist",
	js:"dist/js",
	css:"dist/css",
	html:"dist/view",
	lib:"dist/lib"
}



gulp.task("jsx",function(){

	var input_files = glob.sync(path.join(src.js,"./**/*.js"));
	var input_dirs = glob.sync(path.join(src.js,"./**/*/"));


	var output_files = input_files.map(function(file){
		var rs = file.replace(src.js.replace(/\\/g,"/"),"")
		return path.join(dist.js,"."+rs);
	});
	//创建dist文件夹
	input_dirs.map(function(dir){
		var outputDir = mkdir.sync(dir.replace(src.js,dist.js));
	});

	var browerArg = {
		entries:input_files,
		transform:[["babelify", { "presets": ["es2015","react"] }]]
	}
	return watchify(browserify(assign(browerArg,watchify.args)))
		.plugin(factor,{o:output_files})
		.bundle()
		//.on("error",function(err){console.log("[Error]:",err.description+"\n filename:"+err.filename+" line:"+err.lineNumber);})
		.on("error",function(err){console.log("[Error]:",err)})
		.pipe(source("common.js"))
		
		// .pipe(buffer())
		// .pipe(uglify())
		.pipe(gulp.dest(path.join(__dirname,dist.js)));
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
	return gulp.src(path.join(__dirname,src.lib,"./antd/antd.less"))
		.pipe(less())
		.pipe(autoPrefix())
		.pipe(minify())
		.pipe(gulp.dest(path.join(__dirname,dist.lib,"./antd/")))
});

//jquery
gulp.task("jquery",function(){
	return gulp.src(path.join(__dirname,src.lib,"/**/*.js"))
		.pipe(gulp.dest(path.join(__dirname,dist.lib)))
});

gulp.task("watch",function(){
	var watchArr = [];
	watchArr.push(gulp.watch(path.join(__dirname,src.js,"/**/*.js"),["jsx"],browserSync.reload));
	watchArr.push(gulp.watch(path.join(__dirname,src.css,"/**/*.less"),["less"],browserSync.reload));
	watchArr.push(gulp.watch(path.join(__dirname,src.html,"/**/*.html"),["tpl"],browserSync.reload));
	watchArr.push(gulp.watch(path.join(__dirname,src.index),["index"],browserSync.reload));

	watchArr.forEach(function(watch,i){
		watch.on("change",function(e){
			console.log("["+e.type+"]",e.path.replace(__dirname,""));
		});
	});
	
});



//可执行任务

gulp.task("lib",["antd","jquery"]);

gulp.task("default",["jsx","less","tpl","lib"],function(){
	console.log("default finish");
});

gulp.task("build",["watch","default","connect"]);