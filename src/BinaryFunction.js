/**
@purpose Provides Validation of a boolean algebra function using a true table.
@author Larry Battle
@date Feb 6, 2014
@example

	var bFn = BF.formBooleanFunctionFromBinaryArray("11-1,1-0-,01-0,-010".split(","));
	var mts = [2,4,6,8,9,10,12,13,15];
	BF.test(mts, bFn); // returns [].

*/
var BinaryFunction = function () {};
var BF = BinaryFunction;
BinaryFunction.getArgNameAtIndex = function (i) {
	var length_of_alphabeth = 26,
	charCode_a = 97,
	suffix = "";
	if (length_of_alphabeth <= i) {
		suffix = Math.floor(i / length_of_alphabeth);
		i = i % length_of_alphabeth;
	}
	return String.fromCharCode(charCode_a + i) + suffix;
};
BinaryFunction.getAllArgNames = function (depth) {
	var names = [];
	for (var i = 0, len = parseInt(depth, 10); i < len; i++) {
		names.push(BinaryFunction.getArgNameAtIndex(i));
	}
	return names;
};
// Converts object where the values equals 1 and keys are values of the array.
// @param {Array} arr
// @return {Object}
BinaryFunction.convertArrayToHashTable = function(arr){
	var obj = {};
	for(var i = 0, len = arr.length; i < len; i++){
		obj[ arr[i] ] = 1;
	}
	return obj;
};
// Runs a boolean function through a true table.
// @param {Array} minterms - array of minterms (index numbers). 
// When a minterm(index value) is passed to the binary/boolean function, 
// the result should be true, else false.
// If there is a mismatch then it's return in the error list.
// @param {Function} fn - Forms a truth table based on the length of the function parameters.
// This function should return true or false.
// @returns {Array} returns a array errors. Max length 50
// @example
// BF.test([0,1], function(a,b){ return !a;}); // returns []
// BF.test([0,1,2], function(a,b){ return !a;}); // returns [{"index":2,"expected":true,"output":false}]
BF.test = function( minterms, fn){
	var MAX_FUNC_ARGUMENTS = 27;
	if( !Array.isArray( minterms ) || (0 < minterms.length && isNaN( minterms[0] ) ) ){
	throw new Error( "Must pass an array of numbers as the first argument." );
	}
	if( typeof fn !== "function" || fn.length < 1){
		throw new Error( "Must pass a function as second argument." );
	}
	if( MAX_FUNC_ARGUMENTS < fn.length ){
		throw new Error( "The passed function must have less then " + MAX_FUNC_ARGUMENTS + " arguments." );
	}
	var fnLen = fn.length,
		len = Math.pow(2, fnLen),
		output, 
		failLimit = 50, 
		fails = [],
		mtObj = BF.convertArrayToHashTable( minterms);
		
	var bFiller = [];
	var binary;
	//@todo OPTIMIZATION: Factor out `bFiller` and `fn.apply()`.
	for(var i = 0; i < len; i++){
			binary = Number(i).toString(2).split("");
			bFiller = new Array(fnLen - binary.length).concat( binary );
			output = !!fn.apply(0, bFiller );
			if( mtObj[ i ] ){
				expected = true;
			}else{
				expected = false;
			}
			if( expected != output){
				fails.push({
					"index" : i,
					"expected" : expected,
					"output" : output
				});
			}
			if( failLimit < fails.length ){
				break;
			}
	}
	return fails;
};

// @param {Array} names - name of the binary position
// @param {String} binary - prime impliment string. 
// Binary-like(Prime Impliment) string values can be 0, 1 or -. 
// 1 = positive form
// 0 = negative form
// - = exclude position.
// @return {String} Sum of Product Boolean Function
// @todo Optimize this function.
BF.formBooleanStringFromBinary = function(names, binary){
	var expression = "",
		oper = "";
	for(var i = 0, len = binary.length; i < len; i++){
		if(0 < i){
			oper = "&"; // Sum of Product
		}
		switch( binary.charAt(i) ){
			case "1":
				if(expression != "") expression += oper;
				expression += "(" + names[i] + "|0) ";
			break;
			case "0":
				if(expression != "") expression += oper;
				expression += "!(" + names[i] + "|0) ";
			break;
			case "-":
				// disregard this character.
			break;
			default:
			throw new Error( "Invalid character `"+binary.charAt(i)+"` passed for binary string." );
		}
	}
	return "(" + expression + ")";
};


// Converts prime impliments to a boolean function.
// @param {Array} binarys - Array of Binary-like(Prime Impliments) values.
// Binary-like(Prime Impliment) string values can be 0, 1 or -. 
// 1 = positive form
// 0 = negative form
// - = exclude position.
// All prime impliment strings should be of equal length.
// return {Function} boolean function that represents the passed binary-like (Prime Impliments) values.
BF.formBooleanFunctionFromBinaryArray = function(binarys){
	if(!Array.isArray(binarys) || binarys.lenght < 1){
		throw new Error("Must pass an non-empty array of binary strings.");
	}
	var source = "";
	var pis = [];
	var names = BF.getAllArgNames( binarys[0].length );
	for(var i = 0, len = binarys.length; i < len; i++){
		pis.push( BF.formBooleanStringFromBinary( names, binarys[i] ) );
	}
	source = "return " + pis.join(" || ") + ";";
	return new Function( names.join(", "), source );
};
