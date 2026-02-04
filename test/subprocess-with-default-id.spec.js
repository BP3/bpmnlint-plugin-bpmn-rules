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
      name: 'Process with valid sub-process id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:subProcess id="EmbeddedSubprocess">
</bpmn:subProcess>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with default sub-process id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:subProcess id="Activity_07xqy0u">
</bpmn:subProcess>
        `)
      ),
      report: [
        {
          id: 'Activity_07xqy0u',
          message: 'Sub-process has a default id. Please provide a significant id!',
        },
      ],
    },
  ],
});
