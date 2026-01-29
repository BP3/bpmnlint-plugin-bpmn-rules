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
      name: 'Process with valid event id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:process id="Process_078ti4z">
  <bpmn:boundaryEvent id="BoundaryEvent" attachedToRef="Activity">
  </bpmn:boundaryEvent>
</bpmn:process>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with default event id',
      moddleElement: createModdle(
        generateFragment(`
  <bpmn:boundaryEvent id="Event_1490aig" attachedToRef="Activity">
  </bpmn:boundaryEvent>
        `)
      ),
      report: [
        {
          id: 'Event_1490aig',
          message: 'Event has a default id. Please provide a significant id!',
        },
      ],
    },
  ],
});
