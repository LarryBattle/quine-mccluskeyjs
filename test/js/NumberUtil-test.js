
describe("NumberUtil", function () {
	describe("#decToBin()", function () {
		var func = NumberUtil.decToBin;
		it("should convert an decimal value to a binary value.", function () {
			assert.equal(func(0), "0");
			assert.equal(func(1), "1");
			assert.equal(func(10), "1010");
			assert.equal(func(0, 5), "00000");
			assert.equal(func(1, 5), "00001");
			assert.equal(func(10, 5), "01010");
			assert.equal(func(10, 5), "01010");
			assert.equal(func(31, 5), "11111");
		});
	});
	describe("#decsToBins()", function () {
		var func = NumberUtil.decsToBins;
		it("should return an empty array when supplied with an empty array", function () {
			assert.deepEqual(func([]), []);
		});
		it("should return convert an array of decimals to an array of binaries", function () {
			assert.deepEqual(func([0]), ["0"]);
			assert.deepEqual(func([1]), ["1"]);
			assert.deepEqual(func([0, 1]), ["0", "1"]);
			assert.deepEqual(func([0, 1, 2, 3]), ["00", "01", "10", "11"]);
			assert.deepEqual(func([10, 11, 12, 13]), ["1010", "1011", "1100", "1101"]);
			assert.deepEqual(func([0, 1, 2, 31]), ["00000", "00001", "00010", "11111"]);
			assert.deepEqual(func([0, 1, 2, 3], 5), ["00000", "00001", "00010", "00011"]);
			assert.deepEqual(func([0, 1, 2, 2, 3, 3, 3], 5, true), ["00000", "00001", "00010", "00011"]);
		});
	});
});
