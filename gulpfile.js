var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var paths = {};
paths.scripts = ["src/*.js"];
var project_name = "qm"
gulp.task("scripts", function(){
  console.log("task scripts");
  return gulp.src(paths.scripts)
	.pipe(uglify())
	.pipe(concat( project_name + "-min.js"))
	.pipe(gulp.dest("./"));
});
gulp.task("default", [ "scripts" ]);
