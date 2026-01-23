const { is } = require('bpmnlint-utils');

/**
 * Rule that reports whether an inclusive gateway does not have a default sequence flow (applies to: Gateway)
 */
module.exports = function () {
  function check(node, reporter) {
    if (is(node, 'bpmn:InclusiveGateway')) {
      let hasDefaultFlow = !!node.default || (node.outgoing || []).length <= 1;

      //output
      if (!hasDefaultFlow) {
        reporter.report(node.id, 'Inclusive Gateway should always have a default sequence flow.');
      }
    }
  }

  return {
    check: check,
    appliesTo: ['bpmn:InclusiveGateway'],
  };
};
