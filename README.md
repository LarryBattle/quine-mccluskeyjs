#Note
Unstable.

Try an alternative library: https://gist.github.com/ysangkok/5707171#file-smallqm-js

quine-mccluskeyjs
=================

Quine-McCluskeyJS is a Javascript version of the Quine Mccluskey method for Boolean algebra reduction. 

In otherwords, this helps you reduce your logical expressions(boolean algebra).
## Version ##
0.9.3

## Browser Support ##
Chrome 12+, IE 8+, Firefox 12+ and Opera 11+

## Example ##
Suppose we have the following if condition.

	if( !needsApproval || ( needsApproval && !approvalHasBeenGranted ) ){
		// do something
	}

Let `A` = `needsApproval` and `B` = `approvalHasBeenGranted`.
Then the if condition can be expressed as `A* + AB*`, where `*` and `+` represents `not` and `or` respectively. 

We can use the Quine McCluskey Algorithm to simplify the condition statement.

Convert the condition to a SOP, Sum of Products, form, then to minterms as an object literal.

	var userInput = {
		inputs: "A,B",
		minterms:"0,1,2"
	};

Next invoke `qm.getLeastPrimeImplicants` with the user input to get the final form of the SOP.

	qm.getLeastPrimeImplicants( userInput ); // returns "A* + B*"

Thus `A* + AB*` can be simplified to `A* + B*`, which is the same as `(AB)*`.

	if( !( needsApproval && approvalHasBeenGranted ) ){
		// do something.
	}
