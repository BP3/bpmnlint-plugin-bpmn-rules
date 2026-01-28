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
 * Rule that reports whether an artifact does not have a significant id (applies to: Errors)
 */
module.exports = function () {
  function check(node, reporter) {
    if (isAny(node, ['bpmn:Error'])) {
      //output
      if (isDefaultIdOrName('Error', node.name)) {
        reporter.report(node.name, 'Error has a default name. Please provide a significant name!');
      }
    }
  }

  return {
    check: check,
  };
};
