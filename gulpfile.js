var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,

	src = {
		scss: './src/scss/surface_styles.scss'
	},

	prod = {
		css: './prod/css'
	};

gulp.task('browser-sync', ['compile-scss'], function(){
	browserSync.init({
		server: './prod'
	});

	gulp.watch(src.scss, ['compile-scss']);
	gulp.watch('./prod/**/*.html').on('change', reload);
});

gulp.task('compile-scss', function(){
	gulp.src(src.scss)
	.pipe(sass({
		errLogToConsole: true
	}))
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(minifyCss())
	.pipe(gulp.dest(prod.css))
	.pipe(reload({
		stream: true
	}));
});

gulp.task('default', ['browser-sync']);