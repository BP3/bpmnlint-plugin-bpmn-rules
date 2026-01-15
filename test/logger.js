/* eslint-disable no-console */

const chalk = require('chalk');

const logger = {
  log: (...args) => {
    if (argv.verbose) {
      console.log(chalk.gray('VERBOSE:'), ...args);
    }
  },
  info: (...args) => {
    console.log(chalk.blueBright.bold('INFO:'), ...args);
  },
  warn: (...args) => {
    console.warn(chalk.yellowBright.bold('WARN:'), ...args);
  },
  error: (...args) => {
    console.error(chalk.redBright.bold('ERROR:'), ...args);
  },
};

module.exports = {
  logger,
};
