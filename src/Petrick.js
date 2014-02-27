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
	return this;
};
Petrick.prototype.getSOPs = function(){
	if( !ArrayUtil.isArray(this.poss) || this.poss.length < 1){
		throw new Error("POS must be set before calling this function.");
	}
	var arrs = this.poss;
	var set = new SimpleSet();
	set.addElements( [].concat( arrs[0], arrs[1] ) );
	return set.toArray();
};
