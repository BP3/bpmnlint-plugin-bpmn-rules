# bpmnlint-plugin-bpmn-rules

BP3's bpmnlint plugin: extra lint rules for Camunda 8 BPMN models, published to GitHub Packages as `@BP3/bpmnlint-plugin-bpmn-rules`. User-facing docs are in `README.md` and the repo wiki.

## Commands

- `npm test`: runs every spec under `test/`, plus `test/check-coverage.spec.js`.
- `npm run lint` / `npm run lint:fix`: ESLint with Prettier enforced as an error. Prettier uses `printWidth: 200`, so don't wrap lines early.

No local Node install? Run the same checks in Docker with the `node:24` image, which matches the Node version CI uses:

```bash
docker run --rm -v "$PWD":/app -w /app node:24 sh -c "npm ci && npm test && npm run lint"
```

This writes `node_modules/` into the working copy. It's gitignored, and there are no native dependencies, so a Linux-built install is fine on macOS.

CI (`.github/workflows/build-project.yml`) runs lint, unit tests, `npm audit --omit=dev`, and a smoke test against a matrix of `bpmnlint` versions.

## Adding or changing a rule

- One rule per file in `rules/<rule-name>.js`. `rules/helper.js` is shared code, not a rule.
- Every rule needs a matching `test/<rule-name>.spec.js`. `check-coverage.spec.js` fails the build if one is missing.
- Specs call `verifyRule(__filename, { valid, invalid })` from `test/helper.js`, which works out the rule from the spec's file name. Build the BPMN with `generateFragment(xml, wrapInProcess)`.
- Register the rule in `index.js` with `addRule(name, { 'recommended-base': ..., 'strict-base': ... })`. Severity changes for a particular Camunda version go in the `camunda-8-x-*` rulesets below that. `recommended` and `strict` point at the newest Camunda version.
- Keep the BP3 licence header that every source file starts with.
- Rules shipped in this package are referenced as `@BP3/bpmnlint-plugin-bpmn-rules/<rule-name>`. The `@BP3` scope is case-sensitive. See the README for the "cannot resolve rule" pitfalls.

## Dependencies and Renovate

Most commits on `main` are Renovate PRs, so `main` moves often. Branch from a freshly pulled `main`, and check whether it has moved again before opening a PR.

`renovate.json` holds the config, and each `packageRules` entry has a `description` explaining why it exists. Some things that aren't obvious:

- `schedule` is a window in which Renovate may open or update PRs, not a start time. Runs happen every few hours, so a window of an hour or less can be missed altogether.
- Renovate cron works to the hour only, so the minutes field must be `*`. Times use the `timezone` setting (`Europe/London`).
- Existing Renovate PRs can still be rebased outside the window (`updateNotScheduled` defaults to true).

## When bpmnlint is upgraded

`bpmnlint` is the core dependency this plugin extends. Every new version must be added to the `bpmnlint-version` matrix in `.github/workflows/build-project.yml`, so the CI smoke test checks the plugin against it.

- Renovate opens `bpmnlint` updates as their own PRs (never grouped) with the `needs-compatibility-check` label. Treat that label as a reminder to add the version to the matrix in the same PR, or in a follow-up straight after.
- Append the version to the end of the list in the same format as the others. Older versions stay in the list.
- Both 11.14.0 and 11.15.0 were once merged without this step, and the matrix had to be caught up afterwards (#143).

## Pull requests

- PRs go to `BP3/bpmnlint-plugin-bpmn-rules` against `main` and are opened with the `gh` CLI. Make sure `gh` is installed and `gh auth login` has been run before asking Claude to open one.
- PRs need an approving review before they can merge.
