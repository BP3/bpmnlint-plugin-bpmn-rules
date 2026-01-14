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
const { verifyRule, generateUserTaskFragment } = require('./helper');

verifyRule({
  valid: [
    {
      name: 'UserTask with a valid external form',
      moddleElement: createModdle(
        generateUserTaskFragment(
          `
<bpmn:extensionElements>
  <zeebe:userTask />
  <zeebe:formDefinition externalReference="" />
</bpmn:extensionElements>
          `,
          'Activity_1mkqbux',
          'external form'
        ),
        'bpmn:UserTask'
      ),
    },
    {
      name: 'UserTask with a Camunda form',
      moddleElement: createModdle(
        generateUserTaskFragment(
          `
<bpmn:extensionElements>
  <zeebe:userTask />
  <zeebe:assignmentDefinition assignee="SampleUser" />
</bpmn:extensionElements>
          `,
          'Activity_0b74psj',
          'Do Something'
        ),
        'bpmn:UserTask'
      ),
    },
  ],
  invalid: [
    {
      name: 'UserTask with a job worker external form',
      moddleElement: createModdle(
        generateUserTaskFragment(
          `
<bpmn:extensionElements>
  <zeebe:formDefinition externalReference="" />
</bpmn:extensionElements>
        `,
        'Activity_JobWorkerUserTask',
        'external form'
        ),
        'bpmn:UserTask'
      ),
      report: {
        id: 'Activity_JobWorkerUserTask',
        message: 'User Task has disallowed Implementation Type: Job Worker',
      },
    },
  ],
});
