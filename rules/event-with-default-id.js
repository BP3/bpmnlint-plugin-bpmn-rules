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
const { isDefaultIdOrName } = require('./helper');

/**
 * Rule that reports whether an artifact does not have a significant id (applies to: Events)
 */
module.exports = function () {
  function check(node, reporter) {
    if (isAny(node, ['bpmn:Event'])) {
      //output
      if (isDefaultIdOrName('Event', node.id)) {
        reporter.report(node.id, 'Event has a default id. Please provide a significant id!');
      }
    }
  }

  return {
    check: check,
  };
};
