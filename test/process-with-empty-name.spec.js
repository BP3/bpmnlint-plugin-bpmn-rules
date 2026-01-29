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
      name: 'Process with valid process name',
      moddleElement: createModdle(
        generateFragment(
          `
<bpmn:process id="Process_1s1qrpb" name="Review Request Process" />
        `,
          false
        )
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with empty process name',
      moddleElement: createModdle(
        generateFragment(
          `
<bpmn:process id="Process_1s1qrpb" />
        `,
          false
        )
      ),
      report: [
        {
          id: 'Process_1s1qrpb',
          message: 'Process has a empty name. Please provide a significant name!',
        },
      ],
    },
  ],
});
