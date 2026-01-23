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
      name: 'UserTask with Zeebe UserTask (valid)',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:process id="Process_078ti4z">
  <bpmn:userTask id="Activity_ValidUserTask" name="zeebe task">
    <bpmn:extensionElements>
      <zeebe:userTask />
    </bpmn:extensionElements>
  </bpmn:userTask>
</bpmn:process>
        `)
      ),
    },
    {
      name: 'UserTask with a Camunda form',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:process id="Process_078ti4z">
  <bpmn:userTask id="Activity_0b74psj" name="Do Something">          
    <bpmn:extensionElements>
      <zeebe:userTask />
      <zeebe:assignmentDefinition assignee="SampleUser" />
    </bpmn:extensionElements>
  </bpmn:userTask>
</bpmn:process>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'UserTask with a job worker external form',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:process id="Process_078ti4z">
  <bpmn:userTask id="Activity_JobWorkerUserTask" name="external form">
    <bpmn:extensionElements>
      <zeebe:formDefinition externalReference="" />
    </bpmn:extensionElements>
  </bpmn:userTask>
</bpmn:process>
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
