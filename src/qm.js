/*
 * Quine-McCluskeyJS
 *
 * @purpose: The Quine McCluskey Algorithm translated into Javascript.
 * In otherwords, this helps you reduce your expressions and boolean algebra.
 * @author Larry Battle <http://bateru.com/news/contact-me>
 * @version 0.9.3
 * @date July 1, 2012
 * @license MIT and GPL 3.0
 * http://www.gnu.org/licenses/gpl.html, http://www.opensource.org/licenses/mit-license.php
 */

var qm = {};
qm.func = {};
/*
* Checks to see if an variable is an array.
*
* @param {Object} obj
* @returns {Boolean}
*/
qm.func.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};
/*
* Sorts an array of numbers.
*
* @param {Array} arr
* @returns {Array}
*/
qm.func.insertionSort = function (arr) {
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
qm.func.getUniqueNumArr = function (arr) {
	if (arr.length < 1) {
        return arr;
    }
    var obj = {},
    uniqueArr = [];
    
    for( var i = 0, len = arr.length; i<len; i++){
        if (!obj[arr[i]]) {
            obj[arr[i]] = 1;
            uniqueArr.push( +arr[i] );
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
qm.func.getUniqueSortedNumArr = function (arr) {
    return qm.func.getUniqueNumArr((qm.func.insertionSort(arr)));
};
/*
* Returns an sorted list with only unique elments.
*
* @param {String} str
* @param {String} delimter
* @returns {String}
*/
qm.func.getUniqueSortedNumStr = function (str, delimiter) {
    return qm.func.getUniqueSortedNumArr(str.split(delimiter)).join(delimiter);
};
/*
* Replaces the indexes of a string with a specified character.
*
* @param {String} a
* @param {Array|Number} index
* @param {String} b
*/
qm.func.replaceCharAtIndex = function (a, index, b) {
    index = (qm.func.isArray(index)) ? index : [index];
    var i = index.length,
		re;
    while (i--) {
		re = new RegExp("^(.{"+index[i]+"})(.)");
        a = a.replace( re, "$1"+b );
    }
    return a;
};
/*
* Copy strings an specified amount.
*
* @param {String} str
* @param {Number} copies
* @returns {String}
*/
qm.func.getStrCopy = function (str, copies) {
    copies = (0 < copies) ? copies : 1;
    return new Array(1+copies).join(str);
};
/*
* Converts the segments from a string split to a object with keys of a specified default value.
*
* @param {String} str
* @param {String} delimiter
* @param {Object} propValue - Default values of the Object keys.
* @returns {Object}
*/
qm.func.getObjFromStrSplit = function (str, delimiter, propValue) {
    var makePropValue = function () {
        return (typeof propValue === "function") ? propValue() : propValue || 1;
    },
    obj = {},
    arr = str.split(delimiter || ","),
    i = arr.length;
    while (i--) {
        obj[arr[i]] = makePropValue();
    }
    return obj;
};
/*
* Converts a numbers to a binary string with a set length.
*
* @param {Number} dec
* @param {Number} length - length of the string.
* @returns {String}
*/
qm.func.getBinaryStrFromDecimal = function (dec, length) {
    var binary = dec.toString(2);
    length = length || binary.length;
    if (binary.length < length) {
		binary = qm.func.getStrCopy("0", (length - binary.length)) + binary;
    }
    return binary;
};
/*
* Returns the indexes of a common string between two strings that are in the same amount and position.
*
* @param {String} a
* @param {String} b
* @returns {Array[Number]}
*/
qm.func.getCharIndexesFromSimStrs = function (a, b, commonStr) {
    var RE_commonStr = RegExp(commonStr, "g"),
    i = (a.match(RE_commonStr) || []).length,
    j = 0,
    indexes = [];
    if (i === (b.match(RE_commonStr) || []).length) {
        while (i--) {
            j += a.substring(j).indexOf(commonStr);
            if (b[j] !== commonStr) {
                indexes = [];
                break;
            }
            indexes.push(j);
            j++;
        }
    }
    return indexes;
};
/*
* Returns a error message if the provided object doesn't fillfull the requirements.
*
* @param {Object} obj
* @returns {String}
*/
qm.func.isObjInRightFormat = function (obj) {
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
    var err = qm.func.isObjInRightFormat(obj);
    if (err) {
        throw new Error(err);
    }
};
/*
*
* @param {}
* @returns {}
*/
qm.func.getNumArrFromBinStrArr = function (binStrArr) {
    var arr = [],
    i = (qm.func.isArray(binStrArr)) ? binStrArr.length : 1;
    while (i--) {
        arr.push(parseInt(binStrArr[i], 2));
    }
    return arr;
};
//len should be the input length
/*
*
* @param {}
* @returns {}
*/
qm.func.getBinStrFromNumArr = function (numArr, len, makeArrUnique) {
    numArr = (makeArrUnique) ? qm.func.getUniqueNumArr(numArr) : numArr;
    len = len || Math.max.apply(Math, numArr).toString(2).length;
    var arr = [],
    i = numArr.length;
    while (i--) {
        arr[i] = qm.func.getBinaryStrFromDecimal(numArr[i], len);
    }
    return arr;
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
qm.func.getOne1DiffFrom2BinStrCompare = function (a, b, mark) {
    var markIndexes = [],
    markRE = RegExp(mark, "g");
    if (markRE.test(a)) {
        markIndexes = qm.func.getCharIndexesFromSimStrs(a, b, mark);
        
        if (!markIndexes.length) {
            return ""; // the marks for a and b are at difference locations.
        }
    }
    var aDec = parseInt(a.replace(markRE, 0), 2),
    bDec = parseInt(b.replace(markRE, 0), 2),
    // binaryStr must use the biggest number to avoid losing digits positions.
    binaryStr = qm.func.getBinaryStrFromDecimal((bDec < aDec) ? aDec : bDec, (bDec < aDec) ? a.length : b.length),
    c = qm.func.getBinaryStrFromDecimal((aDec^bDec), binaryStr.length);
    
    if ((c.match(/1/g) || []).length !== 1) {
        // there is not exactly one 1 difference.
        return "";
    }
    // The 1 in xor of the two numbers tells you were they differ.
    markIndexes.push(c.indexOf(1));
    return qm.func.replaceCharAtIndex(binaryStr, markIndexes, mark);
};
// getGroupedMintermsFromBinStrArr(): minterms ( an array of binary strings ), return a object that has the minterms sorted by number of 1 in the binary string.
/*
*
* @param {}
* @returns {}
*/
qm.func.getGroupedMintermsFromBinStrArr = function (minterms) {
    if (!qm.func.isArray(minterms)) {
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
    sortedObj.keys = qm.func.insertionSort(keys);
    return sortedObj;
};
//len should be the input length.
/*
*
* @param {}
* @returns {}
*/
qm.func.getGroupedMTFromNumArr = function (numArr, len) {
    return qm.func.getGroupedMintermsFromBinStrArr(qm.func.getBinStrFromNumArr(numArr, len, true));
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
                    binaryStr = qm.func.getOne1DiffFrom2BinStrCompare(currNum.value, nextOnesGroup[k].value, "-");
                    if (binaryStr) {
                        wasMatchFoundInGroup = true;
                        newMTStr = qm.func.getUniqueSortedNumStr((currNum.minterms + seperator + nextOnesGroup[k].minterms), seperator);
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
qm.func.getMTWithPIMatchAndAddPILenToPI = function (mtObj, PIArr) {
    var i = PIArr.length;
    while (i--) {
        PIArr[i].matchLength = qm.func.getMatchLenAfterAppendPIToMT(i, PIArr[i].minterms, mtObj);
    }
    return mtObj;
};
/*
*
* @param {}
* @returns {}
*/
qm.func.getIndexOfPIWithMaxLenInMidTerm = function (arr, PIArr) {
    var i = arr.length,
    indexOfPIWithMaxLen,
    currPILen;
    
    if (i < 2) {
        return (i--) ? arr[i] : i;
    }
    indexOfPIWithMaxLen = arr[--i];
    while (i--) {
        currPILen = PIArr[arr[i]].matchLength;
        if ((PIArr[indexOfPIWithMaxLen].matchLength) < currPILen) {
            indexOfPIWithMaxLen = arr[i];
        }
    }
    return indexOfPIWithMaxLen;
};
/*
*
* @param {}
* @returns {}
*/
qm.func.markPIsMTsAsProcessed = function (processedMT, piMtStr) {
    var arr = piMtStr.split(","),
    i = arr.length;
    while (i--) {
        processedMT[arr[i]] = 1;
    }
    return processedMT;
};
/*
*
* @param {}
* @returns {}
*/
qm.func.getLeastPrimeImplicantsByGraph = function (mtStr, PIArr) {
    var x = qm.func.getObjFromStrSplit(mtStr, ",", function () {
            return {
                "PIs" : [],
                "PIsKeys" : {}
            };
        });
    var mtObj = qm.func.getMTWithPIMatchAndAddPILenToPI(x, PIArr),
    processedMT = {},
    //processedMT = qm.func.getObjFromStrSplit(mtStr, ",", 0),
    leastPIs = [],
    tmpPI = {},
    indexOfPIMax;
    for (var currProp in mtObj) {
        if (mtObj.hasOwnProperty(currProp)) {
            if (!processedMT[currProp]) {
                indexOfPIMax = qm.func.getIndexOfPIWithMaxLenInMidTerm(mtObj[currProp].PIs, PIArr);
                tmpPI = PIArr[indexOfPIMax];
                if (!tmpPI) {
                    throw new Error("Ohhh sh*t. Logic Error: midTerm[i] is not in any Prime Implicants.");
                }
                leastPIs.push({
                    "minterms" : tmpPI.minterms,
                    "value" : tmpPI.value
                });
                processedMT = qm.func.markPIsMTsAsProcessed(processedMT, PIArr[indexOfPIMax].minterms);
            }
        }
    }
    return leastPIs;
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
 * @summary Expands a term with a series of terms.
 *
 * @param {String,...} arguments - accepts an large amount of strings.
 * @returns {Array[String, ... ]}
 * @example qm.func.foilArray( "A", "B", "C" ); // returns [ "ABC", "AB*C", "ABC*", "AB*C*" ]
 */
qm.func.foilArray = function () {
    var args = Array.prototype.slice.call(arguments),
    terms = [args[0]];
    for (var i = 1, argsLen = args.length; i < argsLen; i++) {
        terms = terms.concat(terms);
        for (var j = 0, len = terms.length; j < len; j++) {
            terms[j] += args[i] + ((j < len / 2) ? "" : "*");
        }
    }
    return terms;
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
    type = (type in types) ? type : "booleanAlgebra";
    var index = types[type];
    return qm.func.getLeastPI(obj)[index].join(" + ");
};
