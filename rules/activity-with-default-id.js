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
 * Rule that reports whether an artifact does not have a significant id (applies to: Tasks/Activities)
 */
module.exports = function () {
  function check(node, reporter) {
    if (isAny(node, ['bpmn:Activity'])) {
      let isNotSignificantId = false;
      let notSignificantIdPattern = /^Activity_\d\w{6}$/i;
      isNotSignificantId = notSignificantIdPattern.test(node.id);

      //output
      if (isNotSignificantId) {
        reporter.report(node.id, 'Activity has a default id. Please provide a significant id!');
      }
    }
  }

  return {
    check: check,
  };
};
