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

const { logger } = require('./logger');
const fs = require('fs');
const path = require('path');

// Get the prefix for this plugin from the package.json if it's set
const { name } = require('./package.json');
const prefix = name.trim();

const rulesPath = './rules';

// helper to prepare the rules path for the plugin
function getRulePath(basePath, ruleName) {
  return basePath?.trim() ? `${basePath}/${ruleName}` : ruleName;
}

let bpmnlintRulesConfig = {
  configs: {
    all: { rules: {} },
    recommended: { rules: {} },
    strict: { rules: {} },
    'camunda-8-7': { rules: {} },
    'camunda-8-8': { rules: {} },
  },
  rules: {},
};

function addRule(ruleName, severity) {
  const ruleFile = getRulePath(rulesPath, ruleName);
  if (!fs.existsSync(path.resolve(ruleFile + '.js'))) {
    logger.warn(`Warning: Rule file does not exist: ${ruleFile}` + '.js');
    return; // skip adding
  }

  bpmnlintRulesConfig.rules[ruleName] = ruleFile;

  const allSeverity = severity.all ?? 'info';
  const rulesetSeverities = { all: allSeverity, ...severity };

  Object.keys(rulesetSeverities).forEach((ruleset) => {
    // skip if severity is off
    if (rulesetSeverities[ruleset] === 'off') return;

    const prefixedRuleName = prefix ? `${prefix}/${ruleName}` : ruleName;

    // If the config exists, add the rule
    if (bpmnlintRulesConfig.configs[ruleset]) {
      bpmnlintRulesConfig.configs[ruleset].rules[prefixedRuleName] = rulesetSeverities[ruleset];
    }
  });
}

addRule('activity-with-default-id', { recommended: 'warn', strict: 'error' });
addRule('activity-without-type', { recommended: 'info', strict: 'info' });
addRule('artifact-with-default-id', { recommended: 'off', strict: 'off' });
addRule('event-with-default-id', { recommended: 'info', strict: 'warn' });
addRule('error-with-default-name', { recommended: 'warn', strict: 'error' });
addRule('escalation-with-default-name', { recommended: 'info', strict: 'warn' });
addRule('exclusive-gateway-has-default-flow', { recommended: 'info', strict: 'warn' });
addRule('inclusive-gateway-has-default-flow', { recommended: 'info', strict: 'warn' });
addRule('gateway-with-default-id', { recommended: 'info', strict: 'warn' });
addRule('lane-with-default-id', { recommended: 'off', strict: 'info' });
addRule('message-flow-with-default-id', { recommended: 'info', strict: 'info' });
addRule('message-with-default-name', { recommended: 'warn', strict: 'error' });
addRule('no-job-worker-user-task-implementation-type', { recommended: 'error', strict: 'error' });
addRule('participant-with-default-id', { recommended: 'off', strict: 'info' });
addRule('process-with-default-id', { recommended: 'error', strict: 'error' });
addRule('process-with-empty-name', { recommended: 'info', strict: 'error' });
addRule('sequence-flow-with-default-id', { recommended: 'off', strict: 'info' });
addRule('signal-with-default-name', { recommended: 'info', strict: 'warn' });
addRule('subprocess-with-default-id', { recommended: 'info', strict: 'warn' });
addRule('user-task-without-assignment-details', { recommended: 'warn', strict: 'error' });
addRule('variable-name-with-invalid-character', { recommended: 'warn', strict: 'error' });

const versionedConfigs = ['camunda-8-7', 'camunda-8-8'];
const recommendedRules = bpmnlintRulesConfig.configs.recommended.rules;

versionedConfigs.forEach((version) => {
  bpmnlintRulesConfig.configs[version].rules = {
    ...recommendedRules,
    ...bpmnlintRulesConfig.configs[version].rules,
  };
});

module.exports = bpmnlintRulesConfig;
