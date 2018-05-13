var gulp = require('gulp');
var connect = require('gulp-connect');//自动刷新浏览器插件
var postcss = require('gulp-postcss');//css处理器 postcss
var autoprefixer = require('autoprefixer');//css兼容处理器
var cssnano = require('cssnano');//css压缩插件
var less = require('gulp-less');//css预处理器(包) less
var include = require('gulp-file-include');//html应用处理插件

//启动服务并且监听localhost:8888端口
gulp.task('connect', function () {
  connect.server({port:8888, livereload: true});
});
//监听html 变化
gulp.task('html', function () {
  gulp.watch(['./page/*.html', './page/zhuanti/*.html'], function(e){
  	gulp.src(e.path)
  	.pipe(include({pre:'@@',basepath:'@file'}))
  	.pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
  })
});
//监听引入文件的变化
gulp.task('html2', function () {
  gulp.watch(['./include/*.html'], function(e){
  	gulp.src('./page/*.html')
  	.pipe(include({pre:'@@',basepath:'@file'}))
  	.pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
  })
});
//监听less变化
gulp.task('css', function(){
	//var processors = [autoprefixer, cssnano];
	var processors = [autoprefixer({"browsers": ["last 2 version", "> 0.1%", "> 5% in US", "ie 6-8","Firefox < 20"] })];
	gulp.watch('./less/*.less', function(){
		gulp.src('./less/css.less')
		.pipe(less())
		.pipe(postcss(processors))
		.pipe(gulp.dest('./css'))
		.pipe(connect.reload());
	});
});
gulp.task('default', ['connect', 'html', 'html2', 'css']);






















