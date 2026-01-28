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
const { isDefaultIdOrName } = require('../test/helper');

/**
 * Rule that reports whether an artifact does not have a significant id (applies to: Flows/MessageFlow)
 */
module.exports = function () {
  function check(node, reporter) {
    if (isAny(node, ['bpmn:MessageFlow'])) {
      //output
      if (isDefaultIdOrName('Flow', node.id)) {
        reporter.report(node.id, 'Message flow has a default id. Please provide a significant id!');
      }
    }
  }

  return {
    check: check,
  };
};
