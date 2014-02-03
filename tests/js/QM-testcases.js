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

// contains all tests.
var runTests = function () {
    test("Testing qm.func.getOne1DiffFrom2BinStrCompare() with invalid input", function () {
        var func = qm.func.getOne1DiffFrom2BinStrCompare;
        equal(func("01", "111", "-"), "");
        equal(func("1111-", "-1111", "-"), "");
        equal(func("---", "-00", "-"), "");
        equal(func("1", "-1101", "-"), "");
        equal(func("11-", "-1101", "-"), "");
        equal(func("1", "1", "-"), "");
		equal(func("-", "1", "-"), "");
    });
    test("Testing qm.func.getOne1DiffFrom2BinStrCompare() with valid input", function () {
        var func = qm.func.getOne1DiffFrom2BinStrCompare;
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
    test("Testing qm.func.getStrCopy()", function () {
        var func = qm.func.getStrCopy;
        equal(func("1"), "1");
        equal(func("1", 1), "1");
        equal(func("#", 2), "##");
        equal(func("*", 5), "*****");
        equal(func("1", 5), "11111");
    });
    test("Testing qm.func.insertionSort()", function () {
        var func = qm.func.insertionSort;
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
    test("Testing qm.func.getUniqueNumArr()", function () {
        var func = qm.func.getUniqueNumArr;
        deepEqual(func([]), []);
        deepEqual(func([1, 1, 1, 1]), [1]);
        deepEqual(func([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]), [1, 2, 3, 4, 5]);
        deepEqual(func([3, 3, 3, 2, 2, 1]), [3, 2, 1]);
        deepEqual(func([1, 2, 2, 3, 3, 3, 2, 2, 1]), [1, 2, 3]);
    });
    test("Testing qm.func.getUniqueSortedNumArr()", function () {
        var func = qm.func.getUniqueSortedNumArr;
        deepEqual(func([]), []);
        deepEqual(func([1]), [1]);
        deepEqual(func([1, 2]), [1, 2]);
        deepEqual(func([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
        deepEqual(func([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]), [1, 2, 3, 4, 5]);
        deepEqual(func([3, 3, 3, 2, 2, 1]), [1, 2, 3]);
        deepEqual(func([1, 10, 3, 10, 10, 10, 5, 3, 2, 1]), [1, 2, 3, 5, 10]);
    });
    test("Testing qm.func.getUniqueSortedNumStr()", function () {
        var func = qm.func.getUniqueSortedNumStr;
        equal(func("12,14,11,27,21,29,23,5,7,20,22", ","), "5,7,11,12,14,20,21,22,23,27,29");
    });
    test("Testing qm.func.replaceCharAtIndex()", function () {
        var func = qm.func.replaceCharAtIndex;
        equal(func("5", 0, "1"), "1");
        equal(func("444", 0, "1"), "144");
        equal(func("444", 1, "1"), "414");
        equal(func("444", 2, "1"), "441");
        equal(func("1211", 1, "1"), "1111");
        equal(func("3", [0], "1"), "1");
        equal(func("144", [1, 1], ""), "1");
        equal(func("1234", [1, 2, 3], "1"), "1111");
    });
    test("Testing qm.func.getBinaryStrFromDecimal()", function () {
        var func = qm.func.getBinaryStrFromDecimal;
        equal(func(0), "0");
        equal(func(1), "1");
        equal(func(10), "1010");
        equal(func(0, 5), "00000");
        equal(func(1, 5), "00001");
        equal(func(10, 5), "01010");
        equal(func(10, 5), "01010");
        equal(func(31, 5), "11111");
    });
	test("Testing qm.func.indexesOfStr()", function () {
        var func = qm.func.indexesOfStr;
        deepEqual(func("", ""), []);
        deepEqual(func("1", "2"), []);
        deepEqual(func("1111", "1"), [0,1,2,3]);
        deepEqual(func("--11-", "1"), [2,3]);
    });
    test("Testing qm.func.getCharIndexesFromSimStrs() with invalid input", function () {
        var func = qm.func.getCharIndexesFromSimStrs;
        deepEqual(func("", "", ""), []);
        deepEqual(func("1", "123", "2"), []);
        deepEqual(func("1111", "123", "1"), []);
        deepEqual(func("--11-", "--31-", "1"), []);
    });
    test("Testing qm.func.getCharIndexesFromSimStrs() with valid input", function () {
        var func = qm.func.getCharIndexesFromSimStrs;
        deepEqual(func("-", "-", "-"), [0]);
        deepEqual(func("--", "--", "-"), [0, 1]);
        deepEqual(func("111-1", "123-5", "-"), [3]);
        deepEqual(func("--11-", "--31-", "-"), [0, 1, 4]);
    });
    test("Testing qm.func.getBinStrFromNumArr()", function () {
        var func = qm.func.getBinStrFromNumArr;
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
    test("Testing qm.func.getGroupedMintermsFromBinStrArr()", function () {
        var func = function (arr) {
            return qm.func.getGroupedMintermsFromBinStrArr(qm.func.getBinStrFromNumArr(arr));
        };
        var obj = {
            keys : [1],
            1 : [{
                    minterms : "1",
                    value : "1"
                }
            ]
        };
        deepEqual(func([1]), obj);
        obj = {
            keys : [0, 1, 2, 3],
            3 : [{
                    minterms : "7",
                    value : "111"
                }
            ],
            2 : [{
                    minterms : "6",
                    value : "110"
                }, {
                    minterms : "5",
                    value : "101"
                }, {
                    minterms : "3",
                    value : "011"
                }
            ],
            1 : [{
                    minterms : "4",
                    value : "100"
                }, {
                    minterms : "2",
                    value : "010"
                }, {
                    minterms : "1",
                    value : "001"
                }
            ],
            0 : [{
                    minterms : "0",
                    value : "000"
                }
            ]
        };
        deepEqual(func([0, 1, 2, 3, 4, 5, 6, 7]), obj);
    });
    test("Testing qm.func.isObjInRightFormat()", function () {
        var func = qm.func.isObjInRightFormat;
        var obj = {
            inputs : "A,B,C,D,E",
            minterms : "5,7,11,12,27,29",
            dontNeeds : "14,20,21,22,23"
        };
        equal(func(obj), "");
    });
    test("Testing qm.func.getGroupedMTFromNumArr()", function () {
        var func = qm.func.getGroupedMTFromNumArr;
        var obj = {
            keys : [1],
            1 : [{
                    minterms : "1",
                    value : "1"
                }
            ]
        };
        deepEqual(func([1]), obj);
		obj = {
			"1" : [{
					"minterms" : "4",
					"value" : "0100"
				}, {
					"minterms" : "2",
					"value" : "0010"
				}, {
					"minterms" : "1",
					"value" : "0001"
				}
			],
			"2" : [{
					"minterms" : "12",
					"value" : "1100"
				}, {
					"minterms" : "6",
					"value" : "0110"
				}, {
					"minterms" : "5",
					"value" : "0101"
				}
			],
			"3" : [{
					"minterms" : "7",
					"value" : "0111"
				}
			],
			"4" : [{
					"minterms" : "15",
					"value" : "1111"
				}
			],
			"keys" : [
				1,
				2,
				3,
				4
			]
		};
		deepEqual( func("1,2,4,5,6,7,12,15".split(","), "A,B,C,D".split(",").length), obj);
    });
    test("Testing qm.func.getPrimeImplicantsFromMinterms()", function () {
        var func = function (arr) {
            return qm.func.getPrimeImplicantsFromMinterms(qm.func.getGroupedMTFromNumArr(arr));
        };
        var arr;
        arr = [{
                "minterms" : "0,4",
                "value" : "-00"
            }, {
                "minterms" : "0,1",
                "value" : "00-"
            }
        ];
        deepEqual(func([0, 1, 4]), arr);
        arr = [{
                minterms : "12,14",
                value : "011-0"
            }, {
                minterms : "11,27",
                value : "-1011"
            }, {
                minterms : "21,29",
                value : "1-101"
            }, {
                minterms : "5,7,21,23",
                value : "-01-1"
            }, {
                minterms : "20,21,22,23",
                value : "101--"
            }
        ];
        deepEqual(func([5, 7, 21, 23, 20, 21, 22, 12, 14, 21, 29, 11, 27]), arr);
    });
    test("Testing qm.func.getObjFromStrSplit()", function () {
        var func = qm.func.getObjFromStrSplit;
        
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
    test("Testing qm.func.getMatchLenAfterAppendPIToMT()", function () {
        var mtObj = qm.func.getObjFromStrSplit("1,2,3,4", ",", (function () {
                    return {
                        "PIs" : [],
                        "PIsKeys" : {}
                    };
                }));
        equal(1, qm.func.getMatchLenAfterAppendPIToMT(0, "0,4", mtObj));
        deepEqual([0], mtObj[4].PIs);
    });
    test("Testing qm.func.getIndexOfPIWithMaxLenInMidTerm()", function () {
        var func = qm.func.getIndexOfPIWithMaxLenInMidTerm;
        var PITest = {
            "0" : {
                matchLength : 0
            },
            "1" : {
                matchLength : 1
            },
            "2" : {
                matchLength : 2
            },
            "3" : {
                matchLength : 3
            },
            "4" : {
                matchLength : 4
            }
        };
        equal(-1, func([], PITest), -1);
        equal(func([0], PITest), 0);
        equal(func([0, 1, 2], PITest), 2);
        equal(func([0, 4], PITest), 4);
    });
    test("Testing qm.func.getMTWithPIMatchAndAddPILenToPI()", function () {
        var mtObj2 = qm.func.getObjFromStrSplit("0,1,4", ",", function () {
                return {
                    "PIs" : [],
                    "PIsKeys" : {}
                };
            });
        var PITest2 = qm.func.getPrimeImplicantsFromMinterms(qm.func.getGroupedMTFromNumArr([0, 1, 4]));
        var obj = {
            4 : {
                PIs : [0],
                PIsKeys : {
                    0 : 1
                }
            },
            1 : {
                PIs : [1],
                PIsKeys : {
                    1 : 1
                }
            },
            0 : {
                PIs : [1, 0],
                PIsKeys : {
                    1 : 1,
                    0 : 1
                }
            }
        };
        var arr = [{
                minterms : "0,4",
                value : "-00",
                matchLength : 2
            }, {
                minterms : "0,1",
                value : "00-",
                matchLength : 2
            }
        ];
        deepEqual(qm.func.getMTWithPIMatchAndAddPILenToPI(mtObj2, PITest2), obj);
        deepEqual(PITest2, arr);
    });
    test("Testing qm.func.getLeastPrimeImplicantsByGraph() with short input", function () {
        var func = qm.func.getLeastPrimeImplicantsByGraph;
        var func2 = function (arr) {
            return qm.func.getPrimeImplicantsFromMinterms(qm.func.getGroupedMTFromNumArr(arr));
        };
        var mtStr2 = "0,1,4";
        var PITest2 = func2( mtStr2.split(",") );
        var arr = [{
                minterms : "0,4",
                value : "-00"
            }, {
                minterms : "0,1",
                value : "00-"
            }
        ];
        deepEqual(func(mtStr2, PITest2), arr);
    });
    test("Testing qm.func.getLeastPrimeImplicantsByGraph() with long input", function () {
        var func = qm.func.getLeastPrimeImplicantsByGraph;
        var func2 = function (arr) {
            return qm.func.getPrimeImplicantsFromMinterms(qm.func.getGroupedMTFromNumArr(arr));
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
        deepEqual(func(mtStr2, PITest), arr);
    });
    test("Testing qm.func.getLeastPI() without dontNeeds input", function () {
        var func = qm.func.getLeastPI;
        var input = {
            inputs : "A,B,C,D",
            minterms : "2,4,6,8,9,10,12,13,15"
        };
        var obj = {
            0 : [
                "ABD", 
                "AC*", 
                "A*BD*", 
                "B*CD*"
            ],
            1 : [
                "11-1",
                "1-0-", 
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
                "AC*DE",
                "A*BCD*E*", 
                "A*CDE", 
                "B*C*D", 
                "A*C*DE*"
            ],
            1 : [
                "1-011",
                "01100",
                "0-111",
				"-001-",
                "0-010"
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
		equal(a, "ABD + AC* + A*BD* + BC*D* + B*CD*");
	});
    module( "new functionality" );
    test( "test qm.func.foilArray()", function(){
        var func = qm.func.foilArray;
        deepEqual( func( "" ), [ "" ] );
        deepEqual( func( "A" ), [ "A" ] );
        deepEqual( func( "A", "B" ), [ "AB", "AB*" ] );
        deepEqual( func( "A", "B", "C" ), [ "ABC", "AB*C", "ABC*", "AB*C*" ] );
		deepEqual( func( "A", "B", "C", "D" ), [ "ABCD", "AB*CD", "ABC*D", "AB*C*D", "ABCD*", "AB*CD*", "ABC*D*", "AB*C*D*" ] );
    });
    // test( "", function(){
    // });
};
var reRunTests = function () {
    QUnit.reset(); // should clear the DOM
    QUnit.init(); // resets the qunit test environment
    QUnit.start(); // allows for the new test to be captured.
    runTests();
};
