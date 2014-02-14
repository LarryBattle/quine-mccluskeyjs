// requires("ArrayUtil")
var MintermUtil = {};
/*
 * Return a object that has the minterms sorted by number of 1 in the binary string.
 *
 * @param {Array<String>} - minterms ( an array of binary strings )
 * @returns {Object}
 */
MintermUtil.binsToGroupedMinterms = function (minterms) {
	if (!ArrayUtil.isArray(minterms)) {
		throw new Error("getGroupedMintermsFromBinStrArr(): argument is not an array.\n typeof argument = " + typeof minterms + "\nargument.toString() = " + minterms.toString());
	}
	var sortedObj = {
		"keys" : []
	},
	i = minterms.length,
	numOfOnes = 0,
	cminterms = "",
	keys = [];
	while (i--) {
		cminterms = minterms[i];
		numOfOnes = (cminterms.match(/1/g) || []).length;
		if (!sortedObj[numOfOnes]) {
			sortedObj[numOfOnes] = [];
			keys.push(numOfOnes);
		}
		sortedObj[numOfOnes].push({
			"minterms" : "" + parseInt(cminterms, 2),
			"value" : cminterms
		});
	}
	sortedObj.keys = ArrayUtil.insertionSort(keys);
	return sortedObj;
};