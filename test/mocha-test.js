/**
 * Uses mocha cli to run the mocha test cases.
 * requires node.js 0.10.x
 */
var fs = require("fs");
var util = require("util");
var path = require("path");
var chai = require("chai");
var assert = chai.assert;

var names = [
	"ArrayUtil",
	"BinaryFunction",
	"BinaryGroupTable",
	"CoverageTable",
	"NumberUtil",
	"Petrick",
	"SimpleSet",
	"StringUtil"
];
var paths = {
	"src" : path.join(__dirname, "../src/"),
	"tests" : path.join(__dirname, "/js/")
};
var context = [assert];
var contextNames = ["assert"];

// compress all the modules into a single string.
var qm_src = names.map(function (name) {
		var filepath = paths.src + name + ".js";
		return fs.readFileSync(filepath, "utf8");
	});
// compress all the test into a single string.
var qm_tests_src = names.map(function (name) {
		return fs.readFileSync(paths.tests + name + "-test.js", "utf8");
	});
// eval the source of modules and tests.
var qm_src_test_fn = new Function(contextNames, [].concat(qm_src, qm_tests_src).join("\n;"));
qm_src_test_fn.apply({}, context);
