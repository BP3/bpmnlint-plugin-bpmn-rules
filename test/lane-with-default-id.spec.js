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
      name: 'Process with valid lane id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:laneSet id="LaneSet_1vj1ghx">
  <bpmn:lane id="Lane1">
    <bpmn:flowNodeRef>StartProcessActivity</bpmn:flowNodeRef>
  </bpmn:lane>
</bpmn:laneSet>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with default lane id',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:laneSet id="LaneSet_1vj1ghx">
  <bpmn:lane id="Lane_09cnnha">
    <bpmn:flowNodeRef>StartProcessActivity</bpmn:flowNodeRef>
  </bpmn:lane>
</bpmn:laneSet>
        `)
      ),
      report: [
        {
          id: 'Lane_09cnnha',
          message: 'Lane has a default id. Please provide a significant id!',
        },
      ],
    },
  ],
});
