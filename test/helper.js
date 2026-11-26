/*================================================================================
 =
 = Licensed Materials - Property of BP3 Global
 =
 =  bpmnlint-plugin-bpmn-rules
 =
 = Copyright © BP3 Global Inc. 2026. All Rights Reserved.
 = This software is subject to copyright protection under
 = the laws of the United States, United Kingdom and other countries.
 =
 =================================================================================*/

const RuleTester = require('bpmnlint/lib/testers/rule-tester');
const { createModdle } = require('bpmnlint/lib/testers/helper');
const zeebeModdle = require('zeebe-bpmn-moddle/resources/zeebe.json');
const fs = require('fs');
const path = require('path');
const { logger } = require('../logger');

const BOTH_PARSES = Symbol('parseBothWays');

/**
 * Marks a test case's BPMN to be parsed both without and with the Zeebe moddle descriptor.
 * Use it in place of createModdle() for rules that read Zeebe extension elements; verifyRule
 * then runs the test case once for each parse.
 * @param {string} xml - The BPMN XML
 */
function parseBothWays(xml) {
  return { [BOTH_PARSES]: xml };
}

/**
 * Expands each test case created with parseBothWays() into two: one parsed without the Zeebe
 * moddle descriptor (raw tag names, e.g. 'zeebe:ioMapping') and one parsed with it
 * (real types, e.g. 'zeebe:IoMapping'). Other test cases are returned unchanged.
 * @param {object[]} testCases
 */
function expandParses(testCases = []) {
  return testCases.flatMap((testCase) => {
    const xml = testCase.moddleElement && testCase.moddleElement[BOTH_PARSES];
    if (xml === undefined) {
      return [testCase];
    }
    return [
      { ...testCase, name: `${testCase.name} (without Zeebe descriptor)`, moddleElement: createModdle(xml) },
      { ...testCase, name: `${testCase.name} (with Zeebe descriptor)`, moddleElement: createModdle(xml, { zeebe: zeebeModdle }) },
    ];
  });
}

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

  RuleTester.verify(ruleName, rule, { valid: expandParses(testCases.valid), invalid: expandParses(testCases.invalid) });
}

/**
 * Generates a BPMN XML fragment with an optional process wrapper.
 * @param {string} xmlString
 * @param {boolean} generateProcess - Defaults to true to avoid breaking existing tests
 */
function generateFragment(xmlString, generateProcess = true) {
  return `
    <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" xmlns:modeler="http://camunda.org/schema/modeler/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0mryikp">
      ${generateProcess ? `<bpmn:process id="ProcessWrapper_Injected_By_Test_Helper" name="Process Injected By Test Helper">` : ''}

      ${xmlString}
      ${generateProcess ? `</bpmn:process>` : ''}
    </bpmn:definitions>
    `;
}

module.exports = {
  verifyRule,
  generateFragment,
  parseBothWays,
};
