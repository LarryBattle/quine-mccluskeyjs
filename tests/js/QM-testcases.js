/*
 * Quine-McCluskeyJS
 *
 * @purpose: Test cases.
 * @requires: qUnit, QM.js(Quine-McCluskeyJS)
 * @author Larry Battle <http://bateru.com/news/contact-me>
 * @version 0.9.1
 * @date June 28, 2012
 * @license MIT and GPL 3.0
 * http://www.gnu.org/licenses/gpl.html, http://www.opensource.org/licenses/mit-license.php
 */

// Purpose: Provides 90%+ code coverage for inner functions.

// exports is used to test as a node module.
var exports = {};

// contains all tests.
var runTests = function () {
	test("Testing qm.func.isArray()", function () {
		equal(true, qm.func.isArray([1, 2, 3]));
		equal(false, qm.func.isArray({
				"1" : 3
			}));
		equal(false, qm.func.isArray("not array"));
		equal(false, qm.func.isArray(1));		
	});
	test("Testing qm.func.getObjProperties()", function () {
		deepEqual([], qm.func.getObjProperties({}));
		deepEqual(["1", "2", "3"], qm.func.getObjProperties({
				"1" : 1,
				"2" : 1,
				"3" : 1
			}));
		deepEqual(["help", "key", "arr"], qm.func.getObjProperties({
				"help" : 1,
				"key" : 1,
				"arr" : []
			}));
	});
	test("Testing qm.func.getOne1DiffFrom2BinStrCompare()", function () {
		equal("", qm.func.getOne1DiffFrom2BinStrCompare("01", "111", "-"));
		equal("", qm.func.getOne1DiffFrom2BinStrCompare("1111-", "-1111", "-"));
		equal("", qm.func.getOne1DiffFrom2BinStrCompare("---", "-00", "-"));
		equal("", qm.func.getOne1DiffFrom2BinStrCompare("1", "-1101", "-"));
		equal("", qm.func.getOne1DiffFrom2BinStrCompare("11-", "-1101", "-"));
		equal("", qm.func.getOne1DiffFrom2BinStrCompare("1", "1", "-"));
		equal("-", qm.func.getOne1DiffFrom2BinStrCompare("0", "1", "-"));
		equal("-", qm.func.getOne1DiffFrom2BinStrCompare("1", "0", "-"));
		equal("0-", qm.func.getOne1DiffFrom2BinStrCompare("01", "00", "-"));
		equal("-1", qm.func.getOne1DiffFrom2BinStrCompare("01", "11", "-"));
		equal("0-", qm.func.getOne1DiffFrom2BinStrCompare("01", "00", "-"));
		equal("-11", qm.func.getOne1DiffFrom2BinStrCompare("111", "011", "-"));
		equal("-111", qm.func.getOne1DiffFrom2BinStrCompare("0111", "1111", "-"));
		equal("1-1-1", qm.func.getOne1DiffFrom2BinStrCompare("101-1", "111-1", "-"));
		equal("----", qm.func.getOne1DiffFrom2BinStrCompare("1---", "0---", "-"));
	});
	test("Testing qm.func.getStrCopy()", function () {
		equal("1", qm.func.getStrCopy("1"));
		equal("1", qm.func.getStrCopy("1", 1));
		equal("##", qm.func.getStrCopy("#", 2));
		equal("*****", qm.func.getStrCopy("*", 5));
		equal("11111", qm.func.getStrCopy("1", 5));
	});
	test("Testing qm.func.insertionSort()", function () {
		deepEqual([], qm.func.insertionSort([]));
		deepEqual([1], qm.func.insertionSort([1]));
		deepEqual([1, 2], qm.func.insertionSort([1, 2]));
		deepEqual([0, 0, 0], qm.func.insertionSort([0, 0, 0]));
		deepEqual([1, 1, 2], qm.func.insertionSort([1, 2, 1]));
		deepEqual([-1, 0], qm.func.insertionSort([0, -1]));
		deepEqual([-1, 1, 2], qm.func.insertionSort([1, 2, -1]));
		deepEqual([1, 2, 3, 4, 5], qm.func.insertionSort([5, 4, 3, 2, 1]));
		deepEqual([-10000, 0, 1, 2, 3, 4, 5, 50, 20000, 1000000], qm.func.insertionSort([50, 1000000, 20000, 5, 4, 3, 2, 1, -10000, 0]));
		deepEqual([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5], qm.func.insertionSort([5, 4, 5, 4, 5, 4, 5, 4, 5, 3, 2, 3, 2, 3, 1]));
	});
	test("Testing qm.func.getUniqueNumArr()", function () {
		deepEqual([], qm.func.getUniqueNumArr([]));
		deepEqual([1], qm.func.getUniqueNumArr([1, 1, 1, 1]));
		deepEqual([1, 2, 3, 4, 5], qm.func.getUniqueNumArr([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]));
		deepEqual([3, 2, 1], qm.func.getUniqueNumArr([3, 3, 3, 2, 2, 1]));
		deepEqual([1, 2, 3], qm.func.getUniqueNumArr([1, 2, 2, 3, 3, 3, 2, 2, 1]));
	});
	test("Testing qm.func.getUniqueSortedNumArr()", function () {
		deepEqual([], qm.func.getUniqueSortedNumArr([]));
		deepEqual([1], qm.func.getUniqueSortedNumArr([1]));
		deepEqual([1, 2], qm.func.getUniqueSortedNumArr([1, 2]));
		deepEqual([1, 2, 3, 4, 5], qm.func.getUniqueSortedNumArr([1, 2, 3, 4, 5]));
		deepEqual([1, 2, 3, 4, 5], qm.func.getUniqueSortedNumArr([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]));
		deepEqual([1, 2, 3], qm.func.getUniqueSortedNumArr([3, 3, 3, 2, 2, 1]));
		deepEqual([1, 2, 3, 5, 10], qm.func.getUniqueSortedNumArr([1, 10, 3, 10, 10, 10, 5, 3, 2, 1]));
	});
	test("Testing qm.func.getUniqueSortedNumStr()", function () {
		equal("5,7,11,12,14,20,21,22,23,27,29", qm.func.getUniqueSortedNumStr("12,14,11,27,21,29,23,5,7,20,22", ","));
	});
	test("Testing qm.func.replaceCharAtIndex()", function () {
		equal("1", qm.func.replaceCharAtIndex("5", 0, "1"));
		equal("144", qm.func.replaceCharAtIndex("444", 0, "1"));
		equal("414", qm.func.replaceCharAtIndex("444", 1, "1"));
		equal("441", qm.func.replaceCharAtIndex("444", 2, "1"));
		equal("1111", qm.func.replaceCharAtIndex("1211", 1, "1"));
		equal("1", qm.func.replaceCharAtIndex("3", [0], "1"));
		equal("1", qm.func.replaceCharAtIndex("144", [1, 1], ""));
		equal("1111", qm.func.replaceCharAtIndex("1234", [1, 2, 3], "1"));
	});
	test("Testing qm.func.getBinaryStrFromDecimal()", function () {
		equal("0", qm.func.getBinaryStrFromDecimal(0));
		equal("1", qm.func.getBinaryStrFromDecimal(1));
		equal("1010", qm.func.getBinaryStrFromDecimal(10));
		equal("00000", qm.func.getBinaryStrFromDecimal(0, 5));
		equal("00001", qm.func.getBinaryStrFromDecimal(1, 5));
		equal("01010", qm.func.getBinaryStrFromDecimal(10, 5));
		equal("01010", qm.func.getBinaryStrFromDecimal(10, 5));
		equal("11111", qm.func.getBinaryStrFromDecimal(31, 5));
	});
	test("Testing qm.func.getCharIndexesFromSimStrs()", function () {
		deepEqual([], qm.func.getCharIndexesFromSimStrs("", "", ""));
		deepEqual([], qm.func.getCharIndexesFromSimStrs("1", "123", "2"));
		deepEqual([], qm.func.getCharIndexesFromSimStrs("1111", "123", "1"));
		deepEqual([], qm.func.getCharIndexesFromSimStrs("--11-", "--31-", "1"));
		deepEqual([0], qm.func.getCharIndexesFromSimStrs("-", "-", "-"));
		deepEqual([0, 1], qm.func.getCharIndexesFromSimStrs("--", "--", "-"));
		deepEqual([3], qm.func.getCharIndexesFromSimStrs("111-1", "123-", "-"));
		deepEqual([0, 1, 4], qm.func.getCharIndexesFromSimStrs("--11-", "--31-", "-"));
	});
	test("Testing qm.func.getBinStrFromNumArr()", function () {
		deepEqual([], qm.func.getBinStrFromNumArr([]));
		deepEqual(["0"], qm.func.getBinStrFromNumArr([0]));
		deepEqual(["1"], qm.func.getBinStrFromNumArr([1]));
		deepEqual(["0", "1"], qm.func.getBinStrFromNumArr([0, 1]));
		deepEqual(["00", "01", "10", "11"], qm.func.getBinStrFromNumArr([0, 1, 2, 3]));
		deepEqual(["1010", "1011", "1100", "1101"], qm.func.getBinStrFromNumArr([10, 11, 12, 13]));
		deepEqual(["00000", "00001", "00010", "11111"], qm.func.getBinStrFromNumArr([0, 1, 2, 31]));
		deepEqual(["00000", "00001", "00010", "00011"], qm.func.getBinStrFromNumArr([0, 1, 2, 3], 5));
		deepEqual(["00000", "00001", "00010", "00011"], qm.func.getBinStrFromNumArr([0, 1, 2, 2, 3, 3, 3], 5, true));
	});
	test("Testing qm.func.getGroupedMintermsFromBinStrArr()", function () {
		deepEqual(({
				keys : [1],
				1 : [{
						minterms : "1",
						value : "1"
					}
				]
			}), qm.func.getGroupedMintermsFromBinStrArr(qm.func.getBinStrFromNumArr([1])));
		deepEqual(({
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
			}), qm.func.getGroupedMintermsFromBinStrArr(qm.func.getBinStrFromNumArr([0, 1, 2, 3, 4, 5, 6, 7])));
	});
	test("Testing qm.func.isObjInRightFormat()", function () {
		equal("", qm.func.isObjInRightFormat({
				inputs : "A,B,C,D,E",
				minterms : "5,7,11,12,27,29",
				dontNeeds : "14,20,21,22,23"
			}));
	});
	test("Testing qm.func.getGroupedMTFromNumArr()", function () {
		deepEqual(({
				keys : [1],
				1 : [{
						minterms : "1",
						value : "1"
					}
				]
			}), qm.func.getGroupedMTFromNumArr([1]));
	});
	test("Testing qm.func.getPrimeImplicantsFromMinterms()", function () {
		deepEqual([{
					"minterms" : "0,4",
					"value" : "-00"
				}, {
					"minterms" : "0,1",
					"value" : "00-"
				}
			], qm.func.getPrimeImplicantsFromMinterms(qm.func.getGroupedMTFromNumArr([0, 1, 4])));
		deepEqual([{
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
			], qm.func.getPrimeImplicantsFromMinterms(qm.func.getGroupedMTFromNumArr([5, 7, 21, 23, 20, 21, 22, 12, 14, 21, 29, 11, 27])));
	});
	test("Testing qm.func.getObjFromStrSplit()", function () {
		deepEqual(({}), qm.func.getObjFromStrSplit("", ""));
		deepEqual(({
				0 : 1
			}), qm.func.getObjFromStrSplit("0"));
		deepEqual(({
				0 : null
			}), qm.func.getObjFromStrSplit("0", null, null));
		deepEqual(({
				3 : 1,
				2 : 1,
				1 : 1,
				0 : 1
			}), qm.func.getObjFromStrSplit("0,1,2,3"));
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
		equal(-1, qm.func.getIndexOfPIWithMaxLenInMidTerm([], PITest));
		equal(0, qm.func.getIndexOfPIWithMaxLenInMidTerm([0], PITest));
		equal(2, qm.func.getIndexOfPIWithMaxLenInMidTerm([0, 1, 2], PITest));
		equal(4, qm.func.getIndexOfPIWithMaxLenInMidTerm([0, 4], PITest));
	});
	test("Testing qm.func.getMTWithPIMatchAndAddPILenToPI()", function () {
		var mtObj2 = qm.func.getObjFromStrSplit("0,1,4", ",", function () {
				return {
					"PIs" : [],
					"PIsKeys" : {}
				};
			}),
		PITest2 = qm.func.getPrimeImplicantsFromMinterms(qm.func.getGroupedMTFromNumArr([0, 1, 4]));
		deepEqual(({
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
			}), qm.func.getMTWithPIMatchAndAddPILenToPI(mtObj2, PITest2));
		deepEqual([{
					minterms : "0,4",
					value : "-00",
					matchLength : 2
				}, {
					minterms : "0,1",
					value : "00-",
					matchLength : 2
				}
			], PITest2);
	});
	test("Testing qm.func.getLeastPrimeImplicantsByGraph()", function () {
		var mtStr2 = "0,1,4";
		PITest2 = qm.func.getPrimeImplicantsFromMinterms(qm.func.getGroupedMTFromNumArr([0, 1, 4]));
		deepEqual([{
					minterms : "0,4",
					value : "-00"
				}, {
					minterms : "0,1",
					value : "00-"
				}
			], qm.func.getLeastPrimeImplicantsByGraph(mtStr2, PITest2));
		mtStr2 = "5,7,11,12,14,20,21,22,23,27,29";
		deepEqual([{
					minterms : "21,29",
					value : "1-101"
				}, {
					minterms : "11,27",
					value : "-1011"
				}, {
					minterms : "5,7,21,23",
					value : "-01-1"
				}, {
					minterms : "20,21,22,23",
					value : "101--"
				}, {
					minterms : "12,14",
					value : "011-0"
				}
			], qm.func.getLeastPrimeImplicantsByGraph(mtStr2, qm.func.getPrimeImplicantsFromMinterms(qm.func.getGroupedMTFromNumArr(mtStr2.split(",")))));
		
		// Test that need equals.
		var userInputObj = {
			inputs : "A,B,C,D",
			minterms : "2,4,6,8,9,10,12,13,15"
		},
		userInputObj2 = {
			dontNeeds : "5,18,19,21,23",
			inputs : "A,B,C,D,E",
			minterms : "2,3,7,10,12,15,27"
		};
		deepEqual(({
				0 : ["B*CD*", "A*BD*", "AB*D*", "AC*", "ABD"],
				1 : ["-010", "01-0", "10-0", "1-0-", "11-1"]
			}),
			qm.func.getLeastPI(userInputObj));
		deepEqual(({
				0 : ["B*C*D", "A*C*DE*", "A*BCD*E*", "A*CDE", "AC*DE"],
				1 : ["-001-", "0-010", "01100", "0-111", "1-011"]
			}),
			qm.func.getLeastPI(userInputObj2));
	});
};
var reRunTests = function () {
	QUnit.reset(); // should clear the DOM
	QUnit.init(); // resets the qunit test environment
	QUnit.start(); // allows for the new test to be captured.
	runTests();
};