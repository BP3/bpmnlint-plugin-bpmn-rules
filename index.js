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
  },
  rules: {},
};

let ruleArrays = {};

function addRule(ruleName, severity) {
  const ruleFile = getRulePath(rulesPath, ruleName);
  if (!fs.existsSync(path.resolve(ruleFile + '.js'))) {
    logger.warn(`Warning: Rule file does not exist: ${ruleFile}` + '.js');
    return; // skip adding
  }

  bpmnlintRulesConfig.rules[ruleName] = ruleFile;

  const rulesetSeverities = { all: severity.all ?? 'info', ...severity };

  Object.keys(rulesetSeverities).forEach((ruleset) => {
    ruleArrays[ruleset] = ruleArrays[ruleset] || [];
    ruleArrays[ruleset].push({ name: ruleName, severity: rulesetSeverities[ruleset] });
  });
}

// baseline severities
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
addRule('no-job-worker-user-task-implementation-type', { recommended: 'off', strict: 'off' });
addRule('participant-with-default-id', { recommended: 'off', strict: 'info' });
addRule('process-with-default-id', { recommended: 'error', strict: 'error' });
addRule('process-with-empty-name', { recommended: 'info', strict: 'error' });
addRule('sequence-flow-with-default-id', { recommended: 'off', strict: 'info' });
addRule('signal-with-default-name', { recommended: 'info', strict: 'warn' });
addRule('subprocess-with-default-id', { recommended: 'info', strict: 'warn' });
addRule('user-task-without-assignment-details', { recommended: 'warn', strict: 'error' });
addRule('variable-name-with-invalid-character', { recommended: 'warn', strict: 'error' });

// Version Specific RECOMMENDED
ruleArrays['camunda-8-5-recommended'] = [
  ...ruleArrays.recommended.filter((r) => r.name !== 'no-job-worker-user-task-implementation-type'),
  { name: 'no-job-worker-user-task-implementation-type', severity: 'info' },
];

ruleArrays['camunda-8-6-recommended'] = [
  ...ruleArrays.recommended.filter((rule) => rule.name !== 'no-job-worker-user-task-implementation-type'),
  { name: 'no-job-worker-user-task-implementation-type', severity: 'warn' },
];

ruleArrays['camunda-8-7-recommended'] = [
  ...ruleArrays['camunda-8-6-recommended'].filter((rule) => rule.name !== 'no-job-worker-user-task-implementation-type'),
  { name: 'no-job-worker-user-task-implementation-type', severity: 'error' },
];

ruleArrays['camunda-8-8-recommended'] = [
  ...ruleArrays['camunda-8-7-recommended'].filter((rule) => rule.name !== 'user-task-without-assignment-details'),
  { name: 'user-task-without-assignment-details', severity: 'off' },
];

// 3. Version Specific STRICT
ruleArrays['camunda-8-5-strict'] = [
  ...ruleArrays.strict.filter((r) => r.name !== 'no-job-worker-user-task-implementation-type'),
  { name: 'no-job-worker-user-task-implementation-type', severity: 'info' },
];

ruleArrays['camunda-8-6-strict'] = [
  ...ruleArrays.strict.filter((rule) => rule.name !== 'no-job-worker-user-task-implementation-type'),
  { name: 'no-job-worker-user-task-implementation-type', severity: 'warn' },
];

ruleArrays['camunda-8-7-strict'] = [
  ...ruleArrays['camunda-8-6-strict'].filter((rule) => rule.name !== 'no-job-worker-user-task-implementation-type'),
  { name: 'no-job-worker-user-task-implementation-type', severity: 'error' },
];

ruleArrays['camunda-8-8-strict'] = [
  ...ruleArrays['camunda-8-7-strict'].filter((rule) => rule.name !== 'user-task-without-assignment-details'),
  { name: 'user-task-without-assignment-details', severity: 'off' },
];

// Conversion Loop
Object.keys(ruleArrays).forEach((ruleSet) => {
  bpmnlintRulesConfig.configs[ruleSet] = bpmnlintRulesConfig.configs[ruleSet] || { rules: {} };

  for (var idx = 0; idx < ruleArrays[ruleSet].length; ++idx) {
    const rule = ruleArrays[ruleSet][idx];
    const prefixedRuleName = prefix ? `${prefix}/${rule.name}` : rule.name;
    bpmnlintRulesConfig.configs[ruleSet].rules[prefixedRuleName] = rule.severity;
  }
});

module.exports = bpmnlintRulesConfig;
