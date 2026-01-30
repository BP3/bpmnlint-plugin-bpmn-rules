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
      name: 'Process with valid activity id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:task id="ReviewRequestTask" name="Review Request" />
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with default activity id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:task id="Activity_1w64wtr" name="Review Request" />
        `)
      ),
      report: [
        {
          id: 'Activity_1w64wtr',
          message: 'Activity has a default id. Please provide a significant id!',
        },
      ],
    },
  ],
});
