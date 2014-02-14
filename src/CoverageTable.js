// require("ArrayUtil")
var CoverageTable = function(){
  this.orginalMinterms = [];
  this.minterms = {};
  this.primeImps = [];
};
var CT = CoverageTable;
var ctp = CT.prototype;
ctp.setMinterms = function(minterms){
  if(!ArrayUtil.isArray(minterms)){
    throw new Error("minterms must be an array.");
  }
  this.orginalMinterms = minterms.concat();
  this.minterms = ArrayUtil.arrayToSet( minterms );
  return this;
};
ctp.addPrimeImp = function(binaryStr, minterms){
  if(!ArrayUtil.isArray(minterms)){
    throw new Error("minterms must be an array.");
  }
  this.primeImps.push({
    binaryStr : binaryStr,
    orginalMinterms: minterms.concat(),
    minterms : minterms
  });
  return this;
};
// Returns the prime implicants used for covering the minterms.
ctp.getActivePrimeImps = function(){
  var out = [];
  for(var i = 0, l = this.primeImps.length; i < l; i++){
    var p = this.primeImps[i];
    if(p.active){
      out.push(p);
    }
  }
  return out;
};
ctp.updatePrimeImps = function(){
  var mObj = this.minterms;
  for(var i = 0, l = this.primeImps.length; i < l; i++){
    var p = this.primeImps[i];
    p.minterms = ArrayUtil.filter(p.minterms, function(minterm){
      return mObj[minterm];
    });
  }
  return this;
};
// Returns the indexes of the essential prime implicants
ctp.getEssentialPrimeImps = function(){
  var pIndexes = [];
  var count = {};
  for(var i = 0, l = this.primeImps.length; i < l; i++){
    var p = this.primeImps[i];
    for(var i2 = 0, l2 = p.minterms.length; i2 < l2; i2++){
      var m = p.minterms[i2];
      count[m] = count[m] || { length : 0, pIndex: i}
      count[m].length++;
    }
  }
  for(var id in count){
    if(count[id].length === 1){
      pIndexes.push( count[id].pIndex );
    }
  }
  return pIndexes;
};
ctp.isDone = function(){
  for(var m in this.minterms){
    return false;
  }
  return true;
};
ctp.usePrimeImp = function(pIndex){
  var p = this.primeImps[pIndex];
  if(!p){
    throw new Error("Invalid index("+pIndex+") to prime implicant.");
  }
  p.active = true;
  for(var i = 0, l = p.minterms.length; i < l; i++){
    var m = p.minterms[i];
    delete this.minterms[m];
  }
  p.minterms = [];
  return this;
};
ctp.usePrimeImps = function(pIndexes){
  if(!ArrayUtil.isArray(pIndexes)){
    throw new Error( "pIndexes must be an array." );
  }
  for(var i = 0, l = pIndexes.length; i < l; i++){
    this.usePrimeImp(pIndexes[i]);
  }
  return this;
};
// Returns the minterms that aren't contained within any of the prime implicants.
ctp.getIsolatedMinterms = function(){
  var o = {}, out = [];
  for(var i = 0, l = this.primeImps.length; i < l; i++){
    var p = this.primeImps[0];
    for(var i2 = 0, l2 = p.minterms.length; i2 < l2; i2++){
      var m = p.minterms[i2];
      o[m] = 1;
    }
  }
  for(var m in this.minterms){
    if(!o[m]){
      out.push(m);
    }
  }
  return out;
};
ctp.checkIfSolvable = function(){
  if(this.primeImps.length === 0){
    throw new Error("At least one prime implicant must be added.");
  }
  var m = this.getIsolatedMinterms();
  if(m && 0 < m.length){
    throw new Error("Unable to find prime implicants to cover the minterm(s) " + m.join(","));
  }
};
ctp.solve = function(){
  var limit = 1e4;
  this.checkIfSolvable();
  while(!this.isDone() && 0 < limit-- ){
  
  }
  return this;
};





















