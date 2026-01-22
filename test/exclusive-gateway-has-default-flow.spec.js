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
      name: 'Process with a branching gateway (with default) and a join scenario',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:exclusiveGateway id="Gateway_1avjidf" name="which path?" default="Flow_0nf76et">
  <bpmn:outgoing>Flow_0nf76et</bpmn:outgoing>
  <bpmn:outgoing>Flow_0l4elcm</bpmn:outgoing>
</bpmn:exclusiveGateway>

<bpmn:sequenceFlow id="Flow_0nf76et" sourceRef="Gateway_1avjidf" targetRef="Task_1" />
<bpmn:sequenceFlow id="Flow_0l4elcm" sourceRef="Gateway_1avjidf" targetRef="Task_2" />

<bpmn:exclusiveGateway id="Gateway_0ckqv8k">
  <bpmn:outgoing>Flow_Join_Exit</bpmn:outgoing>
</bpmn:exclusiveGateway>

<bpmn:sequenceFlow id="Flow_Join_Exit" sourceRef="Gateway_0ckqv8k" targetRef="End" />
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process gateway without default flow',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:process id="Process_1" isExecutable="false">
  <bpmn:exclusiveGateway id="Gateway_1u56rij" name="Payment successful?">
    <bpmn:outgoing>Flow_01d6nrp</bpmn:outgoing>
    <bpmn:outgoing>Flow_16ibx6r</bpmn:outgoing>
  </bpmn:exclusiveGateway>

  <bpmn:sequenceFlow id="Flow_01d6nrp" sourceRef="Gateway_1u56rij" targetRef="A" />
  <bpmn:sequenceFlow id="Flow_16ibx6r" sourceRef="Gateway_1u56rij" targetRef="B" />
</bpmn:process>
        `)
      ),
      report: {
        id: 'Gateway_1u56rij',
        message: 'Exclusive Gateway should always have a default sequence flow.',
      },
    },
  ],
});
