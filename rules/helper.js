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

/**
 * Helper function to check if a value matches the default BPMN auto-generated pattern.
 * @param {string} prefix - The mandatory prefix (e.g., 'Activity', 'Gateway', 'Process')
 * @param {string} value - The ID string to check
 */

function isDefaultIdOrName(prefix, value) {
  if (!prefix || !value) return false;
  let defaultRE = new RegExp(`^${prefix}_\\d\\w{6}$`, 'i');
  return defaultRE.test(value);
}

module.exports = {
  isDefaultIdOrName,
};
