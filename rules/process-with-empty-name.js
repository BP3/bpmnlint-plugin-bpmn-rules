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

const { isAny } = require('bpmnlint-utils');

/**
 * Rule that reports whether an artifact does not have a significant name (applies to: Processes)
 */
module.exports = function () {
  function check(node, reporter) {
    if (!isAny(node, ['bpmn:Process'])) {
      return;
    }

    const name = node.name;

    // no name
    if (!name || !name.trim()) {
      reporter.report(node.id, 'Process has a default name. Please provide a significant name!');
    }
  }

  return {
    check: check,
  };
};
