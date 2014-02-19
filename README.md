quine-mccluskeyjs
=================

Quine-McCluskeyJS is a Javascript version of the Quine Mccluskey method for Boolean algebra reduction. 

In otherwords, this helps you reduce your logical expressions(boolean algebra).
## Version ##
0.9.5

## Status ##
API is unstable! `qm.js` is being rewritten.

## How to Use ##

Easy Way:

    qm.simplify(inputs, expression); // returns one simplified expression.

Easy Way Example:

    var inputs = [ "A", "B"];
    var expression = "A + AB* + AB + B* + A";
    qm.simplify(inputs, expression ) === "A + B*"

## Version 1.0.0 Roadmap ##
- Rewrite API to make it easier.
- Add more edge condition test cases.
- Add test cases to get to 90%+ code coverage
- Create documentation
- Update build script
- Create homepage
- Handle cycles
- Finish Petrick.js for the petrick method
- Get code reviewed
- Add code documentation
- Link to resource material about the Quine McCluskey method
- Add TravisCI support for build automation
