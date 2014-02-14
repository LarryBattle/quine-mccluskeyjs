// require("ArrayUtil")
var CoverageTable = (function () {
	var CoverageTable = function () {
		this.looped = 0;
		this.LOOP_MAX = 1e4;
		this.orginalMinterms = [];
		this.minterms = {};
		this.primeImps = [];
	};
	var ctp = CoverageTable.prototype;
	ctp.setMinterms = function (minterms) {
		if (!ArrayUtil.isArray(minterms)) {
			throw new Error("minterms must be an array.");
		}
		this.orginalMinterms = minterms.concat();
		this.minterms = ArrayUtil.arrayToSet(minterms);
		return this;
	};
	ctp.addPrimeImp = function (binaryStr, minterms) {
		if (!ArrayUtil.isArray(minterms)) {
			throw new Error("minterms must be an array.");
		}
		this.primeImps.push({
			active : false,
			binaryStr : binaryStr,
			index : this.primeImps.length,
			orginalMinterms : minterms.concat(),
			minterms : ArrayUtil.getUniqueSortedNumbers(minterms)
		});
		return this;
	};
	// Returns the prime implicants used for covering the minterms.
	ctp.getActivePrimeImps = function () {
		var out = [];
		for (var i = 0, l = this.primeImps.length; i < l; i++) {
			var p = this.primeImps[i];
			if (p.active) {
				out.push(p);
			}
		}
		return out;
	};
	ctp.getRemainingPrimeImps = function () {
		var out = [];
		for (var i = 0, l = this.primeImps.length; i < l; i++) {
			var p = this.primeImps[i];
			if (p.minterms.length) {
				out.push(p);
			}
		}
		return out;
	};
	ctp.updateMintermsInPrimeImps = function () {
		var mObj = this.minterms;
		var hasMinterm = function (minterm) {
			return mObj[minterm];
		};
		for (var i = 0, l = this.primeImps.length; i < l; i++) {
			var p = this.primeImps[i];
			p.minterms = ArrayUtil.filter(p.minterms, hasMinterm);
		}
		return this;
	};
	// Returns the indexes of prime implicants that are already covered by a larger prime implicant.
	ctp.getRedundantPrimeImps = function () {
		var pIndexes = [];
		for (var i = 0, l = this.primeImps.length; i < l; i++) {
			var p = this.primeImps[i];
			for (var i2 = i, l2 = this.primeImps.length; i2 < l2; i2++) {
				if (i2 === i) {
					continue;
				}
				var p2 = this.primeImps[i2];
				if (p.minterms.length < 1 || p2.minterms.length < 1) {
					continue;
				}
				var x = ArrayUtil.compareSets(p.minterms, p2.minterms);
				if (x === 1) {
					pIndexes.push(i);
				}
				if (x === 0) {
					pIndexes.push(i2);
				}
			}
		}
		return pIndexes;
	};
	ctp.removePrimeImp = function (pIndex) {
		var p = this.primeImps[pIndex];
		if (!p) {
			throw new Error("Invalid index(" + pIndex + ") to prime implicant.");
		}
		p.minterms = [];
		return this;
	};
	ctp.removeRedundantPrimeImps = function () {
		var pIndexes = this.getRedundantPrimeImps();
		for (var i = 0, l = pIndexes.length; i < l; i++) {
			this.removePrimeImp(pIndexes[i]);
		}
		return this;
	};
	// Returns the indexes of the essential prime implicants
	ctp.getEssentialPrimeImps = function () {
		var pIndexes = [];
		var count = {
			used : {}

		};
		for (var i = 0, l = this.primeImps.length; i < l; i++) {
			var p = this.primeImps[i];
			for (var i2 = 0, l2 = p.minterms.length; i2 < l2; i2++) {
				var m = p.minterms[i2];
				count[m] = count[m] || {
					length : 0,
					pIndex : i
				};
				count[m].length++;
			}
		}
		for (var id in count) {
			var o = count[id];
			if (o.length === 1 && !count.used[o.pIndex]) {
				count.used[o.pIndex] = 1;
				pIndexes.push(o.pIndex);
			}
		}
		return pIndexes;
	};
	ctp.isDone = function () {
		for (var m in this.minterms) {
			return false;
		}
		return true || m; // use m to get rid of unused check.
	};
	ctp.usePrimeImp = function (pIndex) {
		var p = this.primeImps[pIndex];
		if (!p) {
			throw new Error("Invalid index(" + pIndex + ") to prime implicant.");
		}
		p.active = true;
		for (var i = 0, l = p.minterms.length; i < l; i++) {
			var m = p.minterms[i];
			delete this.minterms[m];
		}
		this.removePrimeImp(pIndex);
		return this;
	};
	ctp.usePrimeImps = function (pIndexes) {
		if (!ArrayUtil.isArray(pIndexes)) {
			throw new Error("pIndexes must be an array.");
		}
		for (var i = 0, l = pIndexes.length; i < l; i++) {
			this.usePrimeImp(pIndexes[i]);
		}
		return this;
	};
	// Returns the minterms that aren't contained within any of the prime implicants.
	ctp.getIsolatedMinterms = function () {
		var o = {},
		p,
		m,
		out = [];
		for (var i = 0, l = this.primeImps.length; i < l; i++) {
			p = this.primeImps[i];
			for (var i2 = 0, l2 = p.minterms.length; i2 < l2; i2++) {
				m = p.minterms[i2];
				o[m] = 1;
			}
		}
		for (var x in this.minterms) {
			if (!o[x]) {
				out.push(x);
			}
		}
		return out;
	};
	ctp.checkIfSolvable = function () {
		if (this.primeImps.length === 0) {
			throw new Error("At least one prime implicant must be added.");
		}
		var m = this.getIsolatedMinterms();
		if (m && 0 < m.length) {
			var msg = "Unable to find prime implicants to cover the minterm(s); ";
			throw new Error(msg + m.join(","));
		}
	};
	ctp.isLoopUnderMax = function () {
		return this.looped < this.LOOP_MAX;
	};
	ctp.foundAnswer = function () {
		return this.isDone() && this.isLoopUnderMax();
	};
	ctp.getNextMinterm = function () {
		for (var m in this.minterms) {
			return m;
		}
		return null;
	};
	ctp.getBestPrimeImpForMinterm = function (m) {
		var o = {
			length : 0,
			pIndex : -1
		};
		for (var i = 0, l = this.primeImps.length; i < l; i++) {
			p = this.primeImps[i];
			for (var i2 = 0, l2 = p.minterms.length; i2 < l2; i2++) {
				if (p.minterms[i2] === m) {
					if (o.length < l2) {
						o.length = l2;
						p.pIndex = i;
					}
					break;
				}
			}
		}
		return o.pIndex;
	};
	//@todo Optimize this. Check the placement of the statements.
	ctp.solve = function () {
		this.checkIfSolvable();
		while (!this.isDone() && this.looped < this.LOOP_MAX) {
			this.updateMintermsInPrimeImps();
			this.removeRedundantPrimeImps();
			var x = this.getEssentialPrimeImps();
			if (x && 0 < x.length) {
				this.usePrimeImps(x);
			} else {
				var m = this.getNextMinterm();
				var pIndex = this.getBestPrimeImpForMinterm(m);
				this.usePrimeImp(pIndex);
			}
			this.looped++;
		}
		return this;
	};
	return CoverageTable;
}());
