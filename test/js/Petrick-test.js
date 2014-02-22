/*
+ Scenario 3: Petrick method returns least SOP term from POS to SOP conversion.
Given the Petrick class was set with POS terms
and the POS terms contain no unique elements
When the developer calls the Petrick method
Then ensure the POS terms gets converted to SOP terms
and ensure the terms with the least SOP literals are returned
 */
 describe("Petrick", function(){
	describe("#setPOSs()", function(){
		var o = new Petrick();
		
		it("should throw an error when not given an 2d array", function(){
			assert.throws( function(){
				o.setPOSs();
			});
			assert.throws( function(){
				o.setPOSs("test");
			});
			assert.throws( function(){
				o.setPOSs(true);
			});
			assert.throws( function(){
				o.setPOSs(["test"]);
			});
			assert.throws( function(){
				o.setPOSs(function(){});
			});
		});
		it("should throw an error if there is an unique element inside the passed 2d array", function(){
			assert.throws( function(){
				o.setPOSs([[1,2],[1,2],[3]]);
			});
			assert.throws( function(){
				o.setPOSs([[1,2],[1,2],[1,2,3]]);
			});
			assert.throws( function(){
				o.setPOSs([[1]]);
			});
		});
	});
	describe("#getSOPs()", function(){	
		var o = new Petrick();
		it("should throw an error when called without setting the POSs", function(){
			assert.throws(function(){
				o.getSOPs();
			});
		});
		it("should return an 2d array of SOPs from the expansion of POSs. ", function(){
			o.setPOSs([[1],[1]]);
			assert.lengthOf(o.getSOPs(), 1, "2 groups of 1 element");
			
			o.setPOSs([[1,2],[1,2]]);
			assert.lengthOf(o.getSOPs(), 2, "2 groups of the same 2 elements");
			
			o.setPOSs([[1,2],[1,2],[1,2]]);
			assert.lengthOf(o.getSOPs(), 2, "3 groups of the same 2 elements");
			
			o.setPOSs([[1,2],[1,2],[1,2],[1,2],[1,2]], "5 groups of the same 2 elements");
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
