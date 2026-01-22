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

const {
    is
  } = require('bpmnlint-utils');

/**
 * Rule that reports whether an exclusive gateway does not have a default sequence flow (applies to: Gateway)
 */
module.exports = function() {

    function check(node, reporter) {
      if (is(node, 'bpmn:ExclusiveGateway')) {

        let hasDefaultFlow = !!node.default || ((node.outgoing || []).length <= 1);

        //output
        if (!hasDefaultFlow) {
            reporter.report(node.id, 'Exclusive Gateway should always have a default sequence flow.');
        }
      }
    }

    return {
      check: check,
      appliesTo: [
        'bpmn:ExclusiveGateway'
      ]
    };
};