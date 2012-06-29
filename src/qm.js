/*
* Quine-McCluskeyJS
*
* @purpose: The Quine McCluskey Algorithm translated into Javascript.
* In otherwords, this helps you reduce your expressions and boolean algebra.
* @author Larry Battle <http://bateru.com/news/contact-me>
* @version 0.9.1
* @date June 28, 2012
* @license MIT and GPL 3.0
* http://www.gnu.org/licenses/gpl.html, http://www.opensource.org/licenses/mit-license.php
*/

var qm = {
    func: {
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        },
        insertionSort: function (arr) {
            var len = (arr.length) ? arr.length - 1 : 0,
                i = 1,
                j, x;
            while (len--) {
                x = parseInt(arr[i], 10);
                j = i - 1;
                while (parseInt(arr[j], 10) > x) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = x;
                i++;
            }
            return arr;
        },
        //getUniqueNumArr get's unique elements starting from left to right.
        getUniqueNumArr: function (arr) {
            var i = 0,
                len = (arr.length > 1) ? arr.length : 0,
                obj = {},
                uniqueArr = [];

            if (!len) {
                return arr;
            }

            while (len--) {
                if (!obj[arr[i]]) {
                    obj[arr[i]] = 1;
                    uniqueArr.push(parseInt(arr[i], 10));
                }
                i++;
            }
            return uniqueArr;
        },
        getUniqueSortedNumArr: function (arr) {
            return this.getUniqueNumArr((this.insertionSort(arr)));
        },
        getUniqueSortedNumStr: function (str, delimiter) {
            return this.getUniqueSortedNumArr(str.split(delimiter)).join(delimiter);
        },
        getObjProperties: function (obj) {
            var keys = [];
            for (var currKey in obj) {
                if (obj.hasOwnProperty(currKey)) {
                    keys.push(currKey);
                }
            }
            return keys;
        },
        replaceCharAtIndex: function (a, index, b) {
            index = (this.isArray(index)) ? index : [index];
            var i = index.length,
                j;
            while (i--) {
                j = index[i];
                if (!a.charAt(j)) {
                    throw new Error("replaceCharAtIndex(): Index(" + j + ") does not exist for " + a.toString());
                }
                a = a.substring(0, j) + b + a.substring(j + 1);
            }
            return a;
        },
        getStrCopy: function (str, copies) {
            var newStr = str;
            copies = (copies > 0) ? copies : 1;
            while (--copies) {
                newStr += str;
            }
            return newStr;
        },
        getObjFromStrSplit: function (str, delimiter, propValue, doAddKeys) {
            propValue = (propValue !== undefined) ? propValue : 1;
            delimiter = (delimiter !== undefined) ? delimiter : ",";
            var obj = {},
                arr = str.split(delimiter),
                i = arr.length,
                keys = [],
                isPropValueFunction = (typeof propValue === "function");
            while (i--) {
                obj[arr[i]] = (isPropValueFunction) ? propValue() : propValue;
                keys.push(arr[i]);
            }
            if (doAddKeys) {
                obj.keys = keys;
            }
            return obj;
        },
        getBinaryStrFromDecimal: function (dec, length) {
            var binary = dec.toString(2);
            length = length || binary.length;
            if (binary.length !== length) {
                if (binary.length < length) {
                    binary = this.getStrCopy("0", (length - binary.length)) + binary;
                }
                else {
                    throw new Error("getBinaryStrFromDecimal(): binary(" + binary + ") > length(" + length + ") too long.");
                }
            }
            return binary;
        },
        // getCharIndexesFromSimStrs(): returns the indexes Of a Common String between two strings that are in the same amount and position.
        getCharIndexesFromSimStrs: function (a, b, commonStr) {
            var commonStrRE = RegExp(commonStr, "g"),
                i = (a.match(commonStrRE) || []).length,
                j = 0,
                indexes = [];
            if (i === (b.match(commonStrRE) || []).length) {
                while (i--) {
                    j = j + a.substring(j).indexOf(commonStr);
                    if (b[j] !== commonStr) {
                        indexes = [];
                        break;
                    }
                    indexes.push(j);
                    j++;
                }
            }
            return indexes;
        },
        //note that all the binary length should be obj.input.length;
        // User input error checking:
        isObjInRightFormat: function (obj) {
            obj.dontNeeds = obj.dontNeeds || "";

            var err = "",
                areAllPropsStrings = function (obj) {
                    return (typeof obj.dontNeeds !== "string" || typeof obj.minterms !== "string" || typeof obj.inputs !== "string") ? "\nInput, minterms and dontNeeds properties must be a string." : "";
                },
                doPropsHaveProperFormat = function (obj) {
                    return (/[^\d,]/.test(obj.minterms) || (obj.dontNeeds.length && /[^\d,]/.test(obj.dontNeeds))) ? "The minterms property must be a string of numbers seperated by colums." : "";
                },
                areMintermsOrdontNeedsTooBig = function (obj) {
                    var errMsg = "\nNeed more input variables to satify: 2^(number of input variables) > max value in midterm or dontNeeds.",
                        numStr = obj.dontNeeds + "," + obj.minterms,
                        maxNum = Math.max.apply(Math, numStr.split(",")),
                        inputLength = (obj.inputs.split(",")).length;

                    return (maxNum > Math.pow(2, inputLength)) ? errMsg : "";
                };
            err = areAllPropsStrings(obj);
            err += areMintermsOrdontNeedsTooBig(obj);
            err += doPropsHaveProperFormat(obj);
            return err;
        },
        checkInputThenStart: function (obj) {
            //{ parameter:, minterms: [], dontCare: [] }
            var err = this.isObjInRightFormat(obj);
            if (err) {
                throw new Error(err);
            }
        },
		getNumArrFromBinStrArr: function( binStrArr ){
			var arr = [], i = ( this.isArray( binStrArr ) ) ? binStrArr.length : 1;
			while( i-- ){
				arr.push( parseInt( binStrArr[ i ], 2 ) );
			}
			return arr;
		},
        //len should be the input length
        getBinStrFromNumArr: function (numArr, len, makeArrUnique) {
            numArr = (makeArrUnique) ? this.getUniqueNumArr(numArr) : numArr;
            len = len || Math.max.apply(Math, numArr).toString(2).length;
            var arr = [],
                i = numArr.length;
            while (i--) {
                arr[i] = this.getBinaryStrFromDecimal(numArr[i], len);
            }
            return arr;
        },
        // getOne1DiffFrom2BinStrCompare(): return a empty string if there is not exactly a one digit difference between two numbers in binary. 
        // Otherwise, it return the a binary string with a marker in place of the digit difference.   
        getOne1DiffFrom2BinStrCompare: function (a, b, mark) {
            var markIndexes = [],
                markRE = RegExp(mark, "g");
            if (markRE.test(a)) {
                markIndexes = this.getCharIndexesFromSimStrs(a, b, mark);

                if (!markIndexes.length) {
                    return ""; // the marks for a and b are at difference locations.
                }
            }
            var aDec = parseInt(a.replace(markRE, 0), 2),
                bDec = parseInt(b.replace(markRE, 0), 2),
                // binaryStr must use the biggest number to avoid losing digits positions.
                binaryStr = this.getBinaryStrFromDecimal((aDec > bDec) ? aDec : bDec, (aDec > bDec) ? a.length : b.length),
                c = this.getBinaryStrFromDecimal((aDec ^ bDec), binaryStr.length);

            if ((c.match(/1/g) || []).length !== 1) {
                // there is not exactly one 1 difference. 
                return "";
            }
            // The 1 in xor of the two numbers tells you were they differ.
            markIndexes.push(c.indexOf(1));
            binaryStr = this.replaceCharAtIndex(binaryStr, markIndexes, mark);
            return binaryStr;
        },
        // getGroupedMintermsFromBinStrArr(): minterms ( an array of binary strings ), return a object that has the minterms sorted by number of 1 in the binary string.
        getGroupedMintermsFromBinStrArr: function (minterms) {
            if (!this.isArray(minterms)) {
                throw new Error("getGroupedMintermsFromBinStrArr(): argument is not an array.\n typeof argument = " + typeof minterms + "\nargument.toString() = " + minterms.toString());
            }
            var sortedObj = {
                "keys": []
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
                    "minterms": "" + parseInt(cminterms, 2),
                    "value": cminterms
                });
            }
            sortedObj.keys = this.insertionSort(keys);
            return sortedObj;
        },
        //len should be the input length.
        getGroupedMTFromNumArr: function (numArr, len) {
            return this.getGroupedMintermsFromBinStrArr(this.getBinStrFromNumArr(numArr, len, true));
        },
        // getPrimeImplicantsFromMinterms(): mintermsObj is the return object from getGroupedMintermsFromBinStrArr().
        getPrimeImplicantsFromMinterms: function (mintermsObj) {
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
                    "keys": []
                },
                usedMinterms = {},
                wasMatchFoundInGroup, PIArray = [];

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
                            binaryStr = this.getOne1DiffFrom2BinStrCompare(currNum.value, nextOnesGroup[k].value, "-");
                            if (binaryStr) {
                                wasMatchFoundInGroup = true;
                                newMTStr = this.getUniqueSortedNumStr((currNum.minterms + seperator + nextOnesGroup[k].minterms), seperator);
                                if (!usedMinterms[newMTStr]) {
                                    usedMinterms[newMTStr] = 1;
                                    if (!newMinterms[currentKey]) {
                                        newMinterms[currentKey] = [];
                                        newMinterms.keys.push(currentKey);
                                    }
                                    newMinterms[currentKey].push({
                                        "minterms": newMTStr,
                                        "value": binaryStr
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
                PIArray = PIArray.concat(this.getPrimeImplicantsFromMinterms(newMinterms));
            }
            return PIArray;
        },
        getMatchLenAfterAppendPIToMT: function (PIIndex, piMtStr, mtObj) {
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
        },
        getMTWithPIMatchAndAddPILenToPI: function (mtObj, PIArr) {
            var i = PIArr.length;

            while (i--) {
                PIArr[i].matchLength = this.getMatchLenAfterAppendPIToMT(i, PIArr[i].minterms, mtObj);
            }
            return mtObj;
        },
        getIndexOfPIWithMaxLenInMidTerm: function (arr, PIArr) {
            var i = arr.length,
                indexOfPIWithMaxLen, currPILen;

            if (2 > i) {
                return (i--) ? arr[i] : i;
            }
            indexOfPIWithMaxLen = arr[--i];
            while (i--) {
                currPILen = PIArr[arr[i]].matchLength;
                if (currPILen > (PIArr[indexOfPIWithMaxLen].matchLength)) {
                    indexOfPIWithMaxLen = arr[i];
                }
            }
            return indexOfPIWithMaxLen;
        },
        markPIsMTsAsProcessed: function (processedMT, piMtStr) {
            var arr = piMtStr.split(","),
                i = arr.length;

            while (i--) {
                processedMT[arr[i]] = 1;
            }
            return processedMT;
        },
        getLeastPrimeImplicantsByGraph: function (mtStr, PIArr) {
            var mtObj = this.getMTWithPIMatchAndAddPILenToPI(this.getObjFromStrSplit(mtStr, ",", function () {
                return {
                    "PIs": [],
                    "PIsKeys": {}
                };
            }), PIArr),
                processedMT = this.getObjFromStrSplit(mtStr, ",", 0),
                leastPIs = [],
                tmpPI = {},
                indexOfPIMax;
            for (var currProp in mtObj) {
                if (mtObj.hasOwnProperty(currProp)) {
                    if (!processedMT[currProp]) {
                        indexOfPIMax = this.getIndexOfPIWithMaxLenInMidTerm(mtObj[currProp].PIs, PIArr);
                        tmpPI = PIArr[indexOfPIMax];
                        if (!tmpPI) {
                            throw new Error("Ohhh sh*t. Logic Error: midTerm[i] is not in any Prime Implicants.");
                        }
                        leastPIs.push({
                            "minterms": tmpPI.minterms,
                            "value": tmpPI.value
                        });
                        processedMT = this.markPIsMTsAsProcessed(processedMT, PIArr[indexOfPIMax].minterms);
                    }
                }
            }
            return leastPIs;
        },
        convertLeastPIToAlgebra: function (input, PIArr) {
            var i = PIArr.length,
                inputArr = input.split(","),
                inputLen = inputArr.length,
                k, str = "",
                value, arr = {
                    0: [],
                    1: []
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
        },
        getLeastPI: function (obj) {
            this.checkInputThenStart(obj);
            var step1, step2, step3, allMinterms = (obj.dontNeeds) ? (obj.minterms + "," + obj.dontNeeds) : obj.minterms;
            step1 = this.getGroupedMTFromNumArr(allMinterms.split(","), obj.inputs.split(",").length);
            step2 = this.getPrimeImplicantsFromMinterms(step1);
            step3 = this.getLeastPrimeImplicantsByGraph(obj.minterms, step2);
            return this.convertLeastPIToAlgebra(obj.inputs, step3);
        }
    },
	getLeastPrimeImplicants: function( obj, outputType ){
		var methods = this.func,
			convertTo = {
				"booleanAlgebra" : function( obj ){
					return methods.getLeastPI( obj )[0].join(" + ");
				},
				"raw":function( obj ){
					return methods.getLeastPI( obj )[1].join( " + " );
				}
			};

		outputType = ( !!convertTo[ outputType ] ) ? outputType : "booleanAlgebra";
		return convertTo[ outputType ]( obj );
	}
};