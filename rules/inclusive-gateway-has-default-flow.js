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
 * Rule that reports whether an inclusive gateway does not have a default sequence flow (applies to: Gateway)
 */
module.exports = function () {
  function check(node, reporter) {
    if (isAny(node, ['bpmn:InclusiveGateway'])) {
      let hasDefaultFlow = !!node.default || (node.outgoing || []).length <= 1;

      //output
      if (!hasDefaultFlow) {
        reporter.report(node.id, 'Inclusive Gateway should always have a default sequence flow.');
      }
    }
  }

  return {
    check: check,
    appliesTo: ['bpmn:InclusiveGateway'],
  };
};
