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
const { verifyRule, userTaskAttributes } = require('./helper');

verifyRule({
  valid: [
    {
      name: 'UserTask with a valid external form',
      moddleElement: createModdle(
        `
<bpmn:userTask ${userTaskAttributes('Activity_1mkqbux','external form')}>
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
<bpmn:userTask ${userTaskAttributes('Activity_0b74psj','Do Something')}>
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
<bpmn:userTask ${userTaskAttributes('Activity_JobWorkerUserTask','external form')}>
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
