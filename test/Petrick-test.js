/*
+ Screnario 1: Petrick method can not operate on invalid input.
Given the petrick class was given anything not POS terms
When the developer calls the petrick method
Then ensure an error is thrown about the invalid input

+ Screnario 2: Petrick method can not operate on input that does not have duplicate literals.
Given the petrick class was set with POS terms
and the POS terms contains a unqiue element
When the developer calls the petrick method
Then ensure an error is thrown about the input not having duplicate literals

+ Screnario 3: Petrick method returns least SOP term from POS to SOP conversion.
Given the petrick class was set with POS terms
and the POS terms contain no unique elements
When the developer calls the petrick method
Then ensure the POS terms gets converted to SOP terms
and ensure the smallest terms SOP is returned
*/
ArrayUtil.getUniqueElementsInArrayOfArrays = function(){
};
Class PetrickMethod
	constructor (@POSs): ->
	execute: ->
	getSmallestSOPsFromPOS: ->
	checkInput: ->
	getUniquePOS: ->
 
Class LiteralSet
	has: (el) ->
	add: (el) ->
	set: (el) ->
	toArray: ->
 
describe("Petrick Method", function(){
	describe("#getSmallestSOPs()", function(){
		it("should throw an error if operating on anything not POS terms");
	}); 
	describe("", function(){
  
	});
	describe("", function(){
  
	});
});
