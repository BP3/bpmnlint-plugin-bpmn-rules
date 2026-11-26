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
      name: 'UserTask with assignee',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_0b74psj" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:assignmentDefinition assignee="SampleUser" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
    },
    {
      name: 'UserTask with assignee formula',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_0b74psj" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:assignmentDefinition assignee="=&#34;SampleUser&#34;" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
    },
    {
      name: 'UserTask with candidate groups',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_0b74psj" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:assignmentDefinition candidateGroups="SampleGroup1,SampleGroup2" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
    },
    {
      name: 'UserTask with candidate groups formula',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_0b74psj" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:assignmentDefinition candidateGroups="=&#34;SampleGroup1,SampleGroup2&#34;" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
    },
    {
      name: 'UserTask with candidate users',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_0b74psj" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:assignmentDefinition candidateUsers="SampleUser1,SampleUser2" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
    },
    {
      name: 'UserTask with candidate users formula',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_0b74psj" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:assignmentDefinition candidateUsers="=&#34;SampleUser1,SampleUser2&#34;" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
    },
    {
      name: 'UserTask with assignee and candidate groups and candidate users',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_0b74psj" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:assignmentDefinition assignee="SampleUser" candidateGroups="SampleGroup1,SampleGroup2" candidateUsers="SampleUser1,SampleUser2" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
    },
    {
      name: 'UserTask with assignee and candidate groups and candidate users formulas',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="Activity_0b74psj" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:assignmentDefinition assignee="=&#34;SampleUser&#34;" candidateGroups="=&#34;SampleGroup1,SampleGroup2&#34;" candidateUsers="=&#34;SampleUser1,SampleUser2&#34;" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'UserTask with empty assignment details',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="UserTaskAssignmentEmpty" name="Do Something">
  <bpmn:extensionElements>
    <zeebe:assignmentDefinition assignee="" candidateGroups="" candidateUsers="" />
  </bpmn:extensionElements>
</bpmn:userTask>
        `)
      ),
      report: [
        {
          id: 'UserTaskAssignmentEmpty',
          message: 'User Task does not have any assignment details set',
        },
      ],
    },
    {
      name: 'UserTask without assignment details',
      moddleElement: parseBothWays(
        generateFragment(`
<bpmn:userTask id="UserTaskWithoutAssignmentDetails" name="Do Something">
</bpmn:userTask>
        `)
      ),
      report: [
        {
          id: 'UserTaskWithoutAssignmentDetails',
          message: 'User Task does not have any assignment details set',
        },
      ],
    },
  ],
});
