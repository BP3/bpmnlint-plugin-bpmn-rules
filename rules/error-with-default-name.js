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
  isAny
} = require('bpmnlint-utils');

/**
 * Rule that reports whether an artifact does not have a significant id (applies to: Errors)
 */
module.exports = function() {

    function check(node, reporter) {
      if (isAny(node, ['bpmn:Error'])) {
        let isNotSignificantName = false;
        let notSignificantNamePattern = /^Error_\d\w{6}$/i;
        isNotSignificantName = notSignificantNamePattern.test(node.name);

        //output
        if (isNotSignificantName) {
            reporter.report(node.name, 'Error has a default name. Please provide a significant name!');
        }
      }
    }
  
    return {
      check: check
    };
};
