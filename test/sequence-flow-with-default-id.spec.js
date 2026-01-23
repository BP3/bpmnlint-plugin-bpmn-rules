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
      name: 'Process with valid flow id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:process id="Process_1c5cw9j">
  <bpmn:sequenceFlow id="Flow" sourceRef="StartEvent_1" targetRef="StartProcessActivity" />
</bpmn:process>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with default flow id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:process id="Process_1c5cw9j">
  <bpmn:sequenceFlow id="Flow_0udjkr6" sourceRef="StartEvent_1" targetRef="StartProcessActivity" />
</bpmn:process>
        `)
      ),
      report: [
        {
          id: 'Flow_0udjkr6',
          message: 'Sequence flow has a default id. Please provide a significant id!',
        },
      ],
    },
  ],
});
