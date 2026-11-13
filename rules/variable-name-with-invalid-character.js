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

const { is, isAny } = require('bpmnlint-utils');

const APPLICABLE_NODE_TYPES = ['bpmn:Activity', 'bpmn:Event'];

const WHITESPACE_CHECK = {
  test: (name) => /\s/.test(name),
  message: 'contains disallowed whitespace. Use camelCase or underscores instead.',
};

const STARTS_WITH_DIGIT_CHECK = {
  test: (name) => /^\d/.test(name),
  message: 'must not start with a number (0-9).',
};

// A plain variable name, such as a script result variable, where '.' is not allowed
const VARIABLE_NAME_CHECKS = [
  WHITESPACE_CHECK,
  {
    test: (name) => /[+\-*/=>?.]/.test(name),
    message: 'must not contain an invalid character (+,-,*,/,=,>,?,.).',
  },
  STARTS_WITH_DIGIT_CHECK,
];

// An input/output mapping target, which may be a path into a nested variable (e.g. 'application.cft.cftReviewerTeam').
// '.' separates the parts of the path, and each part must itself be a valid variable name.
const VARIABLE_PATH_CHECKS = [
  WHITESPACE_CHECK,
  {
    test: (path) => /[+\-*/=>?]/.test(path),
    message: 'must not contain an invalid character (+,-,*,/,=,>,?).',
  },
  STARTS_WITH_DIGIT_CHECK,
  {
    test: (path) => /\.\d/.test(path),
    message: "must not have a number (0-9) straight after a '.'.",
  },
  {
    test: (path) => path.split('.').some((part) => part === ''),
    message: "must not start or end with '.', or contain '..'.",
  },
];

/**
 * Rule that reports whether any input, output, or script result variable name contains
 *  whitespace, invalid characters or starts with a number.
 * Input and output targets may use '.' to refer to a nested variable; each part is checked separately.
 * Applies to: Tasks/Activities, Events
 */
function checkVariableName(name, elementId, reporter, prefix, checks) {
  if (!name) {
    return;
  }

  let reportMessage = '';
  for (const check of checks) {
    if (check.test(name)) {
      const prefixString = prefix != null && prefix.length > 0 ? prefix : '';
      reportMessage += ` ${prefixString} variable name '${name}' ${check.message}`;
    }
  }
  if (reportMessage != null && reportMessage.trim().length > 0) {
    reporter.report(elementId, reportMessage.trim());
  }
}

module.exports = function () {
  function check(node, reporter) {
    if (isAny(node, APPLICABLE_NODE_TYPES)) {
      const extensionElements = node.extensionElements;
      if (!extensionElements || !extensionElements.values) {
        return;
      }

      extensionElements.values.forEach((extension) => {
        if (is(extension, 'zeebe:ioMapping')) {
          (extension['$children'] || []).forEach((extensionDefinition) => {
            if (is(extensionDefinition, 'zeebe:input')) {
              checkVariableName(extensionDefinition.target, node.id, reporter, 'Input', VARIABLE_PATH_CHECKS);
            } else if (is(extensionDefinition, 'zeebe:output')) {
              checkVariableName(extensionDefinition.target, node.id, reporter, 'Output', VARIABLE_PATH_CHECKS);
            }
          });
        } else if (is(extension, 'zeebe:script')) {
          if (extension.resultVariable) {
            checkVariableName(extension.resultVariable, node.id, reporter, 'Script Result', VARIABLE_NAME_CHECKS);
          }
        }
      });
    }
  }

  return {
    check: check,
    appliesTo: APPLICABLE_NODE_TYPES,
  };
};
