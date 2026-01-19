const fs = require('fs');
const path = require('path');
const { logger } = require('../logger');

/**
 * Checks which rules don't have corresponding test files and logs them
 */
function checkRulesWithoutTests() {
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
    .map((file) => file.replace('.js', ''));

  // Get all test files
  const testFiles = fs
    .readdirSync(testsDir)
    .filter((file) => file.endsWith('.spec.js'))
    .map((file) => file.replace('.spec.js', ''));

  // Find rules without tests
  const rulesWithoutTests = ruleFiles.filter((rule) => !testFiles.includes(rule));

  if (rulesWithoutTests.length > 0) {
    const message = 'Rules without tests:\n' + rulesWithoutTests.map((rule) => `- ${rule}`).join('\n');
    logger.warn(message);
  }

  return rulesWithoutTests;
}

checkRulesWithoutTests();
