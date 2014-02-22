// require("ArrayUtil")
var Petrick = function(){
	this.poss = [];
};
//@todo find out if there should be a check that each array POS has unique elements.
Petrick.prototype.setPOSs = function(arrs){
	if(0 < ArrayUtil.getUniqueElementsIn2dArray(arrs).length){
		throw new Error("Must pass a 2d array with no unique values.");
	}
	if(arrs.length < 2){
		throw new Error("The 2d array must have a length of 2 or greater.");
	}
	this.poss = arrs;
};
Petrick.prototype.getSOPs = function(){
	if( !ArrayUtil.isArray(this.poss) || this.poss.length < 1){
		throw new Error("POS must be set before calling this function.");
	}
	// var arrs = this.poss, el, arr, out = [], a, b, c;
	// var sets = [];
	// for(var i = 1, l = arrs.length; i < l; i++){
		// arr = arrs[i];
		// for(var i2 = 0, l2 = arr.length; i2 < l2; i2++){
			// for(var i3 = 0, l3 = arr.length; i3 < l3; i3++){
			// }
		// }
	// }
	// note:
	// (new SimpleSet()).addElements([].concat([1,2,3],[1,2,3,4,5,6])).toArray() // returns [1, 2, 3, 4, 5, 6]
	
	var arrs = this.poss;
	var set = new SimpleSet();
	set.addElements( [].concat( arrs[0], arrs[1] ) );
	return set.toArray();
};

// petrick.foilTerm = function(arrs, els){
  // var out = [];
  // for(var i = 0, l = arrs.length; i < l; i++){
    // var arr = arrs[i];
    // for(var i2 = 0, l2 = els.length; i2 < l2; i2++){
      // out.push(arrs[i].concat(els[i2]));
    // }
  // };
  // return out;
// };
// petrick.expandTerms = function(arrs){
  // if(!ArrayUtil.isArray(arrs) || (arrs[0] && !ArrayUtil.isArray(arrs[0]))){
    // throw new Error("Must pass an array of arrays.");
  // }
  // if( arrs.length < 1){
    // return [];
  // }
  // var out = [arrs[0]], arr, tmp, c;
  // for(var i = 1, l = arrs.length; i < l; i++){
    // out = petrick.foilTerm(out, arrs[i]);
  // }
  // for(var i = 0, l = out.length; i < l; i++){
    // out[i] = ArrayUtil.getUniqueSortedNumbers(out[i]);
  // }
  // return out;
// };
