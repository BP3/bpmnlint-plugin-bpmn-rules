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
      name: 'Process with valid signal name',
      moddleElement: createModdle(generateFragment(`<bpmn:signal id="Signal_23t8lvt" name="Signal" />`)),
    },
  ],
  invalid: [
    {
      name: 'Process with default signal name',
      moddleElement: createModdle(generateFragment(`<bpmn:signal id="Signal_23t8lvt" name="Signal_23t8lvt" />`)),
      report: [
        {
          id: 'Signal_23t8lvt',
          message: 'Signal has a default name. Please provide a significant name!',
        },
      ],
    },
  ],
});
