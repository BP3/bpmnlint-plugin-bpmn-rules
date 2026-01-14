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

function generateFragment(xmlString) {
  return `
    <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" xmlns:modeler="http://camunda.org/schema/modeler/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0mryikp">
      ${xmlString}
    </bpmn:definitions>
    `;
}

module.exports = {
  verifyRule,
  generateFragment,
};
