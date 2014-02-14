var ArrayUtil = {};
//---------
//ArrayUtil
//---------
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