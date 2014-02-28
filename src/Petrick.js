// require("ArrayUtil")
var Petrick = function(){
	this.poss = [];
};
Petrick.expandPOS = function(groups){
	if(!ArrayUtil.isArray(groups)){
		throw new Error("Input must be an 3 dimensional array.");
	}
	if(groups.length < 1){
		return [];
	}
	if(!ArrayUtil.isArray(groups[0])){
		throw new Error("Input must be an 3d array. Each group needs to be an 2d array.");
	}
	if(!ArrayUtil.isArray(groups[0][0])){
		throw new Error("Input must be an 3d array. Each term inside a group needs to be an array.");
	}
	// groups = (p1 + p2)(p1 + p3)(p3 + p4 + p5)
	// set nG = groups.pop() //(p3 + p4 + p5)
	// for each cGroup in groups //[ (p1 + p2), (p1 + p3)]
	// -- set tmp_nG as an empty set
	// -- for each nGTerm in nG //(p3 or p4 or p5)
	// ---- set x as the expansion of nGTerm into cGroup //(p3 or p4 or p5) in (p1 + p2)
	// ---- add x to tmp_nG
	// -- set nG as tmp_nG
	// return nG
	// (p1 + p3)(p3 + p4 + p5)
	var nG = groups.pop();
	for( var i = 0, l = groups.length; i < l; i++){
		var group = groups[i];
		var tmpNG = [];
		for( var i2 = 0, l2 = nG.length; i2 < l2; i2++){
			var nGTerm = nG[i2];
			var x = Petrick.expandTermIntoGroup( nGTerm, group );
			tmpNG = tmpNG.concat(x);
		}
		nG = tmpNG.concat();
	}
	return nG;
};
Petrick.expandTermIntoGroup = function(arr, arrs){
	if(!ArrayUtil.isArray(arr) || !ArrayUtil.isArray(arrs)){
		throw new Error("Both inputs must be an array.");
	}
	var out = [], el;
	for(var i = 0, l = arrs.length; i < l; i++){
		el = arrs[i];
		if(!el.length){
			continue;
		}
		out.push( (new SimpleSet()).addElements(arr.concat( el )).toArray() );
	}
	return out;
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
