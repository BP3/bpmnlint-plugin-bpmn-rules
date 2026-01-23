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

const TYPICAL_CHECKS = [
  {
    name: 'uses-whitespace',
    regex: /\s/,
    message: 'contains disallowed whitespace. Use camelCase or underscores instead.',
  },
  {
    name: 'using-operator-character',
    regex: /[+\-*/=>?\.]/,
    message: 'must not contain an invalid character (+,-,*,/,=,>,?,.).',
  },
  {
    name: 'starts-with-digit',
    regex: /^\d/,
    message: 'must not start with a number (0-9).',
  },
];

const CONNECTOR_TEMPLATE_CHECKS = [
  ...TYPICAL_CHECKS.filter((item) => item.name != 'using-operator-character'),
  {
    name: 'using-operator-character',
    regex: /[+\-*/=>?]/,
    message: 'must not contain an invalid character (+,-,*,/,=,>,?).',
  },
];

/**
 * Rule that reports whether any input, output, or task header variable name contains
 *  whitespace, invalid characters or start with a number.
 * Applies to: Tasks/Activities, Events
 */
function checkVariableName(name, elementId, reporter, prefix, isNodeUsingConnectorTemplate = false) {
  if (!name) {
    return;
  }

  let reportMessage = '';
  let CHECKS = TYPICAL_CHECKS;
  if (isNodeUsingConnectorTemplate) {
    CHECKS = CONNECTOR_TEMPLATE_CHECKS;
  }
  for (const check of CHECKS) {
    if (check.regex.test(name)) {
      const prefixString = prefix != null && prefix.length > 0 ? prefix : '';
      reportMessage += ` ${prefixString} variable name '${name}' ${check.message}`;
      //reporter.report(elementId, `${prefixString} variable name '${name}' ${check.message}`);
      //return;
    }
  }
  if (reportMessage != null && reportMessage.trim().length > 0) {
    reporter.report(elementId, reportMessage.trim());
  }
}

function isConnectorTemplate(node) {
  return node['$attrs'] && node['$attrs']['zeebe:modelerTemplate'] != null && node['$attrs']['zeebe:modelerTemplate'].trim() != '';
}

module.exports = function () {
  function check(node, reporter) {
    if (isAny(node, APPLICABLE_NODE_TYPES)) {
      const extensionElements = node.extensionElements;
      if (!extensionElements || !extensionElements.values) {
        return;
      }

      const isNodeUsingConnectorTemplate = isConnectorTemplate(node) || false;

      extensionElements.values.forEach((extension) => {
        if (is(extension, 'zeebe:ioMapping')) {
          extension['$children'].forEach((extensionDefinition) => {
            if (is(extensionDefinition, 'zeebe:input')) {
              checkVariableName(extensionDefinition.target, node.id, reporter, 'Input', isNodeUsingConnectorTemplate);
            } else if (is(extensionDefinition, 'zeebe:output')) {
              checkVariableName(extensionDefinition.target, node.id, reporter, 'Output', isNodeUsingConnectorTemplate);
            }
          });
        } else if (is(extension, 'zeebe:script')) {
          if (extension.resultVariable) {
            checkVariableName(extension.resultVariable, node.id, reporter, 'Script Result');
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
