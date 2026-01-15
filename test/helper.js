const RuleTester = require('bpmnlint/lib/testers/rule-tester');
const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');

/*
  Helper function that automatically extracts rule name from the calling test file
  and runs the tests.
 
  @param {string} specFilePath - __filename from the spec file
  @param {object} testCases - { valid: [], invalid: [] }
*/
function verifyRule(specFilePath, testCases) {
  const specBaseName = path.basename(specFilePath);
  const ruleName = specBaseName.replace(/\.spec\.js$/, '');
  const rulePath = path.join(__dirname, '../rules', `${ruleName}.js`);

  if (!fs.existsSync(rulePath)) {
    logger.info(`Skipped test "${ruleName}": rule not found at ${rulePath}`);
    return;
  }

  const rule = require(rulePath);

  RuleTester.verify(ruleName, rule, testCases);
}

function generateFragment(xmlString) {
  return `
    <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" xmlns:modeler="http://camunda.org/schema/modeler/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0mryikp">
      ${xmlString}
    </bpmn:definitions>
    `;
}

function generateUserTaskFragment(xmlString, id, name) {
  return `
    <bpmn:userTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" id="${id}" name="${name}">
      ${xmlString}
    </bpmn:userTask>
    `;
}

module.exports = {
  verifyRule,
  generateFragment,
  generateUserTaskFragment,
};
