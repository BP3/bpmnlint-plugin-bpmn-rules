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
      name: 'Process with valid message flow id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:collaboration id="Collaboration_1u0tsgp">
  <bpmn:messageFlow id="MessageFlow_Task1_To_Task2" sourceRef="StartProcessActivity" targetRef="Activity_150fsc7" />
</bpmn:collaboration>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with default message flow id',
      moddleElement: createModdle(
        generateFragment(
          `
<bpmn:collaboration id="Collaboration_1u0tsgp">
  <bpmn:messageFlow id="Flow_0qwei4j" sourceRef="StartProcessActivity" targetRef="Activity_150fsc7" />
</bpmn:collaboration>
        `,
          false
        )
      ),
      report: [
        {
          id: 'Flow_0qwei4j',
          message: 'Message flow has a default id. Please provide a significant id!',
        },
      ],
    },
  ],
});
