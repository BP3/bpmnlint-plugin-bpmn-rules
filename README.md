# bpmn-rules

This package contains BP3's linting rules for Camunda BPMN.

## Installation

Install the rules on your project using npm:

```shell
npm install @BP3/bpmnlint-plugin-bpmn-rules
```

## The rules included in this package

See the [local Wiki](https://github.com/BP3/bpmn-rules/wiki) for a complete description of the rules included in this package.

## How to add this rules package to your project

One of the easiest ways to start linting your project is to use [camunda-lint](https://github.com/BP3/camunda-lint).

Add a `.bpmnlintrc` file to your project. You may find that you have a default one already

```json
{
  "extends": "bpmnlint:recommended" 
}
```

To add the rules in this package modify your `.bpmnlintrc` as follows:

```json
{
  "extends": [
    "bpmnlint:recommended",
    "plugin:@BP3/bpmnlint-plugin-bpmn-rules/recommended"
  ]
}
```

## How to configure the individual rules in this package

Individual rules can be turned `on` or `off`. You can also vary the level at which the rules report, 
either `info`, `warn` or `error`.
```json
{
  "extends": [
    "bpmnlint:recommended",
    "plugin:@BP3/bpmnlint-plugin-bpmn-rules/recommended"
  ],
  "rules": {
    "fake-join": "off",
    "label-required": "info",
    "@BP3/bpmnlint-plugin-bpmn-rules/user-task-without-assignment-details": "error"
  } 
}
```
