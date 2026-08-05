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

const { isAny, is } = require('bpmnlint-utils');

const APPLICABLE_NODE_TYPES = ['bpmn:Process'];

/**
 * Rule that reports whether a process does not have a version tag set (applies to: Processes)
 */
module.exports = function () {
  function check(node, reporter) {
    if (!isAny(node, APPLICABLE_NODE_TYPES)) {
      return;
    }

    const extensionElements = node.extensionElements;
    let versionTagValue;

    if (extensionElements && extensionElements.values) {
      const versionTagElement = extensionElements.values.find((element) => is(element, 'zeebe:versionTag'));
      versionTagValue = versionTagElement ? versionTagElement.value : undefined;
    }

    //output
    if (!versionTagValue || !versionTagValue.trim()) {
      reporter.report(node.id, 'Process does not have a version tag set. Please provide a significant version tag!');
    }
  }

  return {
    check: check,
    appliesTo: APPLICABLE_NODE_TYPES,
  };
};
