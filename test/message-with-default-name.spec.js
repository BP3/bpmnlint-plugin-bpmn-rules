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

verifyRule({
  valid: [
    {
      name: 'Process with valid message name',
      moddleElement: createModdle(
        generateFragment('<bpmn:message id="Message_2ajovd3" name="MessageBoundaryEvent" />')
      ),
    },
  ],
  invalid: [
    {
      name: 'Process with default message name',
      moddleElement: createModdle(
        generateFragment('<bpmn:message id="Message_316gp6b" name="Message_316gp6b" />')
      ),
      report: [
        {
          id: 'Message_316gp6b',
          message: 'Message has a default name. Please provide a significant name!',
        },
      ],
    },
  ],
});
