/*
+ Scenario 3: Petrick method returns least SOP term from POS to SOP conversion.
Given the Petrick class was set with POS terms
and the POS terms contain no unique elements
When the developer calls the Petrick method
Then ensure the POS terms gets converted to SOP terms
and ensure the terms with the least SOP literals are returned
 */
describe("Petrick", function () {
	describe("#setPOSs()", function () {
		var o = new Petrick();

		it("should throw an error when not given an 2d array", function () {
			assert.throws(function () {
				o.setPOSs();
			});
			assert.throws(function () {
				o.setPOSs("test");
			});
			assert.throws(function () {
				o.setPOSs(true);
			});
			assert.throws(function () {
				o.setPOSs(["test"]);
			});
			assert.throws(function () {
				o.setPOSs(function () {});
			});
		});
		it("should throw an error if there is an unique element inside the passed 2d array", function () {
			assert.throws(function () {
				o.setPOSs([[1, 2], [1, 2], [3]]);
			});
			assert.throws(function () {
				o.setPOSs([[1, 2], [1, 2], [1, 2, 3]]);
			});
			assert.throws(function () {
				o.setPOSs([[1]]);
			});
		});
	});
	describe("#expandTermIntoGroup()", function () {
		var fn = Petrick.expandTermIntoGroup;
		it("should thrown an error if the inputs aren't arrays.", function () {
			assert.throws(function () {
				fn();
			});
			assert.throws(function () {
				fn([]);
			});
			assert.throws(function () {
				fn(null,[]);
			});
		});
		it("should return an empty array when both inputs are empty.", function () {
			assert.lengthOf(fn([], []), 0);
			assert.lengthOf(fn([], [[]]), 0);
		});
		it("should return the one element when one term is multiple by nothing.", function () {
			assert.lengthOf(fn([], [[1]]), 1);
			assert.lengthOf(fn([], [[1,2,3]]), 1);
			assert.lengthOf(fn([1], []), 1);
			assert.lengthOf(fn([1,2], []), 1);
		});
		it("should return the one element when one term is multiple by one term.", function () {
			assert.lengthOf(fn([1], [[1]]), 1);
			assert.lengthOf(fn([1, 2], [[1]]), 1);
			assert.lengthOf(fn([1, 2, 3], [[1]]), 1);
			assert.lengthOf(fn([1], [[1, 2]]), 1);
			assert.lengthOf(fn([1], [[1, 2, 3]]), 1);
		});
		it("should return the 2 element when one term is multiple by one term.", function () {
			assert.lengthOf(fn([1], [[1], [2]]), 2);
			assert.lengthOf(fn([1, 2], [[1], [2]]), 2);
			assert.lengthOf(fn([1, 2, 3], [[1], [2]]), 2);
		});
		it("should return the 5 element when one term is multiple by 5 terms.", function () {
			assert.lengthOf(fn([1], [[1], [1,2], [1,2,3], [1,2,3,4],[1,2,3,4,5] ]), 5);
			assert.lengthOf(fn([1, 2], [[1], [1,2], [1,2,3], [1,2,3,4],[1,2,3,4,5] ]), 5);
			assert.lengthOf(fn([1, 2, 3], [[1], [1,2], [1,2,3], [1,2,3,4],[1,2,3,4,5] ]), 5);
		});
	});
	describe("#expandPOS()", function(){
		var fn = Petrick.expandPOS;
		it("should expand () to itself", function(){
			assert.lengthOf( fn([]), 0);
		});
		it("should expand a single term to one term", function(){
			assert.lengthOf( fn([[[1]]]), 1);
			assert.lengthOf( fn([[[1,2]]]), 1);
			assert.lengthOf( fn([[[1,2,3]]]), 1);
		});
		it("should expand (p1)(p2) to 1 terms (p1p2)", function(){
			assert.lengthOf( fn([[[1]], [[2]]]), 1);
		});
		it("should expand (p1)(p2)(p3) to 1 terms (p1p2p3)", function(){
			assert.lengthOf( fn([[[1]], [[2]], [[3]]]), 1);
		});
		it("should expand (p1 + p2)(p3) to 2 terms (p1p3 + p2p3)", function(){
			assert.lengthOf( fn([[[1],[2]],[[3]]]), 2);
		});
		it("should expand (p1)(p2 + p3) to 2 terms (p1p2 + p1p3)", function(){
			assert.lengthOf( fn([[[1]],[[2],[3]]]), 2);
		});
		it("should expand (p1 + p2)(p3 + p4) to 4 terms (p1p3 + p1p4 + p2p3 + p2p4)", function(){
			assert.lengthOf( fn([[[1],[2]],[[3],[4]]]), 4);
		});
		it("should expand (p1 + p2)(p3 + p4 + p5) to 4 terms (p1p3 + p1p4 + p1p5 + p2p3 + p2p4 + p2p5)", function(){
			assert.lengthOf( fn([[[1],[2]],[[3],[4],[5]]]), 6);
		});
		it("should expand (p1 + p2)(p1 + p3)(p3 + p4 + p5) to 12 terms (p1p3 + p1p4 + p1p5 + p1p2p3 + p1p2p4 + p1p2p5 + p1p3 + p1p3p4 + p1p3p5 + p2p3 + p2p3p4 + p2p3p5)", function(){
			assert.lengthOf( fn([[[1],[2]],[[1],[3]],[[3],[4],[5]]]), 12);
		});
	});
	describe("#getSOPs()", function () {
		var o = new Petrick();
		it("should throw an error when called without setting the POSs", function () {
			assert.throws(function () {
				o.getSOPs();
			});
		});
		it("should return an 2d array of SOPs from the expansion of POSs. ", function () {
			o.setPOSs([[1], [1]]);
			assert.lengthOf(o.getSOPs(), 1, "2 groups of 1 element");

			o.setPOSs([[1, 2], [1, 2]]);
			assert.lengthOf(o.getSOPs(), 2, "2 groups of the same 2 elements");

			o.setPOSs([[1, 2], [1, 2], [1, 2]]);
			assert.lengthOf(o.getSOPs(), 2, "3 groups of the same 2 elements");

			o.setPOSs([[1, 2], [1, 2], [1, 2], [1, 2], [1, 2]], "5 groups of the same 2 elements");
			assert.lengthOf(o.getSOPs(), 2);
		});
	});
});

