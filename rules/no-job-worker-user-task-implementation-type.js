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
const { isZeebe } = require('./helper');

/**
 * Rule that reports whether user tasks are job workers.
 */
module.exports = function () {
  function check(node, reporter) {
    if (!is(node, 'bpmn:UserTask')) {
      return;
    }

    let isJobWorker = true;

    if (node.extensionElements != null && (node.extensionElements.values || []).length > 0) {
      //the point is to find the extension that reports that the User Task is not a Job Worker
      node.extensionElements.values.forEach((element) => {
        if (isZeebe(element, 'zeebe:UserTask')) {
          isJobWorker = false;
        }
      });
    }
    //output
    if (isJobWorker) {
      reporter.report(node.id, 'User Task has disallowed Implementation Type: Job Worker');
    }
  }

  return {
    check: check,
  };
};
