// Test cases for ArrayUtil
if (!chai) {
	var chai = this.require("chai");
}
var assert = chai.assert;

describe("ArrayUtil", function () {
	describe("#insertionSort()", function () {
		var func = ArrayUtil.insertionSort;
		it("should return an empty array when passed an empty array", function () {
			assert.deepEqual(func([]), []);
		});
		it("should sort array of numbers numerical", function () {
			assert.deepEqual(func([1]), [1]);
			assert.deepEqual(func([1, 2]), [1, 2]);
			assert.deepEqual(func([0, 0, 0]), [0, 0, 0]);
			assert.deepEqual(func([1, 2, 1]), [1, 1, 2]);
			assert.deepEqual(func([0, -1]), [-1, 0]);
			assert.deepEqual(func([1, 2, -1]), [-1, 1, 2]);
			assert.deepEqual(func([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
			assert.deepEqual(func([50, 1000000, 20000, 5, 4, 3, 2, 1, -10000, 0]), [-10000, 0, 1, 2, 3, 4, 5, 50, 20000, 1000000]);
			assert.deepEqual(func([5, 4, 5, 4, 5, 4, 5, 4, 5, 3, 2, 3, 2, 3, 1]), [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]);
		});
	});
	describe("#getUniqueNumbers()", function () {
		var fn = ArrayUtil.getUniqueNumbers;
		it("should return an empty array when passed an empty array", function () {
			assert.deepEqual(fn([]), []);
		});
		it("should return an array of numbers with only unique numbers.", function () {
			assert.deepEqual(fn([1, 1, 1, 1]), [1]);
			assert.deepEqual(fn([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]), [1, 2, 3, 4, 5]);
			assert.deepEqual(fn([3, 3, 3, 2, 2, 1]), [3, 2, 1]);
			assert.deepEqual(fn([1, 2, 2, 3, 3, 3, 2, 2, 1]), [1, 2, 3]);
		});
	});
	describe("#getUniqueSortedNumbers()", function () {
		var fn = ArrayUtil.getUniqueSortedNumbers;
		it("should return an empty array when passed an empty array", function () {
			assert.deepEqual(fn([]), []);
		});
		it("should return an sorted array of numbers with only unique numbers.", function () {
			assert.deepEqual(fn([1]), [1]);
			assert.deepEqual(fn([1, 2]), [1, 2]);
			assert.deepEqual(fn([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
			assert.deepEqual(fn([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]), [1, 2, 3, 4, 5]);
			assert.deepEqual(fn([3, 3, 3, 2, 2, 1]), [1, 2, 3]);
			assert.deepEqual(fn([1, 10, 3, 10, 10, 10, 5, 3, 2, 1]), [1, 2, 3, 5, 10]);
		});
	});
	describe("#compareSets()", function () {
		var fn = ArrayUtil.compareSets;
		it("should return 0 when the first set contains all the elements of the second set.", function () {
			assert.equal(fn([1, 2, 3, 4, 5], [1, 2, 3]), 0);
			assert.equal(fn([1, 2, 3], [1, 2, 3]), 0);
			assert.equal(fn([1, 2, 3], [1]), 0);
		});
		it("should return 1 when the second set contains all the elements of the first set.", function () {
			assert.equal(fn([1, 2, 3], [1, 2, 3, 4, 5]), 1);
			assert.equal(fn([1], [1, 2, 3]), 1);
		});
		it("should -1 when any of the sets are not a subset of each other.", function () {
			assert.equal(fn([1, 2], [1, 3]), -1);
			assert.equal(fn([1, 2], [2, 3]), -1);
			assert.equal(fn([1, 2], [3]), -1);
			assert.equal(fn([1, 2], [3, 4]), -1);
		});
	});
});
