// Sample Mocha Test

var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

describe("Array", function(){
  describe("#indexOf()", function(){
    it("should return -1 when the value is not present", function(){
      var arr = [];
      assert.equal(-1, arr.indexOf(5));
      assert.equal(-1, arr.indexOf(0));
      expect(arr).to.been.that.a("string");
    });
    it("should return  when the value is not present");
  });
});
