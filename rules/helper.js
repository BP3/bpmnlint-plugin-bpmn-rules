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

/**
 * Checks whether an element is a given Zeebe extension element type.
 *
 * The type name depends on how the BPMN was parsed. With the Zeebe moddle descriptor (zeebe-bpmn-moddle),
 * as in Camunda Modeler, elements get their real type, e.g. 'zeebe:IoMapping'. Without it, bpmn-moddle
 * keeps the raw XML tag name, e.g. 'zeebe:ioMapping'. Comparing case-insensitively matches both.
 * @param {object} element - The moddle element to check
 * @param {string} type - The Zeebe type, e.g. 'zeebe:IoMapping'
 */
function isZeebe(element, type) {
  return element != null && typeof element.$type === 'string' && element.$type.toLowerCase() === type.toLowerCase();
}

/**
 * Returns the input and output parameters of a zeebe:IoMapping element, however the BPMN was parsed.
 * With the Zeebe moddle descriptor they are in `inputParameters` and `outputParameters`;
 * without it they are untyped elements in `$children`.
 * @param {object} ioMapping - A zeebe:IoMapping element
 * @returns {{ inputs: object[], outputs: object[] }}
 */
function getIoMappingParameters(ioMapping) {
  if (ioMapping.inputParameters || ioMapping.outputParameters) {
    return { inputs: ioMapping.inputParameters || [], outputs: ioMapping.outputParameters || [] };
  }

  const children = ioMapping.$children || [];
  return {
    inputs: children.filter((child) => isZeebe(child, 'zeebe:Input')),
    outputs: children.filter((child) => isZeebe(child, 'zeebe:Output')),
  };
}

module.exports = {
  isDefaultIdOrName,
  isZeebe,
  getIoMappingParameters,
};
