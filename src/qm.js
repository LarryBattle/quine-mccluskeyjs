/*
 * Quine-McCluskeyJS
 *
 * @purpose: The Quine McCluskey Algorithm translated into Javascript.
 * In otherwords, this helps you reduce your expressions and boolean algebra.
 * @author Larry Battle <http://bateru.com/news/contact-me>
 * @license MIT and GPL 3.0
 * http://www.gnu.org/licenses/gpl.html, http://www.opensource.org/licenses/mit-license.php
 */
// requires("ArrayUtil")
// requires("NumberUtil")
// requires("StringUtil")
// requires("MintermUtil")
// requires("CoverageTable");
var qm = {
		VERSION : "0.9.5",
		func : {}
	};
/*
 * Returns a error message if the provided object doesn't fillfull the requirements.
 *
 * @param {Object} obj
 * @returns {String}
 */
qm.func.checkFormatOfUserInput = function (obj) {
	obj.dontNeeds = obj.dontNeeds || "";

	var err = "",
	areAllPropsStrings = function (obj) {
		return (typeof obj.dontNeeds !== "string" || typeof obj.minterms !== "string" || typeof obj.inputs !== "string") ? "\nInput, minterms and dontNeeds properties must be a string." : "";
	},
	doPropsHaveProperFormat = function (obj) {
		return (/[^\d,]/.test(obj.minterms) || (obj.dontNeeds.length && /[^\d,]/.test(obj.dontNeeds))) ? "The minterms property must be a string of numbers seperated by colums." : "";
	},
	areMintermsOrdontNeedsTooBig = function (obj) {
		var errMsg = "\nNeed more input variables to satify: max value in midterm or dontNeeds < 2^(number of input variables).",
		numStr = obj.dontNeeds + "," + obj.minterms,
		maxNum = Math.max.apply(Math, numStr.split(",")),
		inputLength = (obj.inputs.split(",")).length;

		return (Math.pow(2, inputLength) < maxNum) ? errMsg : "";
	};
	err = areAllPropsStrings(obj);
	err += areMintermsOrdontNeedsTooBig(obj);
	err += doPropsHaveProperFormat(obj);
	return err;
};
/*
 *
 * @param {}
 * @returns {}
 */
qm.func.checkInputThenStart = function (obj) {
	//{ parameter:, minterms: [], dontCare: [] }
	var err = qm.func.checkFormatOfUserInput(obj);
	if (err) {
		throw new Error(err);
	}
};
//len should be the input length.
/*
 *
 * @param {}
 * @returns {}
 */
qm.func.getGroupedMTFromNumArr = function (numArr, len) {
	return MintermUtil.binsToGroupedMinterms(NumberUtil.decsToBins(numArr, len, true));
};
/*
 *
 * @param {}
 * @returns {}
 */
// getPrimeImplicantsFromMinterms(): mintermsObj is the return object from getGroupedMintermsFromBinStrArr().
qm.func.getPrimeImplicantsFromMinterms = function (mintermsObj) {
	var binaryStr = "",
	newMTStr = "",
	seperator = ",",
	keys = mintermsObj.keys.concat(),
	keyLen = keys.length,
	i = 0,
	j = 0,
	k = 0,
	currentKey = 0,
	currentOnesGroup = [],
	currNum = {},
	nextOnesGroup = [],
	newMinterms = {
		"keys" : []
	},
	usedMinterms = {},
	wasMatchFoundInGroup,
	PIArray = [];

	// loop through each ones group starting from the least value(n).
	while (keyLen--) {
		currentKey = keys[i];
		currentOnesGroup = mintermsObj[currentKey];
		j = currentOnesGroup.length;
		nextOnesGroup = mintermsObj[1 + currentKey];
		// If next level doesn't exist, then add the current level to Prime implicant array, if not in used list.
		if (!nextOnesGroup) {
			while (j--) {
				if (!usedMinterms[currentOnesGroup[j].minterms]) {
					PIArray.push(currentOnesGroup[j]);
				}
			}
		}
		// Otherwise, check the current and next level group for onesDifference matches.
		//// If there are no onesDifference matches, then add to Prime Implicant Array, if not in used list.
		//// Otherwise, add matched minterms to the used list and append to new group of arrays (remember to groupByOnes when adding) for looping.
		else {
			while (j--) {
				currNum = currentOnesGroup[j];
				k = nextOnesGroup.length;
				wasMatchFoundInGroup = false;
				// Comparing the current value to a group of next level values.
				while (k--) {
					binaryStr = StringUtil.replaceOneDiff(currNum.value, nextOnesGroup[k].value, "-");
					if (0 < binaryStr.length) {
						wasMatchFoundInGroup = true;
						newMTStr = StringUtil.getUniqueSortedNumberString((currNum.minterms + seperator + nextOnesGroup[k].minterms), seperator);
						if (!usedMinterms[newMTStr]) {
							usedMinterms[newMTStr] = 1;
							if (!newMinterms[currentKey]) {
								newMinterms[currentKey] = [];
								newMinterms.keys.push(currentKey);
							}
							newMinterms[currentKey].push({
								"minterms" : newMTStr,
								"value" : binaryStr
							});
						}
						//push the current next level element into the used table.
						if (!usedMinterms[nextOnesGroup[k].minterms]) {
							usedMinterms[nextOnesGroup[k].minterms] = 1;
						}
					}
				} // finishing comparing current el from currentOneGroup with all elements in nextOnesGroup.
				if (!wasMatchFoundInGroup && !usedMinterms[currNum.minterms]) {
					PIArray.push(currNum);
				}
			}
		}
		i++;
	} // finished looping through all the ones' groups.
	if (newMinterms.keys.length) {
		PIArray = PIArray.concat(qm.func.getPrimeImplicantsFromMinterms(newMinterms));
	}
	return PIArray;
};
/*
 *
 * @param {}
 * @returns {}
 */
