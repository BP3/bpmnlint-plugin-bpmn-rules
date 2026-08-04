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

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { logger } = require('../logger');

/**
 * Finds rules that don't have a corresponding test file
 */
function findRulesWithoutTests() {
  const rulesDir = path.resolve(__dirname, '../rules');
  const testsDir = path.resolve(__dirname, '.');

  if (!fs.existsSync(rulesDir)) {
    logger.warn(`Rules directory not found: ${rulesDir}`);
    return [];
  }

  // Get all rule files
  const ruleFiles = fs
    .readdirSync(rulesDir)
    .filter((file) => file.endsWith('.js'))
    .filter((file) => !file.endsWith('helper.js'))
    .map((file) => file.replace('.js', ''));

  // Get all test files
  const testFiles = fs
    .readdirSync(testsDir)
    .filter((file) => file.endsWith('.spec.js'))
    .map((file) => file.replace('.spec.js', ''));

  // Find rules without tests
  return ruleFiles.filter((rule) => !testFiles.includes(rule));
}

describe('rule test coverage', () => {
  it('should have a test file for every rule', () => {
    const rulesWithoutTests = findRulesWithoutTests();

    if (rulesWithoutTests.length > 0) {
      const message = 'Rules without tests:\n' + rulesWithoutTests.map((rule) => `- ${rule}`).join('\n');
      logger.warn(message);
    }

    assert.strictEqual(rulesWithoutTests.length, 0, `The following rules are missing a test file: ${rulesWithoutTests.join(', ')}`);
  });
});
