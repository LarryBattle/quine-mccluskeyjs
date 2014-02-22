describe("SimpleSet", function () {
	describe("#addElement()", function () {
		it("should add a single element to the set", function () {
			var o = new SimpleSet();
			o.addElement(1);
			assert.equal(o.size(), 1);
		});
		it("should only add the same element once to the set", function () {
			var o = new SimpleSet();
			o.addElement(1);
			o.addElement(1);
			o.addElement(1);
			assert.equal(o.size(), 1);
		});
	});
	describe("#addElements()", function () {
		it("should add elements to the set", function () {
			var o = new SimpleSet();
			o.addElements([1, 2]);
			assert.equal(o.size(), 2);
		});
		it("should only add unique elements to the set", function () {
			var o = new SimpleSet();
			o.addElements([1, 2]);
			o.addElements([1, 2]);
			assert.equal(o.size(), 2);
		});
	});
	describe("#hasElement()", function () {
		var o = new SimpleSet();
		o.addElements([1, 2]);
		it("should return true when searching for an existing element.", function(){
			assert.equal(o.hasElement(1), true);
			assert.equal(o.hasElement(2), true);
		});
		it("should return false when searching for an non-existing element", function(){
			assert.equal(o.hasElement(3), false);
			assert.equal(o.hasElement([1,2]), false);
		});
	});
	describe("#toArray()", function () {
		it("should return an empty array for an empty set.", function(){
			var o = new SimpleSet();
			assert.deepEqual(o.toArray(), []);
		});
		it("should return an non-empty array for a non-empty set.", function(){
			var o = new SimpleSet();
			o.addElement(1);
			assert.deepEqual(o.toArray(), [1]);
			o.addElement(2);
			assert.deepEqual(o.toArray(), [1,2]);
		});
	});
});
