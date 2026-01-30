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
      name: 'Process activity with type',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:serviceTask id="ServiceTask_Valid" name="Charge Credit Card" />
        `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process activity without any type',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:task id="Activity_0mw9waf" name="Proceed Payment" />
        `)
      ),
      report: [
        {
          id: 'Activity_0mw9waf',
          message: 'Artifact has no type. Please provide a task type!',
        },
      ],
    },
  ],
});
