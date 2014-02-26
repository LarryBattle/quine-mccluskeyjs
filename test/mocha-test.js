// Reads all the files in the src and then executes the test files in the test diretory.
// Run `mocha mocha-test.js`
// @requires mochajs and node.js 10+
var fs = require("fs");
var util = require("util");
var path = require("path");
var chai = require("chai");
var assert = chai.assert;
var context = [ assert ];
var contextNames = [ "assert" ];
var paths = {
    src: path.join(__dirname, "../src/"),
    tests: path.join(__dirname, "/js/")
};

var mapFilesInDir = function(filepath, fn) {
    var arr = [];
    var files = fs.readdirSync(filepath);
    for (var i in files) {
        if (!files.hasOwnProperty(i)) {
            continue;
        }
        arr.push(fn(filepath + "/" + files[i], i, files));
    }
    return arr;
};

var getSourceFromFilesInDir = function(dirPath) {
    return mapFilesInDir(dirPath, function(filepath) {
        return fs.readFileSync(filepath, "utf8");
    });
};

var qm_src = getSourceFromFilesInDir(paths.src);
var qm_tests = getSourceFromFilesInDir(paths.tests);
var qm_src_test_fn = new Function(contextNames, [].concat(qm_src, qm_tests).join("\n;"));

qm_src_test_fn.apply({}, context);
