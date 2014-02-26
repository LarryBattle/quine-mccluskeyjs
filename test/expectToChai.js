// Provides an interface for partical chai.js  support.
assert = {};
assert.deepEqual = function (a, b, msg) {
	expect(a).to.be.eql(b);
};
assert.equal = function (a, b, msg) {
	expect(a).to.be.equal(b);
};
assert.throws = function (fn, msg) {
	expect(fn).to.throwError();
};
assert.lengthOf = function (a, b, msg) {
	expect(a).to.have.length(b);
};
