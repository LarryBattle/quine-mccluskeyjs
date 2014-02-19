// requires("ArrayUtil")
var NumberUtil = {};
//---------
//NumberUtil
//---------
/*
 * Converts an array of binarys to an array of decimals.
 * @param {Array} bins
 * @returns {Array}
 * @throws Error if an array isn't passed.
 * @todo write test case for this
 */
NumberUtil.binsToDecs = function (bins) {
	if (!ArrayUtil.isArray(bins)) {
		throw new Error("Must pass an array.");
	}
	var arr = [];
	for (var i = 0, len = bins.length; i < len; i++) {
		arr.push(parseInt(bins[i], 2));
	}
	return arr;
};
/*
 * Converts an array of decimals to an array of binarys.
 * @param {Array} decs
 * @returns {Array}
 */
NumberUtil.decsToBins = function (decs, len, makeArrUnique) {
	decs = (makeArrUnique) ? ArrayUtil.getUniqueNumbers(decs) : decs;
	len = len || Math.max.apply(Math, decs).toString(2).length;
	var arr = [],
	i = decs.length;
	while (i--) {
		arr[i] = NumberUtil.decToBin(decs[i], len);
	}
	return arr;
};

/*
 * Converts a decimal to a binary string with a set length.
 *
 * @param {Number} dec
 * @param {Number} length - length of the string.
 * @returns {String}
 */
NumberUtil.decToBin = function (dec, length) {
	var binary = Number(dec).toString(2);
	length = length || binary.length;
	if (binary.length < length) {
		binary = StringUtil.copy("0", (length - binary.length)) + binary;
	}
	return binary;
};
