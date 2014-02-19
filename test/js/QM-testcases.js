/*
 * Quine-McCluskeyJS
 *
 * @purpose: Test cases.
 * @requires: qUnit, QM.js(Quine-McCluskeyJS)
 * @author Larry Battle <http://bateru.com/news/contact-me>
 * @license MIT and GPL 3.0
 * http://www.gnu.org/licenses/gpl.html, http://www.opensource.org/licenses/mit-license.php
 */

// Purpose: Provides 90%+ code coverage for inner functions.

// exports is used to test as a node module.
var exports = {};

var sortOldPrimeImpsFunc = function(x,y){
	var a = String(x.minterms);
	var b = String(y.minterms);
	return a.localeCompare(b);
};

// contains all tests.
var runTests = function () {
	module("StringUtil");
	test("Testing StringUtil.splitToObject()", function () {
        var func = StringUtil.splitToObject;

        deepEqual(func("", ""), {"":1});
        deepEqual(func("0"), {0 : 1});
        var obj = {
            3 : 1,
            2 : 1,
            1 : 1,
            0 : 1
        };
        deepEqual(func("0,1,2,3"), obj);
    });
	test("Testing StringUtil.indexesOf()", function () {
        var func = StringUtil.indexesOf;
        deepEqual(func("", ""), []);
        deepEqual(func("1", "2"), []);
        deepEqual(func("1111", "1"), [0,1,2,3]);
        deepEqual(func("--11-", "1"), [2,3]);
    });
    test("Testing StringUtil.sharedIndexesOf() with invalid input", function () {
        var func = StringUtil.sharedIndexesOf;
        deepEqual(func("", "", ""), []);
        deepEqual(func("1", "123", "2"), []);
        deepEqual(func("1111", "123", "1"), []);
        deepEqual(func("--11-", "--31-", "1"), []);
    });
    test("Testing StringUtil.sharedIndexesOf() with valid input", function () {
        var func = StringUtil.sharedIndexesOf;
        deepEqual(func("-", "-", "-"), [0]);
        deepEqual(func("--", "--", "-"), [0, 1]);
        deepEqual(func("111-1", "123-5", "-"), [3]);
        deepEqual(func("--11-", "--31-", "-"), [0, 1, 4]);
    });
	test("Testing StringUtil.getUniqueSortedNumberString()", function () {
        var func = StringUtil.getUniqueSortedNumberString;
        equal(func("12,14,11,27,21,29,23,5,7,20,22", ","), "5,7,11,12,14,20,21,22,23,27,29");
    });
    test("Testing StringUtil.replaceCharAtIndex()", function () {
        var func = StringUtil.replaceCharAtIndex;
        equal(func("5", 0, "1"), "1");
        equal(func("444", 0, "1"), "144");
        equal(func("444", 1, "1"), "414");
        equal(func("444", 2, "1"), "441");
        equal(func("1211", 1, "1"), "1111");
        equal(func("3", [0], "1"), "1");
        equal(func("144", [1, 1], ""), "1");
        equal(func("1234", [1, 2, 3], "1"), "1111");
    });
    test("Testing StringUtil.replaceOneDiff() with invalid input", function () {
        var func = StringUtil.replaceOneDiff;
        equal(func("01", "111", "-"), "");
        equal(func("1111-", "-1111", "-"), "");
        equal(func("---", "-00", "-"), "");
        equal(func("1", "-1101", "-"), "");
        equal(func("11-", "-1101", "-"), "");
        equal(func("1", "1", "-"), "");
		equal(func("-", "1", "-"), "");
    });
    test("Testing StringUtil.replaceOneDiff() with valid input", function () {
        var func = StringUtil.replaceOneDiff;
        equal(func("0", "1", "-"), "-");
        equal(func("1", "0", "-"), "-");
        equal(func("01", "00", "-"), "0-");
        equal(func("01", "11", "-"), "-1");
        equal(func("01", "00", "-"), "0-");
        equal(func("111", "011", "-"), "-11");
        equal(func("0111", "1111", "-"), "-111");
		equal(func("1111", "0111", "-"), "-111");
        equal(func("101-1", "111-1", "-"), "1-1-1");
        equal(func("1---", "0---", "-"), "----");
    });
    test("Testing StringUtil.copy()", function () {
        var func = StringUtil.copy;
        equal(func("1"), "1");
        equal(func("1", 1), "1");
        equal(func("#", 2), "##");
        equal(func("*", 5), "*****");
        equal(func("1", 5), "11111");
    });
	module("ArrayUtil");
    test("Testing ArrayUtil.insertionSort()", function () {
        var func = ArrayUtil.insertionSort;
        deepEqual(func([]), []);
        deepEqual(func([1]), [1]);
        deepEqual(func([1, 2]), [1, 2]);
        deepEqual(func([0, 0, 0]), [0, 0, 0]);
        deepEqual(func([1, 2, 1]), [1, 1, 2]);
        deepEqual(func([0, -1]), [-1, 0]);
        deepEqual(func([1, 2, -1]), [-1, 1, 2]);
        deepEqual(func([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
        deepEqual(func([50, 1000000, 20000, 5, 4, 3, 2, 1, -10000, 0]), [-10000, 0, 1, 2, 3, 4, 5, 50, 20000, 1000000]);
        deepEqual(func([5, 4, 5, 4, 5, 4, 5, 4, 5, 3, 2, 3, 2, 3, 1]), [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]);
    });
    test("Testing ArrayUtil.getUniqueNumbers()", function () {
        var func = ArrayUtil.getUniqueNumbers;
        deepEqual(func([]), []);
        deepEqual(func([1, 1, 1, 1]), [1]);
        deepEqual(func([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]), [1, 2, 3, 4, 5]);
        deepEqual(func([3, 3, 3, 2, 2, 1]), [3, 2, 1]);
        deepEqual(func([1, 2, 2, 3, 3, 3, 2, 2, 1]), [1, 2, 3]);
    });
    test("Testing ArrayUtil.getUniqueSortedNumbers()", function () {
        var func = ArrayUtil.getUniqueSortedNumbers;
        deepEqual(func([]), []);
        deepEqual(func([1]), [1]);
        deepEqual(func([1, 2]), [1, 2]);
        deepEqual(func([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
        deepEqual(func([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]), [1, 2, 3, 4, 5]);
        deepEqual(func([3, 3, 3, 2, 2, 1]), [1, 2, 3]);
        deepEqual(func([1, 10, 3, 10, 10, 10, 5, 3, 2, 1]), [1, 2, 3, 5, 10]);
    });
    test("Testing ArrayUtil.compareSets()", function(){
      var fn = ArrayUtil.compareSets;
      equal(fn([1,2,3,4,5],[1,2,3]), 0 );
      equal(fn([1,2,3],[1,2,3]), 0 );
      equal(fn([1,2,3],[1]), 0 );

      equal(fn([1,2,3],[1,2,3,4,5]), 1 );
      equal(fn([1],[1,2,3]), 1 );

      equal(fn([1,2],[1,3]), -1);
      equal(fn([1,2],[2,3]), -1);
      equal(fn([1,2],[3]), -1);
      equal(fn([1,2],[3,4]), -1);
    });
    module("NumberUtil");
    test("Testing NumberUtil.decToBin()", function () {
        var func = NumberUtil.decToBin;
        equal(func(0), "0");
        equal(func(1), "1");
        equal(func(10), "1010");
        equal(func(0, 5), "00000");
        equal(func(1, 5), "00001");
        equal(func(10, 5), "01010");
        equal(func(10, 5), "01010");
        equal(func(31, 5), "11111");
    });
    test("Testing NumberUtil.decsToBins()", function () {
        var func = NumberUtil.decsToBins;
        deepEqual(func([]), []);
        deepEqual(func([0]), ["0"]);
        deepEqual(func([1]), ["1"]);
        deepEqual(func([0, 1]), ["0", "1"]);
        deepEqual(func([0, 1, 2, 3]), ["00", "01", "10", "11"]);
        deepEqual(func([10, 11, 12, 13]), ["1010", "1011", "1100", "1101"]);
        deepEqual(func([0, 1, 2, 31]), ["00000", "00001", "00010", "11111"]);
        deepEqual(func([0, 1, 2, 3], 5), ["00000", "00001", "00010", "00011"]);
        deepEqual(func([0, 1, 2, 2, 3, 3, 3], 5, true), ["00000", "00001", "00010", "00011"]);
    });
    module("CoverageTable");
    test("Testing CoverageTable", function(){
      var o = new CoverageTable();
      o.setMinterms([1]);
      o.addPrimeImp("1", [1]);
      o.updateMintermsInPrimeImps();
      deepEqual(o.getActivePrimeImps(), []);
      var x = o.getEssentialPrimeImps();
      deepEqual(x, [0]);
      o.usePrimeImps(x);
      o.updateMintermsInPrimeImps();
      equal(o.getActivePrimeImps().length, 1);
    });
    test("Testing CoverageTable test2", function(){
      var o = new CoverageTable();
      o.setMinterms([4,5,6,8,9,10,13]);
      o.addPrimeImp("0-00", [0,4]);
      o.addPrimeImp("-000", [0,8]);
      o.addPrimeImp("100-", [8,9]);
      o.addPrimeImp("10-0", [8,10]);
      o.addPrimeImp("1-01", [9,13]);
      o.addPrimeImp("01--", [4,5,6,7]);
      o.addPrimeImp("-1-1", [5,7,13,15]);
      o.updateMintermsInPrimeImps();
      deepEqual(o.getActivePrimeImps(), []);
      var x = o.getEssentialPrimeImps();
      equal(x.length, 2);
      o.usePrimeImps(x);
      o.updateMintermsInPrimeImps();
      equal(o.getActivePrimeImps().length, 2);
    });
	test("Testing CoverageTable test3", function(){
		var o = new CoverageTable();
		o.setMinterms([5, 7, 21, 23, 20, 21, 22, 12, 14, 21, 29, 11, 27]);
		o.addPrimeImp("011-0", [12,14]);
		o.addPrimeImp("-1011", [11,27]);
		o.addPrimeImp("1-101", [21,29]);
		o.addPrimeImp("-01-1", [5,7,21,23]);
		o.addPrimeImp("101--", [20,21,22,23]);
        o.solve();
		equal( o.foundAnswer(), true);
	});
    module("qm");
    test("Testing qm.func.checkFormatOfUserInput()", function () {
        var func = qm.func.checkFormatOfUserInput;
        var obj = {
            inputs : "A,B,C,D,E",
            minterms : "5,7,11,12,27,29",
            dontNeeds : "14,20,21,22,23"
        };
        equal(func(obj), "");
    });
    test("Testing qm.func.getPrimeImplicantsFromMinterms()", function () {
        var func = function (arr) {
            return qm.func.getPrimeImplicantsFromMinterms(arr);
        };
        var arr;
        arr = [{
                "minterms" : [0,1],
                "value" : "00-"
            },{
                "minterms" : [0,4],
                "value" : "-00"
            }
        ];
        deepEqual(func([0, 1, 4]), arr);
        arr = [{
                minterms : [12,14],
                value : "011-0"
            }, {
                minterms : [11,27],
                value : "-1011"
            }, {
                minterms : [21,29],
                value : "1-101"
            }, {
                minterms : [5,7,21,23],
                value : "-01-1"
            }, {
                minterms : [20,21,22,23],
                value : "101--"
            }
        ];
        deepEqual(func([5, 7, 21, 23, 20, 21, 22, 12, 14, 21, 29, 11, 27]), arr);
    });

    test("Testing qm.func.getMatchLenAfterAppendPIToMT()", function () {
        var mtObj = StringUtil.splitToObject("1,2,3,4", ",", (function () {
                    return {
                        "PIs" : [],
                        "PIsKeys" : {}
                    };
                }));
        equal(1, qm.func.getMatchLenAfterAppendPIToMT(0, "0,4", mtObj));
        deepEqual([0], mtObj[4].PIs);
    });
    test("Testing qm.func.getLeastPrimeImplicantsByGraph() with short input", function () {
        var func = qm.func.getLeastPrimeImplicantsByGraph;
        var func2 = function (arr) {
            return qm.func.getPrimeImplicantsFromMinterms(arr);
        };
        var mtStr2 = "0,1,4";
        var PITest2 = func2( mtStr2.split(",") );
        var arr = [ {
                minterms : "0,1",
                value : "00-"
            },{
                minterms : "0,4",
                value : "-00"
            }
        ];
        deepEqual(func(mtStr2, PITest2), arr);
    });
    test("Testing qm.func.getLeastPrimeImplicantsByGraph() with long input", function () {
		var s = sortOldPrimeImpsFunc;
        var func = qm.func.getLeastPrimeImplicantsByGraph;
        var func2 = function (arr) {
            return qm.func.getPrimeImplicantsFromMinterms(arr);
        };
        var mtStr2 = "5,7,11,12,14,20,21,22,23,27,29";
        var PITest = func2(mtStr2.split(","));
        var arr = [{
                minterms : "5,7,21,23",
                value : "-01-1"
            }, {
                minterms : "11,27",
                value : "-1011"
            }, {
                minterms : "12,14",
                value : "011-0"
            }, {
                minterms : "20,21,22,23",
                value : "101--"
            }, {
                minterms : "21,29",
                value : "1-101"
            }
        ];
        deepEqual(func(mtStr2, PITest).sort(s), arr.sort(s));
    });
    test("Testing qm.func.getLeastPI() without dontNeeds input", function () {
        var func = qm.func.getLeastPI;
        var input = {
            inputs : "A,B,C,D",
            minterms : "2,4,6,8,9,10,12,13,15"
        };
        var obj = {
            0 : [
                "AC*",
                "ABD",
                "A*BD*",
                "B*CD*"
            ],
            1 : [
                "1-0-",
                "11-1",
                "01-0",
                "-010"
            ]
        };
        deepEqual(func(input), obj);
    });
    test("Testing qm.func.getLeastPI() with dontNeeds input", function () {
        var func = qm.func.getLeastPI;
        var input = {
            dontNeeds : "5,18,19,21,23",
            inputs : "A,B,C,D,E",
            minterms : "2,3,7,10,12,15,27"
        };
        var obj = {
            0 : [
                "B*C*D",
                "AC*DE",
                "A*CDE",
                "A*C*DE*",
                "A*BCD*E*"
            ],
            1 : [
                "-001-",
                "1-011",
                "0-111",
                "0-010",
                "01100"
            ]
        };
        deepEqual(func(input), obj);
    });
    test("test qm.getLeastPrimeImplicants()", function(){
		var userInput = {
			inputs: "A,B,C,D",
			minterms: "2,4,6,8,9,10,12,13,15"
		};
		var a = qm.getLeastPrimeImplicants(userInput);
		equal(a, "AC* + ABD + A*BD* + B*CD*");
	});
    test("Testing petrick.expandTerms with simple input", function(){
      var fn = petrick.expandTerms;
      deepEqual(fn([ ]), [ ]);
      deepEqual(fn([[ 1 ]]), [[ 1 ]]);
      deepEqual(fn([[1, 2]]), [[1,2]]);
      deepEqual(fn([[1], [2]]), [[1,2]]);
      deepEqual(fn([[1], [2,3]]), [[1,2],[1,3]]);
//      deepEqual(fn([[1,3]], [2]]), [[1,2],[1,3]]);
    });
    test("Testing petrick.expandTerms() with complex input", function(){
      var fn = petrick.expandTerms;
      deepEqual(fn([[1,2], [3,4]]), [[1,3],[1,4],[2,3],[2,4]]);
      deepEqual(fn([[1,2,3], [4,5,6]]), [[1,4 ], [1,5 ],[1,6 ],[2,4 ],[2,5 ],[2,6 ],[3,4 ],[3,5 ],[3,6 ] ] );
      deepEqual(fn([[1], [3,4],[5,6]]), [ [1,3,5],[1,3,6],[1,4,5],[1,4,6] ]);
      deepEqual(fn([[1,2], [3,4],[1,3],[5,6],[2,5],[4,6]]), [
	[1,4,5],[1,3,5,6],[2,3,4,5],[2,3,5,6 ],[1,2,4,6 ],[1,2,3,6 ],[2,3,4,6 ],[2,3,6 ]
      ]);
    });
    // test( "", function(){
    // });
};
var reRunTests = function () {
    QUnit.reset(); // should clear the DOM
    QUnit.init(); // resets the qunit test environment
    // QUnit.load() <- THis function needs to be refactored.
    QUnit.start(); // allows for the new test to be captured.
    runTests();
};
