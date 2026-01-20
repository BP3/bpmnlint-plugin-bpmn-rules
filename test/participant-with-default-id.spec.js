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
      name: 'Process with valid participant id',

      moddleElement: createModdle(
        generateFragment(`
<bpmn:collaboration id="Collaboration_1u0tsgp">
  <bpmn:participant id="Participant1" name="Participant 1" processRef="Process_1c5cw9j" />
</bpmn:collaboration>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with default participant id',

      moddleElement: createModdle(
        generateFragment(`
<bpmn:collaboration id="Collaboration_1u0tsgp">
  <bpmn:participant id="Participant_0gkguwx" processRef="Process_1c5cw9j" />
</bpmn:collaboration>
        `)
      ),
      report: [
        {
          id: 'Participant_0gkguwx',
          message: 'Participant has a default id. Please provide a significant id!',
        },
      ],
    },
  ],
});
