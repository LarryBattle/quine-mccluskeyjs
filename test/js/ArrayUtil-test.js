// Test cases for ArrayUtil

describe("ArrayUtil", function () {
	describe("#is2dArray()", function () {
		var fn = ArrayUtil.is2dArray;
		it("should return false when not given an 2d array", function(){
			assert.equal(fn(), false);
			assert.equal(fn([]), false);
			assert.equal(fn([1,2,3]), false);
			assert.equal(fn(true), false);
			assert.equal(fn(function(){}), false);
			assert.equal(fn({}), false);
		});
		it("should return true when given an 2d array", function(){
			assert.equal(fn([[]]), true);
			assert.equal(fn([[1,2,3]]), true);
			assert.equal(fn([[0,1,2,3], [1,2]]), true);
			assert.equal(fn([[null]]), true);
		});
	});
	describe("#getUniqueElementsIn2dArray()", function () {
		var fn = ArrayUtil.getUniqueElementsIn2dArray;
		it("should return throw an error if an array of array list isn't passed.", function () {
			assert.throws(function () {
				fn("ok");
			});
			assert.throws(function () {
				fn([0]);
			});
			assert.throws(function () {
				fn(["ok"]);
			});
			assert.throws(function () {
				fn(false);
			});
			assert.throws(function () {
				fn(function () {});
			});
		});
		it("should return an empty array when an empty array is passed.", function () {
			assert.deepEqual(fn([]), []);
		});
		it("should return an empty array when there are no unique elements within the 2d array.", function () {
			assert.deepEqual(fn([[1,2,3],[1,2,3]]), []);
			assert.deepEqual(fn([[1],[1,2,3],[2,3,4],[4,6,6]]), []);
			assert.deepEqual(fn([[1,1],[2,2,4],[3,3],[4]]), []);
		});
		it("should return the unique element inside an 2d array with only one unique element.", function(){
			assert.deepEqual(fn([[1]]), [1]);
			assert.deepEqual(fn([[1,2,3],[1,3]]), [2]);
			assert.deepEqual(fn([["dog", "cat", "duck"],["dog", "cat"]]), ["duck"]);
		});
		it("should return the unique elements inside an 2d array with a few unique elements.", function(){
			assert.deepEqual(fn([[1],[2]]), [1,2]);
			assert.deepEqual(fn([[1,2,3],[1,3,4]]), [2,4]);
			assert.deepEqual(fn([[1,2,3],[1,2,3,4],[1,2,5],[1,6],[7]]), [4,5,6,7]);
		});
	});
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
