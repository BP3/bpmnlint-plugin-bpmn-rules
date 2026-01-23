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

const { createModdle } = require('bpmnlint/lib/testers/helper');
const { verifyRule, generateFragment } = require('./helper');

verifyRule(__filename, {
  valid: [
    {
      name: 'Process with valid error name',
      moddleElement: createModdle(generateFragment('<bpmn:error id="Error_0h09e3l" name="ErrorFailTask" />')),
    },
  ],
  invalid: [
    {
      name: 'Process with default error name',
      moddleElement: createModdle(generateFragment('<bpmn:error id="Error_0fv8vco" name="Error_16pj7t5" />')),
      report: [
        {
          id: 'Error_16pj7t5',
          message: 'Error has a default name. Please provide a significant name!',
        },
      ],
    },
  ],
});
