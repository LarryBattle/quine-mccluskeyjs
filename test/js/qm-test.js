describe("qm", function () {
	describe("#func.checkFormatOfUserInput()", function () {
		var func = qm.func.checkFormatOfUserInput;
		it("should ?", function () {
			var obj = {
				inputs : "A,B,C,D,E",
				minterms : "5,7,11,12,27,29",
				dontNeeds : "14,20,21,22,23"
			};
			assert.equal(func(obj), "");
		});
	});
	describe("#func.getPrimeImplicantsFromMinterms()", function () {
		var func = function (arr, binaryLength) {
			return qm.func.getPrimeImplicantsFromMinterms(arr, binaryLength);
		};
		it("should ?", function () {
			var arr = [{
					"minterms" : [0, 1],
					"value" : "00-"
				}, {
					"minterms" : [0, 4],
					"value" : "-00"
				}
			];
			assert.deepEqual(func([0, 1, 4], 3), arr);
		});
		it("should ?", function () {
			var arr = [{
					minterms : [12, 14],
					value : "011-0"
				}, {
					minterms : [11, 27],
					value : "-1011"
				}, {
					minterms : [21, 29],
					value : "1-101"
				}, {
					minterms : [5, 7, 21, 23],
					value : "-01-1"
				}, {
					minterms : [20, 21, 22, 23],
					value : "101--"
				}
			];

			assert.deepEqual(func([5, 7, 21, 23, 20, 21, 22, 12, 14, 21, 29, 11, 27], 5), arr);
		});
	});

	describe("#func.getMatchLenAfterAppendPIToMT()", function () {
		it("should ?", function () {
			var mtObj = StringUtil.splitToObject("1,2,3,4", ",", (function () {
						return {
							"PIs" : [],
							"PIsKeys" : {}
						};
					}));
			assert.equal(1, qm.func.getMatchLenAfterAppendPIToMT(0, "0,4", mtObj));
			assert.deepEqual([0], mtObj[4].PIs);
		});
	});
	describe("#func.getLeastPrimeImplicantsByGraph()", function () {
		var func = qm.func.getLeastPrimeImplicantsByGraph;
		var func2 = function (arr, binaryLength) {
			return qm.func.getPrimeImplicantsFromMinterms(arr, binaryLength);
		};
		var sortOldPrimeImpsFunc = function (x, y) {
			var a = String(x.minterms);
			var b = String(y.minterms);
			return a.localeCompare(b);
		};
		it("should return two prime implicants when supplied with 0,1,4 as minterms.", function () {
			var mtStr2 = "0,1,4";
			var PITest2 = func2(mtStr2.split(","), 3);
			var arr = [{
					minterms : "0,1",
					value : "00-"
				}, {
					minterms : "0,4",
					value : "-00"
				}
			];
			assert.deepEqual(func(mtStr2, PITest2), arr);
		});
		it("should return five prime implicants when supplied with 5,7,11,12,14,20,21,22,23,27,29 as minterms.", function () {
			var mtStr2 = "5,7,11,12,14,20,21,22,23,27,29";
			var PITest = func2(mtStr2.split(","), 5);
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
			assert.deepEqual(func(mtStr2, PITest).sort(sortOldPrimeImpsFunc), arr.sort(sortOldPrimeImpsFunc));
		});
	});
	describe("#func.getLeastPI()", function () {
		var func = qm.func.getLeastPI;
		it("should return 5 elements of a boolean algebra and binary expressions when ABCD are inputs and 2,4,6,8,9,10,12,13,15 are minterms.", function () {
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
			assert.deepEqual(func(input), obj);
		});
		it("should return 6 elements of a boolean algebra and binary expressions when ABCDE are inputs and 2,3,7,10,12,15,27 are minterms and 5,18,19,21,23 as the don't needs.", function () {
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
			assert.deepEqual(func(input), obj);
		});
	});
	describe("#getLeastPrimeImplicants()", function () {
		var fn = qm.getLeastPrimeImplicants;
		it("should return the boolean expression 'AC* + ABD + A*BD* + B*CD*' when the inputs are ABCD and minterms are 2,4,6,8,9,10,12,13,15.", function () {
			var userInput = {
				inputs : "A,B,C,D",
				minterms : "2,4,6,8,9,10,12,13,15"
			};
			var a = fn(userInput);
			assert.equal(a, "AC* + ABD + A*BD* + B*CD*");
		});
	});
	describe("#simplify()", function () {
		var fn = qm.simplify;

		it("should return the same expression when the expression contains a single term of one input from one input.", function () {
			assert.equal(fn("A".split(","), "A"), "A");
			assert.equal(fn("A".split(","), "A*"), "A*");
		});
		it("should return the same expression when expression contains a single term of one input from multiple inputs.", function () {
			assert.equal(fn("A,B".split(","), "A"), "A");
			assert.equal(fn("A,B".split(","), "A*"), "A*");
			assert.equal(fn("A,B".split(","), "B"), "B");
			assert.equal(fn("A,B".split(","), "B*"), "B*");
		});
	});
});
