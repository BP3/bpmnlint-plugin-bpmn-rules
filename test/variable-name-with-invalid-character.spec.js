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
      name: 'Standard valid variable names',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:serviceTask id="Task_Valid">
  <bpmn:extensionElements>
    <zeebe:ioMapping>
      <zeebe:input target="InputVariable_0f4rn6m" />
      <zeebe:output source="=1" target="valid_output_2" />
    </zeebe:ioMapping>
  </bpmn:extensionElements>
</bpmn:serviceTask>
        `)
      ),
    },
    {
      name: 'Connector templates allow periods',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:serviceTask id="Connector_Task" zeebe:modelerTemplate="io.camunda.connectors.HttpJson.v2">
  <bpmn:extensionElements>
    <zeebe:ioMapping>
      <zeebe:input target="authentication.type" />
      <zeebe:input target="data.query.id" />
    </zeebe:ioMapping>
  </bpmn:extensionElements>
</bpmn:serviceTask>
        `)
      ),
    },
    {
      name: 'Dotted paths to nested variables are allowed without a connector template (Issue #152)',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:callActivity id="CallActivity_GetReferenceData">
  <bpmn:extensionElements>
    <zeebe:ioMapping>
      <zeebe:input source="=application.id" target="request.applicationId" />
      <zeebe:output source="=reviewerTeam" target="application.cft.cftReviewerTeam" />
      <zeebe:output source="=details" target="application.otherInfo.bankingOps.detailsOfExistingRelationship" />
    </zeebe:ioMapping>
  </bpmn:extensionElements>
</bpmn:callActivity>
        `)
      ),
    },
    {
      name: 'Empty ioMapping with no input/output children does not throw',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:serviceTask id="Task_EmptyIoMapping">
  <bpmn:extensionElements>
    <zeebe:ioMapping />
  </bpmn:extensionElements>
</bpmn:serviceTask>
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Input starts with a number',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:serviceTask id="Task_NumStart">
  <bpmn:extensionElements>
    <zeebe:ioMapping>
      <zeebe:input target="2InputVariable" />
    </zeebe:ioMapping>
  </bpmn:extensionElements>
</bpmn:serviceTask>
        `)
      ),
      report: [
        {
          id: 'Task_NumStart',
          message: "Input variable name '2InputVariable' must not start with a number (0-9).",
        },
      ],
    },
    {
      name: 'Input with whitespace and Output with operator',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:serviceTask id="Task_MixedErrors">
  <bpmn:extensionElements>
    <zeebe:ioMapping>
      <zeebe:input target="Input Variable" />
      <zeebe:output target="Output-Variable" />
    </zeebe:ioMapping>
  </bpmn:extensionElements>
</bpmn:serviceTask>
        `)
      ),
      report: [
        {
          id: 'Task_MixedErrors',
          message: "Input variable name 'Input Variable' contains disallowed whitespace. Use camelCase or underscores instead.",
        },
        {
          id: 'Task_MixedErrors',
          message: "Output variable name 'Output-Variable' must not contain an invalid character (+,-,*,/,=,>,?).",
        },
      ],
    },
    {
      name: 'Multiple elements: Catch Event and Task failures',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:serviceTask id="Task_Error">
  <bpmn:extensionElements>
    <zeebe:ioMapping>
      <zeebe:output target="var=1" />
    </zeebe:ioMapping>
  </bpmn:extensionElements>
</bpmn:serviceTask>
<bpmn:intermediateCatchEvent id="Timer_Error">
  <bpmn:extensionElements>
    <zeebe:ioMapping>
      <zeebe:output target="var?invalid" />
    </zeebe:ioMapping>
  </bpmn:extensionElements>
  <bpmn:timerEventDefinition />
</bpmn:intermediateCatchEvent>
        `)
      ),
      report: [
        {
          id: 'Task_Error',
          message: "Output variable name 'var=1' must not contain an invalid character (+,-,*,/,=,>,?).",
        },
        {
          id: 'Timer_Error',
          message: "Output variable name 'var?invalid' must not contain an invalid character (+,-,*,/,=,>,?).",
        },
      ],
    },
    {
      name: 'Script Result with accumulated errors (Issue #11)',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:scriptTask id="Script_Fail">
  <bpmn:extensionElements>
    <zeebe:script resultVariable="1customer/name*" />
  </bpmn:extensionElements>
</bpmn:scriptTask>
        `)
      ),
      report: [
        {
          id: 'Script_Fail',
          message:
            "Script Result variable name '1customer/name*' must not contain an invalid character (+,-,*,/,=,>,?,.). Script Result variable name '1customer/name*' must not start with a number (0-9).",
        },
      ],
    },
    {
      name: 'Script Result variable must not contain a period',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:scriptTask id="Script_Dotted">
  <bpmn:extensionElements>
    <zeebe:script resultVariable="customer.name" />
  </bpmn:extensionElements>
</bpmn:scriptTask>
        `)
      ),
      report: [
        {
          id: 'Script_Dotted',
          message: "Script Result variable name 'customer.name' must not contain an invalid character (+,-,*,/,=,>,?,.).",
        },
      ],
    },
    {
      name: 'Dotted path with an invalid character or a number after a period',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:serviceTask id="Task_BadPathParts">
  <bpmn:extensionElements>
    <zeebe:ioMapping>
      <zeebe:input target="request.application-id" />
      <zeebe:output source="=team" target="application.1team" />
    </zeebe:ioMapping>
  </bpmn:extensionElements>
</bpmn:serviceTask>
        `)
      ),
      report: [
        {
          id: 'Task_BadPathParts',
          message: "Input variable name 'request.application-id' must not contain an invalid character (+,-,*,/,=,>,?).",
        },
        {
          id: 'Task_BadPathParts',
          message: "Output variable name 'application.1team' must not have a number (0-9) straight after a '.'.",
        },
      ],
    },
    {
      name: 'Dotted path with an empty part',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:serviceTask id="Task_EmptyPathParts">
  <bpmn:extensionElements>
    <zeebe:ioMapping>
      <zeebe:output source="=a" target=".team" />
      <zeebe:output source="=b" target="application." />
      <zeebe:output source="=c" target="application..team" />
    </zeebe:ioMapping>
  </bpmn:extensionElements>
</bpmn:serviceTask>
        `)
      ),
      report: [
        {
          id: 'Task_EmptyPathParts',
          message: "Output variable name '.team' must not start or end with '.', or contain '..'.",
        },
        {
          id: 'Task_EmptyPathParts',
          message: "Output variable name 'application.' must not start or end with '.', or contain '..'.",
        },
        {
          id: 'Task_EmptyPathParts',
          message: "Output variable name 'application..team' must not start or end with '.', or contain '..'.",
        },
      ],
    },
  ],
});