qm.func.getMatchLenAfterAppendPIToMT = function (PIIndex, piMtStr, mtObj) {
	var matchLen = 0,
	arr = piMtStr.split(","),
	i = arr.length,
	tmp = {};
	while (i--) {
		tmp = mtObj[arr[i]];
		// @todo Check this condition.
		if (tmp) {
			if (!tmp.PIsKeys[PIIndex]) {
				tmp.PIs.push(PIIndex);
				tmp.PIsKeys[PIIndex] = 1;
			}
			matchLen++;
		}
	}
	return matchLen;
};
/*
 *
 * @param {}
 * @returns {}
 */
//@todo Optimize this code
qm.func.getLeastPrimeImplicantsByGraph = function (mtStr, PIArr) {
	var minterms = mtStr.split(",");
	var i, l, p, x;
	var out = [];
	var o = new CoverageTable();
	
	o.setMinterms(minterms);
	for(i = 0, l = PIArr.length; i < l; i++){
		p = PIArr[i];
		o.addPrimeImp( p.value, p.minterms.split(",") );	
	}
	o.solve();
	if(o.foundAnswer()){	
		x = o.getActivePrimeImps();
		for(i = 0, l = x.length; i < l; i++){
			p = x[i];
			out.push({
				minterms : p.orginalMinterms.join(","),
				value : p.binaryStr
			});
		}
	}
	return out;
};
/*
 *
 * @param {}
 * @returns {}
 */
qm.func.convertLeastPIToAlgebra = function (input, PIArr) {
	var i = PIArr.length,
	inputArr = input.split(","),
	inputLen = inputArr.length,
	k,
	str = "",
	value,
	arr = {
		0 : [],
		1 : []
	};
	while (i--) {
		str = "";
		value = PIArr[i].value;
		k = 0;
		while (k < inputLen) {
			str += (value[k] === "1") ? inputArr[k] : (value[k] === "0") ? (inputArr[k] + "*") : "";
			k++;
		}
		arr[0].push(str);
		arr[1].push(value);
	}
	return arr;
};
/*
 *
 * @param {}
 * @returns {}
 */
qm.func.getLeastPI = function (obj) {
	qm.func.checkInputThenStart(obj);
	var step1,
	step2,
	step3,
	allMinterms = (obj.dontNeeds) ? (obj.minterms + "," + obj.dontNeeds) : obj.minterms;

	step1 = qm.func.getGroupedMTFromNumArr(allMinterms.split(","), obj.inputs.split(",").length);
	step2 = qm.func.getPrimeImplicantsFromMinterms(step1);
	step3 = qm.func.getLeastPrimeImplicantsByGraph(obj.minterms, step2);
	return qm.func.convertLeastPIToAlgebra(obj.inputs, step3);
};
/*
 *
 * @param {}
 * @returns {}
 */
qm.getLeastPrimeImplicants = function (obj, outputType) {
	var types = {
		"booleanAlgebra" : 0,
		"raw" : 1
	};
	type = (outputType in types) ? outputType : "booleanAlgebra";
	var index = types[type];
	return qm.func.getLeastPI(obj)[index].join(" + ");
};

