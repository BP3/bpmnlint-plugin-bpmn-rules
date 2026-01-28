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

function isDefaultIdOrName(prefix, value) {
  if (!value) return false;
  let defaultRE = new RegExp(`^${prefix}_\\d\\w{6}$`, 'i');
  return defaultRE.test(value);
}

module.exports = {
  isDefaultIdOrName
};
