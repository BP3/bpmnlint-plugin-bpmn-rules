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
      name: 'Process with valid escalation name',
      moddleElement: createModdle(
        generateFragment(`
<bpmn:escalation id="Escalation_0eb1rq6" name="EscalationToManager" />
      `)
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with default escalation name',
      moddleElement: createModdle(
        generateFragment(
          `
<bpmn:escalation id="Escalation_0eb1rq6" name="Escalation_0eb1rq6" />
      `,
          false
        )
      ),
      report: [
        {
          id: 'Escalation_0eb1rq6',
          message: 'Escalation has a default name. Please provide a significant name!',
        },
      ],
    },
  ],
});
