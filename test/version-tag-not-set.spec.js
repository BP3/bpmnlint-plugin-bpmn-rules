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
      name: 'Process with a version tag set',
      moddleElement: createModdle(
        generateFragment(
          `
<bpmn:process id="Process_1s1qrpb" name="Review Request Process">
  <bpmn:extensionElements>
    <zeebe:versionTag value="1.0.0" />
  </bpmn:extensionElements>
</bpmn:process>
          `,
          false
        )
      ),
    },
  ],
  invalid: [
    {
      name: 'Process without a version tag element',
      moddleElement: createModdle(
        generateFragment(
          `
<bpmn:process id="Process_1s1qrpb" name="Review Request Process" />
          `,
          false
        )
      ),
      report: [
        {
          id: 'Process_1s1qrpb',
          message: 'Process does not have a version tag set. Please provide a significant version tag!',
        },
      ],
    },
    {
      name: 'Process with an empty version tag value',
      moddleElement: createModdle(
        generateFragment(
          `
<bpmn:process id="Process_0empty1v" name="Review Request Process">
  <bpmn:extensionElements>
    <zeebe:versionTag value="" />
  </bpmn:extensionElements>
</bpmn:process>
          `,
          false
        )
      ),
      report: [
        {
          id: 'Process_0empty1v',
          message: 'Process does not have a version tag set. Please provide a significant version tag!',
        },
      ],
    },
  ],
});
