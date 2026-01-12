const fs = require('fs');
const path = require('path');

/**
 * Checks which rules don't have corresponding test files and logs them
 */
function checkRulesWithoutTests() {
    const rulesDir = path.resolve(__dirname, '../rules');
    const testsDir = path.resolve(__dirname, '.');

    // Get all rule files
    const ruleFiles = fs.readdirSync(rulesDir)
        .filter(file => file.endsWith('.js'))
        .map(file => file.replace('.js', ''));

    // Get all test files
    const testFiles = fs.readdirSync(testsDir)
        .filter(file => file.endsWith('.spec.js'))
        .map(file => file.replace('.spec.js', ''));

    // Find rules without tests
    const rulesWithoutTests = ruleFiles.filter(rule => !testFiles.includes(rule));

    if (rulesWithoutTests.length > 0) {
        console.log('\n Rules without tests:');
        rulesWithoutTests.forEach(rule => {
            console.log(`   - ${rule}`);
        });
        console.log('');
    }

    return rulesWithoutTests;
}

checkRulesWithoutTests();
