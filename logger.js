/* eslint-disable no-console */

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

const chalk = require('chalk');

const logger = {
  log: (...args) => {
    if (argv.verbose) {
      console.log(chalk.gray('VERBOSE:'), ...args);
    }
  },
  info: (...args) => {
    console.log(chalk.bold(chalk.blueBright('INFO:')), ...args);
  },
  warn: (...args) => {
    console.warn(chalk.bold(chalk.yellowBright('WARN:')), ...args);
  },
  error: (...args) => {
    console.error(chalk.bold(chalk.redBright('ERROR:')), ...args);
  },
};

module.exports = {
  logger,
};
