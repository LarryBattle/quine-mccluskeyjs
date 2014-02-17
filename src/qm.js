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
/*
 *
 * @param {}
 * @returns {}
 */
// getPrimeImplicantsFromMinterms(): mintermsObj is the return object from getGroupedMintermsFromBinStrArr().
qm.func.getPrimeImplicantsFromMinterms = function (nums) {
  var o = new BinaryGroupTable(nums);
  var out = ArrayUtil.map( o.solve(), function(obj){
    return {
      minterms : obj.terms,
      value : obj.binString
    };
  });
  return out;
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
 * @throws Error if unable to find an answer.
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
	else{
		throw new Error("Unable to find an answer.");
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
	allMinterms = (obj.dontNeeds) ? (obj.minterms + "," + obj.dontNeeds) : obj.minterms;

	step1 = qm.func.getPrimeImplicantsFromMinterms(allMinterms.split(","));
	step2 = qm.func.getLeastPrimeImplicantsByGraph(obj.minterms, step1);
	return qm.func.convertLeastPIToAlgebra(obj.inputs, step2);
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

