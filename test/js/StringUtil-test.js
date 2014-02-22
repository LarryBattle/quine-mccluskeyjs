// StringUtil Testcases
if (!chai && this.require) {
	var chai = this.require("chai");
}
var assert = chai.assert;

describe("StringUtil", function () {
	describe("#splitToObject()", function () {
		var func = StringUtil.splitToObject;
		it("should split an empty string with an empty delimiter into a simple object.", function () {
			assert.deepEqual(func("", ""), {
				"" : 1
			});
		});
		it("should split an non-empty string with an no delimiter into a simple object.", function () {
			assert.deepEqual(func("0"), {
				0 : 1
			});
		});
		it("should split an comma delimited string into a simple object.", function () {
			var obj = {
				3 : 1,
				2 : 1,
				1 : 1,
				0 : 1
			};
			assert.deepEqual(func("0,1,2,3"), obj);
		});
	});
	describe("#indexesOf()", function () {
		var func = StringUtil.indexesOf;
		it("should return all the character indexes of a character within a string.", function () {
			assert.deepEqual(func("", ""), []);
			assert.deepEqual(func("1", "2"), []);
			assert.deepEqual(func("1111", "1"), [0, 1, 2, 3]);
			assert.deepEqual(func("--11-", "1"), [2, 3]);
		});
	});
	describe("#sharedIndexesOf()", function () {
		var func = StringUtil.sharedIndexesOf;
		it("should return an empty array when two strings do not share a common character at the same index.", function () {
			assert.deepEqual(func("", "", ""), []);
			assert.deepEqual(func("1", "123", "2"), []);
			assert.deepEqual(func("1111", "123", "1"), []);
			assert.deepEqual(func("--11-", "--31-", "1"), []);
		});
		it("should return the indexes where two strings share a common character.", function () {
			assert.deepEqual(func("-", "-", "-"), [0]);
			assert.deepEqual(func("--", "--", "-"), [0, 1]);
			assert.deepEqual(func("111-1", "123-5", "-"), [3]);
			assert.deepEqual(func("--11-", "--31-", "-"), [0, 1, 4]);
		});
	});
	describe("#getUniqueSortedNumberString()", function () {
		var func = StringUtil.getUniqueSortedNumberString;
		it("should return an string of comma delimited numbers when supplied with a string of unsorted numbers separated by commas.", function () {
			assert.equal(func("12,14,11,27,21,29,23,5,7,20,22", ","), "5,7,11,12,14,20,21,22,23,27,29");
		});
	});
	describe("#replaceCharAtIndex()", function () {
		var func = StringUtil.replaceCharAtIndex;
		it("should return a string with a character replaced by index.", function () {
			assert.equal(func("5", 0, "1"), "1");
			assert.equal(func("444", 0, "1"), "144");
			assert.equal(func("444", 1, "1"), "414");
			assert.equal(func("444", 2, "1"), "441");
			assert.equal(func("1211", 1, "1"), "1111");
			assert.equal(func("3", [0], "1"), "1");
			assert.equal(func("144", [1, 1], ""), "1");
			assert.equal(func("1234", [1, 2, 3], "1"), "1111");
		});
	});
	describe("#replaceOneDiff()", function () {
		var func = StringUtil.replaceOneDiff;
		it("should return an empty string when two strings do not share exactly one difference between a character.", function () {
			assert.equal(func("01", "111", "-"), "");
			assert.equal(func("1111-", "-1111", "-"), "");
			assert.equal(func("---", "-00", "-"), "");
			assert.equal(func("1", "-1101", "-"), "");
			assert.equal(func("11-", "-1101", "-"), "");
			assert.equal(func("1", "1", "-"), "");
			assert.equal(func("-", "1", "-"), "");
		});
		it("should return a new string placed a character when two string contain exactly one difference", function () {
			assert.equal(func("0", "1", "-"), "-");
			assert.equal(func("1", "0", "-"), "-");
			assert.equal(func("01", "00", "-"), "0-");
			assert.equal(func("01", "11", "-"), "-1");
			assert.equal(func("01", "00", "-"), "0-");
			assert.equal(func("111", "011", "-"), "-11");
			assert.equal(func("0111", "1111", "-"), "-111");
			assert.equal(func("1111", "0111", "-"), "-111");
			assert.equal(func("101-1", "111-1", "-"), "1-1-1");
			assert.equal(func("1---", "0---", "-"), "----");
		});
	});
	describe("#copy()", function () {
		var func = StringUtil.copy;
		it("should return a new string that duplication of a string x number of times.", function () {
			assert.equal(func("1"), "1");
			assert.equal(func("1", 1), "1");
			assert.equal(func("#", 2), "##");
			assert.equal(func("*", 5), "*****");
			assert.equal(func("1", 5), "11111");
		});
	});
});
