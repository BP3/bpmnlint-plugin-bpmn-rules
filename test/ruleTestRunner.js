const RuleTester = require('bpmnlint/lib/testers/rule-tester');
const fs = require('fs');
const path = require('path');

/**
//  * Helper function that automatically extracts rule name from the calling test file
//  * and runs the tests.
*/
function verifyRule(testCases) {
  const callerFile = module.parent && module.parent.filename ? module.parent.filename : __filename;

  const base = path.basename(callerFile);

  const ruleName = base.replace(/\.spec\.js$/, '');

  _verifyRule(ruleName, testCases);
}

/**
 * Internal implementation: executes the rule test
 */
function _verifyRule(ruleName, testCases) {
  const rulePath = path.resolve(__dirname, `../rules/${ruleName}.js`);

  if (fs.existsSync(rulePath)) {
    const rule = require(rulePath);
    RuleTester.verify(ruleName, rule, testCases);
  } else {
    console.warn(`Skipped rule "${ruleName}": file not found at ${rulePath}`);
  }
}

module.exports = {
  verifyRule,
};
