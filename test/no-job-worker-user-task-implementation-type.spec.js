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
const { verifyRule } = require('./ruleTestRunner');

verifyRule({
  valid: [
    {
      name: 'UserTask with a valid external form',
      moddleElement: createModdle(
        `
<bpmn:userTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" xmlns:modeler="http://camunda.org/schema/modeler/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Activity_1mkqbux" name="external form">
  <bpmn:extensionElements>
    <zeebe:userTask />
    <zeebe:formDefinition externalReference="" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `,
        'bpmn:UserTask'
      ),
    },
    {
      name: 'UserTask with a Camunda form',
      moddleElement: createModdle(
        `
<bpmn:userTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" xmlns:modeler="http://camunda.org/schema/modeler/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Activity_0b74psj" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:userTask />
    <zeebe:assignmentDefinition assignee="SampleUser" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `,
        'bpmn:UserTask'
      ),
    },
  ],
  invalid: [
    {
      name: 'UserTask with a job worker external form',
      moddleElement: createModdle(
        `
<bpmn:userTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" xmlns:modeler="http://camunda.org/schema/modeler/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Activity_JobWorkerUserTask" name="external form">
  <bpmn:extensionElements>
    <zeebe:formDefinition externalReference="" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `,
        'bpmn:UserTask'
      ),
      report: {
        id: 'Activity_JobWorkerUserTask',
        message: 'User Task has disallowed Implementation Type: Job Worker',
      },
    },
  ],
});
