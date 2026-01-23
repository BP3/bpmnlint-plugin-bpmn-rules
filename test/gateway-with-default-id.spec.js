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
      name: 'Process with valid gateway id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:process id="Process_1s1qrpb">
  <bpmn:exclusiveGateway id="Gateway" name="Request Approved?">
  </bpmn:exclusiveGateway>
</bpmn:process>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with default gateway id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:process id="Process_078ti4z">
  <bpmn:exclusiveGateway id="Gateway_0hdljrh">
  </bpmn:exclusiveGateway>
</bpmn:process>
        `)
      ),
      report: [
        {
          id: 'Gateway_0hdljrh',
          message: 'Artifact has a default id. Please provide a significant id!',
        },
      ],
    },
  ],
});
