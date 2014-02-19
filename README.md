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

- Bug: Add more edge condition test cases.
- Bug: Add test cases to get to 90%+ code coverage
- Bug: For CoverageTable.js, write code to handle cycles
- Bug: Simplify the overall API for https://github.com/LarryBattle/quine-mccluskeyjs/issues/11
- Bug: Update the build script for https://github.com/LarryBattle/quine-mccluskeyjs/issues/8
- Bug: Create documentation
- Bug: Add code documentation
- Bug: Finish Petrick.js for the petrick method

- Feature: Create homepage

- Enhancement: Get code reviewed
- Enhancement: Wrap everything inside one global variable.
- Enhancement: Link to resource material about the Quine McCluskey method
- Enhancement: Add TravisCI support for build automation
