/*
@purpose Provides Validation of a boolean algebra function using a true table.
@author Larry Battle
@date Feb 6, 2014
@example

var bFn = BF.formBooleanFunctionFromBinaryArray("11-1,1-0-,01-0,-010".split(","));
var mts = [2,4,6,8,9,10,12,13,15];
BF.test(mts, bFn); // returns [].
*/
var BinaryFunction = {};
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
BinaryFunction.convertArrayToHashTable = function (arr) {
	var obj = {};
	for (var i = 0, len = arr.length; i < len; i++) {
		obj[arr[i]] = 1;
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
BF.test = function (minterms, fn) {
	var MAX_FUNC_ARGUMENTS = 27;
	if (!ArrayUtil.isArray(minterms) || (0 < minterms.length && isNaN(minterms[0]))) {
		throw new Error("Must pass an array of numbers as the first argument.");
	}
	if (typeof fn !== "function" || fn.length < 1) {
		throw new Error("Must pass a function as second argument.");
	}
	if (MAX_FUNC_ARGUMENTS < fn.length) {
		throw new Error("The passed function must have less then " + MAX_FUNC_ARGUMENTS + " arguments.");
	}
	var fnLen = fn.length,
	len = Math.pow(2, fnLen),
	output,
	failLimit = 50,
	fails = [],
	mtObj = BF.convertArrayToHashTable(minterms);

	var bFiller = [];
	var binary;
	//@todo OPTIMIZATION: Factor out `bFiller` and `fn.apply()`.
	for (var i = 0; i < len; i++) {
		binary = Number(i).toString(2).split("");
		bFiller = new Array(fnLen - binary.length).concat(binary);
		output = !!fn.apply(0, bFiller);
		expected = !!mtObj[i];
		if (expected != output) {
			fails.push({
				"index" : i,
				"expected" : expected,
				"output" : output
			});
		}
		if (failLimit < fails.length) {
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
BF.formBooleanStringFromBinary = function (names, binary) {
	var expression = "",
	oper = "";
	for (var i = 0, len = binary.length; i < len; i++) {
		if (0 < i) {
			oper = "&"; // Sum of Product
		}
		switch (binary.charAt(i)) {
		case "1":
			if (expression !== "")
				expression += oper;
			expression += "(" + names[i] + "|0) ";
			break;
		case "0":
			if (expression !== "")
				expression += oper;
			expression += "!(" + names[i] + "|0) ";
			break;
		case "-":
			// disregard this character.
			break;
		default:
			throw new Error("Invalid character `" + binary.charAt(i) + "` passed for binary string.");
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
BF.formBooleanFunctionFromBinaryArray = function (binarys) {
	if (!ArrayUtil.isArray(binarys) || binarys.lenght < 1) {
		throw new Error("Must pass an non-empty array of binary strings.");
	}
	var source = "";
	var pis = [];
	var names = BF.getAllArgNames(binarys[0].length);
	for (var i = 0, len = binarys.length; i < len; i++) {
		pis.push(BF.formBooleanStringFromBinary(names, binarys[i]));
	}
	source = "return " + pis.join(" || ") + ";";
	return new Function(names.join(", "), source);
};

// Extra functions for future optmization use

BinaryFunction.createBinaryLoop = function (iName, loopBody) {
	var str = "for (var " + iName + " = 0, " + iName + "Len = 2; ";
	str += iName + " < " + iName + "Len; " + iName + "++) {";
	str += "\r\n" + loopBody + "\r\n}";
	return str;
};
BinaryFunction.createLoopFunction = function (depth, source) {
	var i = parseInt(depth, 10);

	source = String(source);
	while (-1 < i) {
		source = BinaryFunction.createBinaryLoop(BinaryFunction.getArgNameAtIndex(i), source);
		i--;
	}
	return new Function("binaryLoopFunction", source);
};
BinaryFunction.createLoopFunctionCall = function (fnName, depth) {
	return String(fnName) + "(" + BinaryFunction.getAllArgNames(depth).join(", ") + ");";
};
/**
 * @param {Array} inputs - Array of strings
 * @param {String} expression - Boolean algebra expression
 * @todo Speed up the performance.
 * @example

	BF.generateMinterms("abcd".split(","), "ab + a*c") // returns [2, 3, 6, 7, 12, 13, 14, 15]
	
 */
BF.generateMinterms = function (inputs, expression) {
	var minterms = [];
	if (!inputs || !expression) {
		return [];
	}
	var terms = String(expression).replace(/\s/g, "").split(/\+/);
	var binarys = [];
	for(var i = 0, len = terms.length; i < len; i++){
		binarys = binarys.concat( BF.expandBinaryTerm( BF.termToBinaryTerm(inputs, terms[i]) ) );
	}
	// @todo Find out if the sorting is needed.
	return ArrayUtil.getUniqueSortedNumbers( NumberUtil.binsToDecs(binarys) );
};
/**
 * @param {Array} inputs - Array of strings
 * @param {String} term - Boolean algebra expression
 * @example

BF.termToBinaryTerm("ABCD".split(""), "ADC") === "1-11"

 */
BF.termToBinaryTerm = function (inputs, term) {
	term = String(term);
	var input;
	var binaryTerm = "";
	var p = -1;
	var MARK_FOR_NOT = "*";
	for (var i = 0, len = inputs.length; i < len; i++) {
		input = inputs[i];
		p = term.indexOf(input);
		if (p === -1) {
			binaryTerm += "-";
			continue;
		}
		if (term[p + 1] === MARK_FOR_NOT) {
			binaryTerm += "0";
		} else {
			binaryTerm += "1";
		}
	}
	return binaryTerm;
};
/**
 * @param {Array} inputs - Array of strings
 * @param {String} term - Boolean algebra expression
 * @example
BF.checkForUniqueInputs("abcd".split(""), "abcd"); // no error
BF.checkForUniqueInputs("abcd".split(""), "abcda"); // Throws an error!
 */
BF.checkForUniqueInputs = function (inputs, term) {
	term = String(term);
	var p;
	for (var i = 0, len = inputs.length; i < len; i++) {
		p = term.indexOf(inputs[i]);
		if (-1 < term.indexOf(inputs[i], 1 + p)) {
			throw new Error("Invalid term. Make sure the term `" + term + "` contains only one reference to each input.");
		}
	}
};
/**
* Finds the first "-" character then splits it in positive and negative component.
*/
BF.getBinPair = function(str){
	str = String(str);
	p = str.indexOf("-");
	if (-1 < p) {
		var prefix = str.substring(0, p);
		var suffix = str.substring(p + 1);
		return [
			prefix + "0" + suffix,
			prefix + "1" + suffix	
		];
	}else{
		return [str];
	}
};
/**
* Expands a term to many.
* @note The amount of elements returned is the Math.pow(2, amount of "-")
* @example

	BF.expandBinaryTerm("1--1") // returns ["1001", "1011", "1101", "1111"]
*/
BF.expandBinaryTerm = function (term) {
	if (-1 == term.indexOf("-")) {
		return [term];
	}
	var LIMIT_UNKNOWN_INPUTS = Math.log(1e5)/Math.log(2); // unknown inputs limit.
	if( LIMIT_UNKNOWN_INPUTS < (term.match(/-/g)||[]).length ){
		var msg = "Too many unknown inputs for `" + term + "`";
		msg += "Reduce the `-` count to " + LIMIT_UNKNOWN_INPUTS;
		throw new Error( msg );
	}
	var new_queue = [],
	curr_queue = [term];
	
	while (-1 < String(curr_queue[0]).indexOf("-")) {
		new_queue = [];
		for (var i = 0, len = curr_queue.length; i < len; i++) {
			new_queue = new_queue.concat( BF.getBinPair( curr_queue[i]));
		}
		curr_queue = new_queue.concat();
	}
	return new_queue;
};

