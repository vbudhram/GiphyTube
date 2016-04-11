/**
 * Created by vijay.budhram on 11/14/15.
 */
'use strict';

var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('serve-test', function(){
    var server = gls.static('public', 3000);
    server.start();

    gulp.watch(['public/**/*.css', 'public/**/*.js', 'public/**/*.html'], function (file) {
        server.notify.apply(server, [file]);
    });
});
