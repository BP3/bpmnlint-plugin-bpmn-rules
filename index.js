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
//NOTE: not using the start of string ^ wildcard because it's not the case when there's a @publisherName present
const prefix = name.replace(/bpmnlint-plugin-/, '');

const rulesPath = './rules';

//helper to prepare the rules path for the plugin
function getRulePath(basePath, ruleName) {
  return `${basePath != null && basePath.trim().length > 0 ? `${basePath}/` : ``}${ruleName}`;
}

let bpmnlintRulesConfig = {
  configs: {
    all: { rules: {} },
    recommend: { rules: {} },
    strict: { rules: {} },
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

  var rulesets = Object.keys(severity);
  rulesets.forEach((item) => {
    const prefixedRuleName = `${prefix != null && prefix.trim().length > 0 ? `${prefix}/` : ``}${ruleName}`;
    bpmnlintRulesConfig.configs[item].rules[prefixedRuleName] = severity[item];
  });
}

addRule('activity-with-default-id', { "all": "warn", "recommend": "warn", "strict": "error" });
addRule('activity-without-type', { "all": "info", "recommend": "info", "strict": "info" });
addRule('artifact-with-default-id', { "all": "off", "recommend": "off", "strict": "off" });
addRule('event-with-default-id', { "all": "info", "recommend": "info", "strict": "warn" });
addRule('error-with-default-name', { "all": "warn", "recommend": "warn", "strict": "error" });
addRule('escalation-with-default-name', { "all": "info", "recommend": "info", "strict": "warn" });
addRule('exclusive-gateway-has-default-flow', { "all": "info", "recommend": "info", "strict": "warn" });
addRule('gateway-with-default-id', { "all": "info", "recommend": "info", "strict": "warn" });
addRule('lane-with-default-id', { "all": "info", "recommend": "off", "strict": "info" });
addRule('message-flow-with-default-id', { "all": "info", "recommend": "info", "strict": "info" });
addRule('message-with-default-name', { "all": "warn", "recommend": "warn", "strict": "error" });
addRule('no-job-worker-user-task-implementation-type', { "all": "error", "recommend": "error", "strict": "error" });
addRule('participant-with-default-id', { "all": "info", "recommend": "off", "strict": "info" });
addRule('process-with-default-id', { "all": "error", "recommend": "error", "strict": "error" });
addRule('process-with-default-name', { "all": "warn", "recommend": "info", "strict": "warn" });
addRule('sequence-flow-with-default-id', { "all": "info", "recommend": "off", "strict": "info" });
addRule('signal-with-default-name', { "all": "warn", "recommend": "info", "strict": "warn" });
addRule('subprocess-with-default-id', { "all": "info", "recommend": "info", "strict": "warn" });
addRule('user-task-without-assignment-details', { "all": "warn", "recommend": "warn", "strict": "error" });
addRule('variable-name-with-invalid-character', { "all": "error", "recommend": "warn", "strict": "error" });

module.exports = bpmnlintRulesConfig;
