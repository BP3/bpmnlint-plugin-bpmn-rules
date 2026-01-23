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
 * Rule that reports whether a user task is missing assignment details
 */
module.exports = function () {
  function check(node, reporter) {
    if (!is(node, 'bpmn:UserTask')) {
      return;
    }

    let isMissingAssignee = true;

    if (node.extensionElements != null && (node.extensionElements.values || []).length > 0) {
      //the point is to find the extension that reports that the User Task is not a Job Worker
      node.extensionElements.values.forEach((element) => {
        if (
          is(element, 'zeebe:assignmentDefinition') &&
          ((element.assignee != null && element.assignee.trim() != '') ||
            (element.candidateGroups != null && element.candidateGroups.trim() != '') ||
            (element.candidateUsers != null && element.candidateUsers.trim() != ''))
        ) {
          isMissingAssignee = false;
        }
      });
    }
    //output
    if (isMissingAssignee) {
      reporter.report(node.id, 'User Task does not have any assignment details set');
    }
  }

  return {
    check: check,
  };
};
