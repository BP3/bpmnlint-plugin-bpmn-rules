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
      name: "Process gateway with default flow",
      moddleElement: createModdle(
        generateFragment(`
          <bpmn:inclusiveGateway id="Gateway_0knccn5" default="Flow_1dh1e1n">
            <bpmn:outgoing>Flow_1dh1e1n</bpmn:outgoing>
            <bpmn:outgoing>Flow_1sijn6i</bpmn:outgoing>
          </bpmn:inclusiveGateway>

          <bpmn:sequenceFlow id="Flow_1dh1e1n" sourceRef="Gateway_0knccn5" targetRef="A" />
          <bpmn:sequenceFlow id="Flow_1sijn6i" sourceRef="Gateway_0knccn5" targetRef="B" />
        `)
      )
    },
    {
      name: "Process with a gateway that has a default and a join without default",
      moddleElement: createModdle(
        generateFragment(`
          <bpmn:inclusiveGateway id="Gateway_1yay0j2">
            <bpmn:outgoing>Flow_14weok5</bpmn:outgoing>
          </bpmn:inclusiveGateway>

          <bpmn:sequenceFlow id="Flow_14weok5" sourceRef="Gateway_1yay0j2" targetRef="End" />
        `)
      )
    }
  ],
  invalid: [
    {
      name: "Process gateway without default flow",
      moddleElement: createModdle(
        generateFragment(`
          <bpmn:inclusiveGateway id="Gateway_0knccn5">
            <bpmn:outgoing>Flow_1</bpmn:outgoing>
            <bpmn:outgoing>Flow_2</bpmn:outgoing>
          </bpmn:inclusiveGateway>

          <bpmn:sequenceFlow id="Flow_1" sourceRef="Gateway_0knccn5" targetRef="Task_A" />
          <bpmn:sequenceFlow id="Flow_2" sourceRef="Gateway_0knccn5" targetRef="Task_B" />

          <bpmn:task id="Task_A" />
          <bpmn:task id="Task_B" />
        `)
      ),
      report: [
        {
          id: "Gateway_0knccn5",
          message: "Inclusive Gateway should always have a default sequence flow."
        }
      ]
    }
  ]
});