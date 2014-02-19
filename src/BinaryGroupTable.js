// require("ArrayUtil");
// require("NumberUtil");
// require("StringUtil");
var BinaryGroupTable = function(nums){
  if(!ArrayUtil.isArray(nums) ||  (0 < nums.length && isNaN(nums[0]))){
    throw new Error("Must pass an array of numbers");
  }
  this.nums = nums;
  return this;
};
var bgtp = BinaryGroupTable.prototype;
bgtp.expandElements = function(){
  var els = this.numbersToSortedChartElements(this.nums),
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
bgtp.numbersToChartElements = function(nums){
  if(!ArrayUtil.isArray(nums)){
    throw new Error("Must be an array");
  }
  var bins = NumberUtil.decsToBins(nums);
  var els = [];
  for(var i = 0, l = nums.length; i < l; i++){
    els.push( this.createChartElement( bins[i], [nums[i]] ));
  }
  return els;
};
BinaryGroupTable.sortBinaryStringsFunc = function(a,b){
    return StringUtil.count(a.binString, "1") - StringUtil.count(b.binString, "1");
};
bgtp.numbersToSortedChartElements = function(nums){
  return this.numbersToChartElements(nums).sort(BinaryGroupTable.sortBinaryStringsFunc);
};
