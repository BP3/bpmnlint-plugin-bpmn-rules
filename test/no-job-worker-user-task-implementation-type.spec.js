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

const { verifyRule, generateFragment, parseBothWays } = require('./helper');

verifyRule(__filename, {
  valid: [
    {
      name: 'UserTask with Zeebe UserTask (valid)',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_ValidUserTask" name="zeebe task">
  <bpmn:extensionElements>
    <zeebe:userTask />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
    },
    {
      name: 'UserTask with a Camunda form',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_0b74psj" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:userTask />
    <zeebe:assignmentDefinition assignee="SampleUser" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'UserTask with a job worker external form',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_JobWorkerUserTask" name="external form">
  <bpmn:extensionElements>
    <zeebe:formDefinition externalReference="" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
      report: [
        {
          id: 'Activity_JobWorkerUserTask',
          message: 'User Task has disallowed Implementation Type: Job Worker',
        },
      ],
    },
  ],
});
