// require("ArrayUtil")
var petrick = {};
petrick.foilTerm = function(arrs, els){
  var out = [];
  for(var i = 0, l = arrs.length; i < l; i++){
    var arr = arrs[i];
    for(var i2 = 0, l2 = els.length; i2 < l2; i2++){
      out.push(arrs[i].concat(els[i2]));
    }
  };
  return out;
};
petrick.expandTerms = function(arrs){
  if(!ArrayUtil.isArray(arrs) || (arrs[0] && !ArrayUtil.isArray(arrs[0]))){
    throw new Error("Must pass an array of arrays.");
  }
  if( arrs.length < 1){
    return [];
  }
  var out = [arrs[0]], arr, tmp, c;
  for(var i = 1, l = arrs.length; i < l; i++){
    out = petrick.foilTerm(out, arrs[i]);
  }
  for(var i = 0, l = out.length; i < l; i++){
    out[i] = ArrayUtil.getUniqueSortedNumbers(out[i]);
  }
  return out;
};
