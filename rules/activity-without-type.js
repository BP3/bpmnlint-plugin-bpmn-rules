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

const { is } = require('bpmnlint-utils');

/**
 * Rule that reports whether an activity does not have a type (applies to: Tasks/Activities)
 */
module.exports = function () {
  function check(node, reporter) {
    if (is(node, 'bpmn:Activity')) {
      let isTaskTypeSet = node['$type'] != 'bpmn:Task';

      //output
      if (!isTaskTypeSet) {
        reporter.report(node.id, 'Artifact has no type. Please provide a task type!');
      }
    }
  }

  return {
    check: check,
  };
};
