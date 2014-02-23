/**
* BinaryGroupTable finds the prime implicants from a list of decimals.
* This is done by the following:
* 1. Convert decimals to binary strings with a fixed length.
* 2. Group the binary values based on the amount of 1s.
* 3. For element in each one group, compare one group to the higher one group.
* 4. If there is exactly difference between the two binary strings, then mark the difference
*   and add the new value to a new grouped set.
* 5. Repeat step 3 - 5 until there isn't a new set.
* 6. Return the elements that weren't used to create a new element in any sets.
*/
var BinaryGroupTable = function(nums, binaryLength){
  if(!ArrayUtil.isArray(nums) ||  (0 < nums.length && isNaN(nums[0]))){
    throw new Error("Must pass an array of numbers");
  }
  if(isNaN(binaryLength) || binaryLength < 1){
	throw new Error("Must pass the binary length as a non-zero positive number.");
  }
  this.nums = nums;
  this.binaryLength = +binaryLength;
  return this;
};
BinaryGroupTable.sortBinaryStringsFunc = function(a,b){
    return StringUtil.count(a.binString, "1") - StringUtil.count(b.binString, "1");
};
var bgtp = BinaryGroupTable.prototype;
bgtp.expandElements = function(){
  var els = this.numbersToSortedChartElements(),
   oneGroup, el, el2, terms, termsAsString, newBinString,
   LOOP_LIMIT = 1e5,
   count = 0,
   marker = "-",
   nameHash = {};

  for(var i = 0; i < els.length; i++){
    if(LOOP_LIMIT < count){
      throw new Error("Exceeded loop limit of "+LOOP_LIMIT.toLocaleString());
    }
    el = els[i];
    oneGroup = 1 + el.amountOf1s;
	//@todo Extract this part out to make this function more testable.
    for(var i2 = i+1, l2 = els.length; i2 < l2; i2++){
      el2 = els[i2];
      if( oneGroup < el2.amountOf1s || (el2.amountOf1s < el.amountOf1s) ){
        break;
      }
      if( oneGroup !== el2.amountOf1s){
        continue;
      }
      newBinString = StringUtil.replaceOneDiff( el.binString, el2.binString, marker);
      if( newBinString ){
        terms = el.terms.concat(el2.terms);
        terms = ArrayUtil.insertionSort(terms);
        termsAsString = terms.join(",");
        if(!nameHash[termsAsString]){
          nameHash[termsAsString] = 1;
          els.push( this.createChartElement( newBinString, terms ));
        }
        el.isUsed = true;
        el2.isUsed = true;
      }
      count++;
    }
  }
  return els;
};
bgtp.solve = function(){
  var els = this.expandElements();
  var elsUsed = ArrayUtil.filter(els, function(el){
    return !el.isUsed;
  });
  return elsUsed;
};
bgtp.createChartElement = function(binString, terms ){
  if(!ArrayUtil.isArray(terms)){
    throw new Error("terms must be an array");
  }
  return {
    binString : String(binString),
    isUsed : false,
    terms : terms,
    amountOf1s : StringUtil.count(binString, "1")
  };
};

bgtp.numbersToChartElements = function(){
  if(!ArrayUtil.isArray(this.nums)){
    throw new Error("Must be an array");
  }
  
  var els = [], b;
  for(var i = 0, l = this.nums.length; i < l; i++){
	b = NumberUtil.decToBin(this.nums[i], this.binaryLength);
    els.push( this.createChartElement( b, [this.nums[i]] ));
  }
  return els;
};
bgtp.numbersToSortedChartElements = function(){
  return this.numbersToChartElements().sort(BinaryGroupTable.sortBinaryStringsFunc);
};
