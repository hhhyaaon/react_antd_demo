var gulp = require("gulp");
var connect = require("gulp-connect");
var browserify = require("gulp-browserify");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
var babel = require ("gulp-babel");

var port = process.env.port||5000;

var src = {
	js:"./src/scripts",
	css:"./src/styles",
	html:"./src/views",
	lib:"./src/libs"
}


//模块化
gulp.task("browserify",function(){
	gulp.src(src.js+"/**/*.js")
	// .pipe(babel({
	// 	presets:["babel-preset-es2015"]
	// }))
	.pipe(browserify(
		{
			transform:["reactify"]
		}
	))
	.pipe(uglify())
	.pipe(gulp.dest("./dist/js/"));

	gulp.src(src.css+"/**/*.less")
	.pipe(less())
	.pipe(gulp.dest("./dist/css/"));

	gulp.src(src.html+"/**/*.html")
	.pipe(gulp.dest("./dist/views/"));

	gulp.src("./src/index.html")
	.pipe(gulp.dest("./dist/"));

	gulp.src(src.lib+"/**/*.css")
	.pipe(gulp.dest("./dist/lib/"))
});

//js
gulp.task("js",function(){
	gulp.src("./dist/scripts/**/*.js")
	.pipe(connect.reload())
});

//css
gulp.task("css",function(){
	gulp.src("./dist/styles/*.css")
	.pipe(connect.reload())
});

//html
gulp.task("html",function(){
	gulp.src("./src/views/**/*.html")
	.pipe(connect.reload());
});

//watch
gulp.task("watch",function(){
	gulp.watch("./dist/**/*.js",["js"]);
	gulp.watch("./dist/**/*.css",["css"]);
	gulp.watch("./src/views/**/*.html",["html"]);
	gulp.watch("./src/scripts/**/*.js",["browserify"]);
	gulp.watch("./src/styles/**/*.less",["browserify"]);
});

//web server
gulp.task("connect",function(){
	connect.server({
		root:"./dist/",
		port:port,
		livereload:true
	})
});

gulp.task("default",["browserify"],function(){
	console.log("gulp finish");
});
gulp.task("server",["browserify","connect","watch"],function(){
	console.log("gulp server finish");
});