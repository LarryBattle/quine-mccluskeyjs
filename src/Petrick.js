// require("ArrayUtil")
var Petrick = function(){
	this.poss = [];
};
Petrick.expandPOS = function(arrs){
	if(!ArrayUtil.isArray(arrs)){
		throw new Error("Both inputs must be an array.");
	}
	if(arrs.length < 1){
		return []
	}
	var el, out = [ arrs[0] ];
	for( var i = 1, l = arrs.length; i < l; i++){
		el = arrs[i];
		for( var i = 1, l = arrs.length; i < l; i++){
			out = Petrick.expandTermIntoGroup( el, out );
		}
	}
	return out;
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
