// requires("ArrayUtil")
var StringUtil = {};
//---------
//StringUtil
//---------
/*
 * Replaces the indexes of a string with a specified character.
 *
 * @param {String} a
 * @param {Array|Number} index
 * @param {String} b
 */
StringUtil.replaceCharAtIndex = function (a, index, b) {
	index = (ArrayUtil.isArray(index)) ? index : [index];
	var i = index.length,
	re;
	while (i--) {
		re = new RegExp("^(.{" + index[i] + "})(.)");
		a = a.replace(re, "$1" + b);
	}
	return a;
};
/**
 * Finds all the indexes where a character appears in a string.
 *
 * @param {String} str
 * @param {String} ch
 * @returns {Array} array of indexes
 */
StringUtil.indexesOf = function (str, ch) {
	str = String(str);
	ch = String(ch);
	if (String(str).length < 1 || String(ch).length < 1) {
		return [];
	}
	var idxs = [],
	p = -1;
	p = str.indexOf(ch, p + 1);
	while (-1 < p) {
		idxs.push(p);
		p = str.indexOf(ch, p + 1);
	}
	return idxs;
};
/*
 * Returns the indexes of a character in two strings.
 * An empty array is returned if the two strings have different lengths or don't have the same indexes of the character position.
 *
 * @param {String} a
 * @param {String} b
 * @returns {Array[Number]}
 */
StringUtil.sharedIndexesOf = function (a, b, chr) {
	a = String(a);
	b = String(b);

	if (a.length != b.length) {
		return [];
	}
	var idxs = [];
	for (var i = 0, len = a.length; i < len; i++) {
		if (a[i] === b[i] && a[i] === chr) {
			idxs.push(i);
		} else {
			if (a[i] === chr || b[i] === chr) {
				return [];
			}
		}
	}
	return idxs;
};	
/*
 * Return a empty string if there is not exactly a one digit difference between two numbers in binary.
 * Otherwise, it return the a binary string with a marker in place of the digit difference.
 *
 * @param {String} a
 * @param {String} b
 * @param {String} mark
 * @returns {String}
 */
StringUtil.replaceOneDiff = function (a, b, mark) {
	a = String(a);
	b = String(b);
	if (a.length != b.length) {
		return "";
	}
	var diffAmount = 0,
	str = "";
	for (var i = 0, len = a.length; i < len; i++) {
		if (a[i] !== b[i]) {
			if (mark == a.charAt(i) || mark == b.charAt(i)) {
				return "";
			}
			diffAmount++;
			str += mark;
		} else {
			str += a[i];
		}
		if (1 < diffAmount) {
			return "";
		}
	}
	if (diffAmount != 1) {
		return "";
	}
	return str;
};
/*
 * Returns an sorted list with only unique elments.
 *
 * @param {String} str
 * @param {String} delimter
 * @returns {String}
 */
StringUtil.getUniqueSortedNumberString = function (str, delimiter) {
	return ArrayUtil.getUniqueSortedNumbers(str.split(delimiter)).join(delimiter);
};
/*
 * Copy strings an specified amount.
 *
 * @param {String} str
 * @param {Number} copies
 * @returns {String}
 */
StringUtil.copy = function (str, copies) {
	copies = (0 < copies) ? copies : 1;
	var output = "";
	while (0 < copies--) {
		output += str;
	}
	return output;
};
/*
 * Converts the segments from a string split to a object with keys of a specified default value.
 *
 * @param {String} str
 * @param {String} delimiter
 * @param {Object} propValue - Default values of the Object keys.
 * @returns {Object}
 */
StringUtil.splitToObject = function (str, delimiter, propValue) {
	var obj = {},
		arr = str.split(delimiter || ","),
		i = arr.length;
		
	while (i--) {
		obj[arr[i]] = (typeof propValue === "function") ? propValue() : propValue || 1;
	}
	return obj;
};
/**
* Returns the number of times a substring appears within a string. 
*
* @param {String} str - string 
* @param {String} substr - substring 
* @return {Number} 
*/
StringUtil.count = function(str, substr){
	if(String(str).length < 1 || String(substr).length < 1){
		return 0;
	}
	var c = 0, p = -1;
	p = str.indexOf(substr, p+1);
	while( -1 < p ){
		c++;
		p = str.indexOf(substr, p+1);
	}
	return c;
};
