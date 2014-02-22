var ArrayUtil = {};
//---------
//ArrayUtil
//---------
// Converts object where the values equals 1 and keys are values of the array.
// @param {Array} arr
// @return {Object}
ArrayUtil.arrayToSet = function (arr) {
	var obj = {};
	for (var i = 0, len = arr.length; i < len; i++) {
		obj[arr[i]] = 1;
	}
	return obj;
};
// Returns 0 if b is a subset of a, and 1 if a is a subset of b.
// This function assumes that the arrays are contain unique sorted values. 
ArrayUtil.compareSets = function(a,b){
  if(!ArrayUtil.isArray(a) || !ArrayUtil.isArray(b)){
    throw new Error("Both a and b must be arrays.");
  }
  var x = (a.length < b.length) ? 1 : 0;
  if(b.length < a.length){
    var tmp = a;
    a = b;
    b = tmp;
  }
  for(var i = 0, l = a.length; i < l; i++){
    if(a[i] !== b[i]){
      return -1;
    }
  }
  return x;
};
ArrayUtil.is2dArray = function(arrs){
	return ArrayUtil.isArray(arrs) && ArrayUtil.isArray(arrs[0]);
};
/**
* Returns the unique elements in an 2d array.
* @param {Array} - 2d Array of primitive values.
* @return {Array} - unique elements
*/
ArrayUtil.getUniqueElementsIn2dArray = function(arrs){
	if(!ArrayUtil.isArray(arrs) || (0 < arrs.length && !ArrayUtil.isArray(arrs[0]) )){
		throw new Error("Must pass an 2d array.");
	}
	if(arrs.length < 1){
		return [];
	}
	var h = {}, arr, el, out = [];
	for(var i = 0, l = arrs.length; i < l; i++){
		arr = arrs[i];
		for(var i2 = 0, l2 = arr.length; i2 < l2; i2++){
			if( !h[arr[i2]] ){
				h[arr[i2]] = {
					count: 0,
					value : arr[i2]
				};
			}
			h[arr[i2]].count++;
		}
	}
	for(el in h){
		if(!h.hasOwnProperty(el)){
			continue;
		}
		if(h[el] && h[el].count === 1){
			out.push(h[el].value);
		}
	}
	return out;
};
ArrayUtil.map = function(arr, fn){
  if(!ArrayUtil.isArray(arr)){
    throw new Error("arr must be an array.");
  }
  if(typeof fn !== "function"){
    throw new Error("fn must be a function");
  }
  var out = [];
  for(var i = 0, l = arr.length; i < l; i++){
    out.push(fn(arr[i], i, arr));
  }
  return out;
};
ArrayUtil.filter = function( arr, fn ){
  if(!ArrayUtil.isArray(arr)){
    throw new Error("arr must be an array.");
  }
  if(typeof fn !== "function"){
    throw new Error("fn must be a function");
  }
  var out = [];
  for(var i = 0, l = arr.length; i < l; i++){
    if( fn(arr[i], i, arr) ){
      out.push(arr[i]);
    }
  }
  return out;
};
/*
 * Sorts an array of numbers.
 *
 * @param {Array} arr
 * @returns {Array}
 */
ArrayUtil.insertionSort = function (arr) {
	var len = (arr.length) ? arr.length - 1 : 0,
	i = 1,
	j,
	x;
	while (len--) {
		x = parseInt(arr[i], 10);
		j = i - 1;
		while (x < +arr[j]) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = x;
		i++;
	}
	return arr;
};
/*
 * Returns an array with only unique elements. The search starts from left to right.
 *
 * @param {Array} arr
 * @returns {Array}
 */
ArrayUtil.getUniqueNumbers = function (arr) {
	if (arr.length < 1) {
		return arr;
	}
	var obj = {},
	uniqueArr = [];

	for (var i = 0, len = arr.length; i < len; i++) {
		if (!obj[arr[i]]) {
			obj[arr[i]] = 1;
			uniqueArr.push(+arr[i]);
		}
	}
	return uniqueArr;
};
/*
 * Returns an sorted array with only unique elments.
 *
 * @param {Array} arr
 * @returns {Array}
 */
ArrayUtil.getUniqueSortedNumbers = function (arr) {
	return ArrayUtil.getUniqueNumbers((ArrayUtil.insertionSort(arr)));
};
/*
 * Checks to see if an variable is an array.
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
ArrayUtil.isArray = Array.isArray || function (obj) {
	return Object.prototype.toString.call(obj) === "[object Array]";
};
