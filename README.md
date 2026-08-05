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
    "@BP3/bpmnlint-plugin-bpmn-rules/artifact-with-default-id": "off",
    "@BP3/bpmnlint-plugin-bpmn-rules/user-task-without-assignment-details": "error"
  } 
}
```

> **Important:** `fake-join` and `label-required` above are rules built into `bpmnlint` itself, which is why
> they can be referenced by their bare name. Every rule from *this* package must always be written with its
> full package prefix — `@BP3/bpmnlint-plugin-bpmn-rules/<rule-name>` (or the shorthand `@BP3/bpmn-rules/<rule-name>`)
> — **even though it is already included via `extends`**. If you reference one of this package's rules without
> the prefix (e.g. `"activity-with-default-id": "error"`), `bpmnlint` will instead look for a core rule with
> that name and fail with an error such as:
>
> ```
> cannot resolve rule <activity-with-default-id> from <bpmnlint>
> ```
>
> The package scope is also case-sensitive: it must be `@BP3`, not `@bp3`. Getting the case wrong produces
> the same kind of "cannot resolve rule" error.
>
> One thing that makes this easy to miss: `bpmnlint` only tries to resolve rules that are actually enabled,
> so a misnamed rule set to `off` will *not* raise this error — only a misnamed rule that is `info`, `warn` or
> `error` will. If you turn one rule off and promote another at the same time, and only the promoted rule
> fails to resolve, check that the rule you promoted has the full `@BP3/bpmnlint-plugin-bpmn-rules/` prefix.
