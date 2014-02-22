describe("CoverageTable", function () {
	describe("CoverageTable", function () {
		var o = new CoverageTable();
		var x;
		o.setMinterms([1]);
		o.addPrimeImp("1", [1]);
		o.updateMintermsInPrimeImps();
		it("should . ", function () {
			assert.deepEqual(o.getActivePrimeImps(), []);
		});
		it("should . ", function () {
			x = o.getEssentialPrimeImps();
			assert.deepEqual(x, [0]);
		});
		it("should . ", function () {
			o.usePrimeImps(x);
			o.updateMintermsInPrimeImps();
			assert.equal(o.getActivePrimeImps().length, 1);
		});
	});
	describe("CoverageTable test2", function () {
		var o = new CoverageTable();
		var x;
		o.setMinterms([4, 5, 6, 8, 9, 10, 13]);
		o.addPrimeImp("0-00", [0, 4]);
		o.addPrimeImp("-000", [0, 8]);
		o.addPrimeImp("100-", [8, 9]);
		o.addPrimeImp("10-0", [8, 10]);
		o.addPrimeImp("1-01", [9, 13]);
		o.addPrimeImp("01--", [4, 5, 6, 7]);
		o.addPrimeImp("-1-1", [5, 7, 13, 15]);
		o.updateMintermsInPrimeImps();

		it("should . ", function () {
			assert.deepEqual(o.getActivePrimeImps(), []);
			x = o.getEssentialPrimeImps();
		});
		it("should . ", function () {
			assert.equal(x.length, 2);
		});
 
		it("should . ", function () {
			o.usePrimeImps(x);
			o.updateMintermsInPrimeImps();
			assert.equal(o.getActivePrimeImps().length, 2);
		});
	});
	describe("CoverageTable test3", function () {
		var o = new CoverageTable();
		o.setMinterms([5, 7, 21, 23, 20, 21, 22, 12, 14, 21, 29, 11, 27]);
		o.addPrimeImp("011-0", [12, 14]);
		o.addPrimeImp("-1011", [11, 27]);
		o.addPrimeImp("1-101", [21, 29]);
		o.addPrimeImp("-01-1", [5, 7, 21, 23]);
		o.addPrimeImp("101--", [20, 21, 22, 23]);
		it("should . ", function () {
			o.solve();
			assert.equal(o.foundAnswer(), true);
		});
	});
});