// getSmallestSOPsFromPOS: ->
// checkInput: ->
// getUniquePOS: ->

// describe("Petrick Method", function () {
// describe("#expandTerms()", function () {
// var fn = petrick.expandTerms;
// it.skip("should  with simple input", function () {
// assert.deepEqual(fn([]), []);
// assert.deepEqual(fn([[1]]), [[1]]);
// assert.deepEqual(fn([[1, 2]]), [[1, 2]]);
// assert.deepEqual(fn([[1], [2]]), [[1, 2]]);
// assert.deepEqual(fn([[1], [2, 3]]), [[1, 2], [1, 3]]);
// assert.deepEqual(fn([[1, 3]], [2]), [[1, 2], [1, 3]]);
// });
// it.skip("should with complex input", function () {
// assert.deepEqual(fn([[1, 2], [3, 4]]), [[1, 3], [1, 4], [2, 3], [2, 4]]);
// assert.deepEqual(fn([[1, 2, 3], [4, 5, 6]]), [[1, 4], [1, 5], [1, 6], [2, 4], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6]]);
// assert.deepEqual(fn([[1], [3, 4], [5, 6]]), [[1, 3, 5], [1, 3, 6], [1, 4, 5], [1, 4, 6]]);
// assert.deepEqual(fn([[1, 2], [3, 4], [1, 3], [5, 6], [2, 5], [4, 6]]), [
// [1, 4, 5], [1, 3, 5, 6], [2, 3, 4, 5], [2, 3, 5, 6], [1, 2, 4, 6], [1, 2, 3, 6], [2, 3, 4, 6], [2, 3, 6]
// ]);
// });
// });
// });
