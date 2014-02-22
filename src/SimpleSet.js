// It's called a simple set to avoid the ECMA 6 version of Set.
var SimpleSet = function(){
	this.arr = [];
	this.indexTable = {};
};
SimpleSet.prototype.hasElement = function(el){
	return typeof this.indexTable[el] !== "undefined";
};
SimpleSet.prototype.size = function(){
	return this.arr.length;
};
SimpleSet.prototype.addElement = function(el){
	if(typeof this.indexTable[el] === "undefined"){
		this.indexTable[el] = this.arr.length;
		this.arr.push(el);
	}
	return this;
};
SimpleSet.prototype.addElements = function(els){
	if(!ArrayUtil.isArray(els)){
		throw new Error("Must pass an array");
	}
	for(var i = 0, l = els.length; i < l; i++){
		this.addElement(els[i]);
	}
	return this;
};
SimpleSet.prototype.toArray = function(){
	return this.arr;
};
